"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Search } from "lucide-react";

export default function HomeComponents() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                        Find Your Perfect Tutor Today
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-lg md:max-w-2xl mx-auto mb-6 sm:mb-8">
                        Connect with qualified tutors for any subject or grade level, anytime, anywhere.
                    </p>
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
                        <Search className="h-5 w-5 text-gray-500 ml-2" />
                        <Input
                            type="text"
                            placeholder="Search by subject, grade, or tutor name"
                            className="flex-1 border-none focus:ring-0 text-gray-900 placeholder-gray-400"
                        />
                        <Button className="rounded-full px-4 sm:px-6 bg-indigo-700 hover:bg-indigo-800">
                            Search
                        </Button>
                    </div>
                    {/* CTAs */}
                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register?role=student">
                            <Button className="rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-white text-indigo-600 hover:bg-gray-100">
                                Sign Up as a Student
                            </Button>
                        </Link>
                        <Link href="/register?role=tutor">
                            <Button className="rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-indigo-700 hover:bg-indigo-800">
                                Register as a Tutor
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-10 sm:py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
                        Why Choose TutorLink?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <Card className="text-center p-4 sm:p-6">
                            <CardContent>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Find Tutors Fast</h3>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Browse and book tutors in minutes with our easy-to-use platform.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-4 sm:p-6">
                            <CardContent>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure Payments</h3>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Pay confidently with our encrypted and reliable payment system.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-4 sm:p-6">
                            <CardContent>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Verified Profiles</h3>
                                <p className="text-sm sm:text-base text-gray-600">
                                    All tutors are vetted to ensure quality and trustworthiness.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-10 sm:py-12 md:py-16 bg-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <Card className="p-4 sm:p-6">
                            <CardContent>
                                <p className="text-sm sm:text-base text-gray-700 italic mb-4">
                                    “TutorLink made it so easy to find a tutor for my calculus class. I improved my grades in just a few weeks!”
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-gray-900">
                                    - Emily R., Student
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="p-4 sm:p-6">
                            <CardContent>
                                <p className="text-sm sm:text-base text-gray-700 italic mb-4">
                                    “I love teaching on TutorLink. The platform helps me reach students who really need my expertise.”
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-gray-900">
                                    - David L., Tutor
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-10 sm:py-12 md:py-16 text-center bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-6">
                        Join thousands of students and tutors already transforming education with TutorLink.
                    </p>
                    <Link href="/register">
                        <Button className="rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700">
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}