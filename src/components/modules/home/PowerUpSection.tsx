'use client';

import React from 'react';
import Link from 'next/link';

const PowerUpSection = () => {
    return (
        <section className="bg-[#f9fafb] py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Power up your scheduling
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Simplify how you connect with students. Eliminate back-and-forth emails, allow instant bookings, and focus more on teaching.
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
