import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { IDecoded } from "@/types";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            profile(profile) {
                return {
                    ...profile,
                    id: profile.sub,
                    role: profile.role ?? "student",
                    authType: 'social'
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        GoogleProvider({
            profile(profile) {
                return {
                    ...profile,
                    id: profile.sub,
                    role: profile.role ?? "student",
                    authType: 'social'
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Username", type: "text", placeholder: "User Name" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                })
                const user = await res.json();
                const decoded = jwtDecode(user.data) as IDecoded;

                // Ensure user data exists before decoding
                if (!user?.data) {
                    throw new Error("Invalid token");
                }

                if (res.ok && user) {
                    return {
                        id: decoded.id,
                        name: decoded.name || null,
                        email: decoded.email || null,
                        role: decoded.role || null,
                        authType: 'credentials'
                    };
                }
                return null;
            }
        })


    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.authType = user.authType;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.role = token.role as string;
                session.user.authType = token.authType as string;
            }
            // console.log(session);
            return session;
        },
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
};