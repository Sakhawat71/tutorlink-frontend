"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterComponent() {
    const router = useRouter();
    const [role, setRole] = useState("student"); // Toggle state: "student" or "tutor"
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Register with NextAuth credentials provider
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
                role, // Pass the selected role
            });

            if (result?.error) {
                toast.error(result.error || "Registration failed");
            } else {
                toast.success("Registration successful! Logging you in...");
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("An error occurred during registration");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl sm:text-3xl font-bold">
                        Join TutorLink
                    </CardTitle>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                        Sign up as a {role === "student" ? "Student" : "Tutor"}
                    </p>
                </CardHeader>
                <CardContent>
                    {/* Role Toggle */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex rounded-full bg-gray-200 p-1">
                            <Button
                                variant={role === "student" ? "default" : "ghost"}
                                className={`rounded-full px-4 py-2 text-sm sm:text-base ${role === "student" ? "bg-indigo-600 text-white" : "text-gray-700"
                                    }`}
                                onClick={() => setRole("student")}
                            >
                                Student
                            </Button>
                            <Button
                                variant={role === "tutor" ? "default" : "ghost"}
                                className={`rounded-full px-4 py-2 text-sm sm:text-base ${role === "tutor" ? "bg-indigo-600 text-white" : "text-gray-700"
                                    }`}
                                onClick={() => setRole("tutor")}
                            >
                                Tutor
                            </Button>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name" className="text-sm sm:text-base">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-sm sm:text-base">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-sm sm:text-base">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="mt-1"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-full py-2 sm:py-3 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </form>

                    {/* Social Login Option */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">Or sign up with</p>
                        <Button
                            variant="outline"
                            className="mt-2 w-full rounded-full flex items-center justify-center gap-2"
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Google
                        </Button>
                    </div>

                    {/* Login Link */}
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}