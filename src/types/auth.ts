import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";


export interface IAuthUser extends DefaultUser {
    id: string;
    role: string;
    authType: "credentials" | "social";
    name?: string;
    email?: string;
};



export interface ICustomSession extends DefaultSession {
    user: IAuthUser;
}


export interface ICustomJWT extends JWT {
    id: string;
    role: string;
    authType: "credentials" | "social";
}
