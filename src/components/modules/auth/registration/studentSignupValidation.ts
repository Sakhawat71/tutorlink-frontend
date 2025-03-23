// signupValidation.ts
import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).min(1, "Email is required"),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
});