"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
// import { useSession } from "next-auth/react";

export default function HomeComponents() {

    // const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-gray-50">
            

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