"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Banner from "./Banner";
import Features from "./Features";
import Testimonials from "./Testimonials";
import FaqHome from "./FaqHome";
// import { useSession } from "next-auth/react";

export default function HomeComponents() {

    // const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-gray-50">
            
            <Banner />
            
            {/* Key Features */}
            <Features />

            {/* Testimonials */}
            <Testimonials />

            <FaqHome />

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