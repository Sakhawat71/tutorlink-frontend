'use client';

import React, { useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import professor from '@/assets/usersreview/senior-male-professor.jpg';
import tutor1 from '@/assets/usersreview/tutor-1.jpg';
import tutor2 from '@/assets/usersreview/tutor2.jpg';
import girl1 from '@/assets/usersreview/girl.jpg';
import boy2 from '@/assets/usersreview/boy2.jpg';
import p1 from '@/assets/usersreview/p1.jpg';
import p2 from '@/assets/usersreview/p2.jpg';
import p3 from '@/assets/usersreview/p3.jpg';
import boy3 from '@/assets/usersreview/boy3.jpg';
import boy4 from '@/assets/usersreview/boy4.jpg';


const userReviews = [
    {
        name: "Emily R.",
        role: "Student",
        image: girl1,
        review: "TutorLink made it so easy to find a tutor for my calculus class. I improved my grades in just a few weeks!",
        rating: 5,
    },
    {
        name: "David L.",
        role: "Tutor",
        image: professor,
        review: "I love teaching on TutorLink. The platform helps me reach students who really need my expertise.",
        rating: 5,
    },
    {
        name: "Salah M.",
        role: "Parent",
        image: p1,
        review: "As a parent, I`m impressed with how simple and safe TutorLink is. Booking sessions takes just a few clicks.",
        rating: 4,
    },
    {
        name: "Liam H.",
        role: "Student",
        image: boy2,
        review: "TutorLink helped me finally understand physics. My confidence has skyrocketed!",
        rating: 5,
    },
    {
        name: "Alvin K.",
        role: "Parent",
        image: p2,
        review: "The tutors are patient and professional. I feel safe and satisfied using this platform.",
        rating: 4,
    },
    {
        name: "Noah J.",
        role: "Student",
        image: boy4,
        review: "I used to struggle with writing essays, but now I`m acing my assignments thanks to TutorLink.",
        rating: 5,
    },
    {
        name: "Robart N.",
        role: "Tutor",
        image: tutor1,
        review: "The scheduling tools and communication system make teaching here a breeze.",
        rating: 5,
    },
    {
        name: "Mason F.",
        role: "Student",
        image: boy3,
        review: "Math finally makes sense to me now. I actually look forward to my sessions!",
        rating: 5,
    },
    {
        name: "Olivar Z.",
        role: "Parent",
        image: p3,
        review: "We`ve tried other platforms, but TutorLink has the most caring and qualified tutors.",
        rating: 5,
    },
    {
        name: "Ethan W.",
        role: "Student",
        image: boy2,
        review: "Flexible timings and great tutors. Fits my busy schedule perfectly.",
        rating: 4,
    },
    {
        name: "Isack C.",
        role: "Tutor",
        image: tutor2,
        review: "I`ve built great relationships with my students and love seeing them grow.",
        rating: 5,
    }
];

const StarRating = ({ count }: { count: number }) => (
    <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-yellow-400 text-sm ${i < count ? '' : 'opacity-30'}`}>★</span>
        ))}
    </div>
);

const Testimonials = () => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: 2, spacing: 24 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 3, spacing: 32 },
            },
        },
    });

    const timeout = useRef<NodeJS.Timeout | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clearNext = () => {
        if (timeout.current) clearTimeout(timeout.current);
    };

    useEffect(() => {
        const autoplay = () => {
            if (instanceRef.current) {
                instanceRef.current.next();
            }
        };

        const interval = setInterval(autoplay, 4000);

        return () => clearInterval(interval);
    }, [instanceRef]);

    return (
        <section className="bg-[#6161F2] py-14">
            <div className="container mx-auto px-4">
                <h2 className="text-white text-3xl md:text-5xl font-bold text-center my-10">
                    What Our Users Say
                </h2>

                <div ref={sliderRef} className="keen-slider">
                    {userReviews.map((t, index) => (
                        <div
                            key={index}
                            className="keen-slider__slide bg-white rounded-xl shadow-md p-6 text-center"
                        >
                            <div className="flex flex-col items-center">
                                <Image
                                    src={t.image}
                                    alt={t.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full object-cover mb-4"
                                />
                                <p className="italic text-gray-700 text-sm sm:text-base mb-3">
                                    “{t.review}”
                                </p>

                                <p className="font-semibold text-gray-900">{t.name}</p>
                                <p className="text-sm text-gray-500">{t.role}</p>
                                <StarRating count={t.rating} />

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;