"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    loginUser
} from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        formState: { isSubmitting },
    } = form;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        try {
            const res = await loginUser(data);
            console.log(res);
            if (res?.success) {
                toast.success(res?.message);
                router.push("/");
            } else {
                toast.error(res?.message);
            }
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <div className="border-2 bg-white rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-6 mb-4">
                <div className="space-y-4 mx-auto text-center">
                    <h1 className="text-xl font-semibold">Login</h1>
                    <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-10">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        {...field}
                                        placeholder="example@mail.com"
                                        value={field.value || ""}
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
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            {...field}
                                            value={field.value || ""}
                                            placeholder="password"
                                        />
                                    </FormControl>
                                    {/* Eye Icon Button */}
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

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="mt-5 w-full"
                    >
                        {isSubmitting ? "Logging...." : "Login"}
                    </Button>
                </form>
            </Form>
            <p className="text-sm text-gray-600 text-center my-3">
                Do not have any account ?
                <Link href="/register" className="text-primary">
                    Register
                </Link>
            </p>
        </div>
    );
}