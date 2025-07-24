"use client";

import { useSession } from 'next-auth/react';
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from '@/components/ui/button';


const Banner = () => {

    const { data: session } = useSession();

    return (
        <div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12 sm:py-8 md:py-12 lg:py-14'>
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



                    {/* Call to Action Buttons */}
                    {
                        !session && (
                            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/student-signup">
                                    <Button className="rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-white text-indigo-600 hover:bg-gray-100">
                                        Find Tutor
                                    </Button>
                                </Link>
                                <Link href="/tutor-signup">
                                    <Button className="rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-indigo-700 hover:bg-indigo-800">
                                        Become a Tutor
                                    </Button>
                                </Link>
                            </div>
                        )
                    }

                </div>
            </section>
        </div>
    );
};

export default Banner; 