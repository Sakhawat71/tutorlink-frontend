"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import img from '@/assets/ext/online-class.jpg'


const JoinTutor = () => {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-4 sm:px-6 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-24">

                {/* Image */}
                <div className="flex justify-center lg:justify-end w-full max-w-md">
                    <Image
                        src={img}
                        alt="Become a Tutor"
                        width={500}
                        height={400}
                        className="w-full h-auto object-contain rounded-3xl"
                        priority
                    />
                </div>

                {/* Text */}
                <div className="text-center lg:text-left max-w-xl">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                        You can become <br /> a great tutor too!
                    </h2>
                    <p className=" text-base sm:text-lg mb-6">
                        Empower students with your knowledge. Teach online or in-person, build your career, and get paid for doing what you love.
                    </p>
                    <Link
                        href="/tutor-signup"
                        className="inline-block px-6 py-3 bg-white text-[#4b4bd9] text-sm sm:text-base font-semibold rounded-md  transition"
                    >
                        Join as a Tutor
                    </Link>
                </div>


            </div>
        </section>
    );
};

export default JoinTutor;