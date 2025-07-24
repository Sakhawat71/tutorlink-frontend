'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PowerUpSection = () => {
    return (
        <section className="relative bg-[#f9fafb] py-24 overflow-hidden">
            {/* Left animated image */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4 hidden lg:block animate-float">
                <Image
                    src="https://i.ibb.co/WvsHywPQ/customer-support.png"
                    alt="Schedule illustration"
                    width={300}
                    height={300}
                />
            </div>

            {/* Right animated image */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/5 hidden lg:block animate-float-reverse">
                <Image
                    src="https://i.ibb.co/QFLjwbKh/cloud-data-processing.png"
                    alt="Calendar icon"
                    width={300}
                    height={300}
                />
            </div>

            {/* Center content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Power up your scheduling
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Let students book with you instantly. Make scheduling seamless and stress-free with TutorLink.
                </p>
                <Link
                    href="/tutors"
                    className="inline-block bg-blue-600 text-white text-base font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
};

export default PowerUpSection;