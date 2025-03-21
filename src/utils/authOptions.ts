import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json();
                const decoded = jwtDecode(user.data) as { id: string; name?: string; email?: string; role?: string; };

                if (res.ok && user) {
                    return {
                        id: decoded.id,
                        name: decoded.name || null,
                        email: decoded.email || null,
                        role: decoded.role || null,
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
                // console.log("user and token : ", user,token);
            }
            return token;
        },
        async session({ session, token }) {
            // session.user.id = token.id;
            // session.user.email = token.email;
            // session.user.name = token.name;
            // session.user.role = token.role;// Make backend JWT available
            console.log(session, token,);
            return session;
        },
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
};