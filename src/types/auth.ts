// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";


export interface IDecoded {
    id: string;
    name?: string;
    email?: string;
    role?: string;
}

// Extend the User type
export interface ICustomUser extends DefaultUser {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string | null; // "student", "tutor", "admin"
    authType?: "credentials" | "social" | null;
}

// Extend the JWT type
export interface ICustomJWT extends DefaultJWT {
    id?: string;
    role?: string | null;
    authType?: "credentials" | "social" | null;
}

// Extend the Session type
export interface ICustomSession extends DefaultSession {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        role?: string | null;
        authType?: "credentials" | "social" | null;
    };
}


declare module "next-auth" {
    interface User {
        id: string;
        role: string | null;
        authType: string | null;
    }

    interface Session {
        user: {
            id: string;
            name: string | null;
            email: string | null;
            role?: string | null;
            authType: string | null;
        };
    }

    interface JWT {
        id: string;
        role?: string | null;
        authType: string | null;
    }
};
