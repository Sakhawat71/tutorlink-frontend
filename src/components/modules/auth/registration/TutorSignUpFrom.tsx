"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { registerUser } from "@/services/AuthService";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signupSchema } from "./studentSignupValidation";

export const TutorSignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Initialize React Hook Form with Zod validation
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    // Form submission handler
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const registerData = { ...data, role: "tutor" };
        const toastId = toast.loading("Signing up...");

        try {
            // Register tutor in the database
            const res = await registerUser(registerData);

            if (!res?.success) {
                throw new Error(res.message || "Signup failed");
            }

            toast.success(`${res.message}! Logging you in...`, { id: toastId });

            // Login after successful registration
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error("Invalid credentials");
            }

            toast.success("Login successful 🎉");
            router.push("/");
        } catch (error) {
            console.error("Signup/Login error:", error);
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Sign Up as a tutor
                    </CardTitle>
                    <CardDescription>
                        Join TutorLink with email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <Tabs value="tutor" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="tutor">tutor</TabsTrigger>
                                <TabsTrigger value="tutor" asChild>
                                    <Link href="/tutor-signup">Tutor</Link>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="grid gap-6">
                        {/* Credentials Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="name">Full Name</Label>
                                            <FormControl>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    {...field}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="email">Email</Label>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="mail@example.com"
                                                    {...field}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="password">Password</Label>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        id="password"
                                                        placeholder="Password"
                                                        type={showPassword ? "text" : "password"}
                                                        {...field}
                                                        required
                                                    />
                                                </FormControl>
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-2 text-gray-500"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Signing up..." : `Sign Up as tutor`}
                                </Button>
                            </form>
                        </Form>
                        {/* Login Link */}
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="underline underline-offset-4">
                                Log in
                            </a>
                        </div>
                        {/* Divider */}
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or with your Google or GitHub account
                            </span>
                        </div>
                        
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}