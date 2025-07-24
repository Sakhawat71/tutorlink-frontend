'use client';

import React, { useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';



const testimonials = [
    {
        name: "Emily R.",
        role: "Student",
        image: "/assets/users/emily.jpg",
        review: "TutorLink made it so easy to find a tutor for my calculus class. I improved my grades in just a few weeks!",
        rating: 5,
    },
    {
        name: "David L.",
        role: "Tutor",
        image: "/assets/users/david.jpg",
        review: "I love teaching on TutorLink. The platform helps me reach students who really need my expertise.",
        rating: 5,
    },
    {
        name: "Sarah M.",
        role: "Parent",
        image: "/assets/users/sarah.jpg",
        review: "As a parent, I`m impressed with how simple and safe TutorLink is. Booking sessions takes just a few clicks.",
        rating: 4,
    },
    {
        name: "Liam H.",
        role: "Student",
        image: "/assets/users/liam.jpg",
        review: "TutorLink helped me finally understand physics. My confidence has skyrocketed!",
        rating: 5,
    },
    {
        name: "Ava K.",
        role: "Parent",
        image: "/assets/users/ava.jpg",
        review: "The tutors are patient and professional. I feel safe and satisfied using this platform.",
        rating: 4,
    },
    {
        name: "Noah J.",
        role: "Student",
        image: "/assets/users/noah.jpg",
        review: "I used to struggle with writing essays, but now I`m acing my assignments thanks to TutorLink.",
        rating: 5,
    },
    {
        name: "Sophia N.",
        role: "Tutor",
        image: "/assets/users/sophia.jpg",
        review: "The scheduling tools and communication system make teaching here a breeze.",
        rating: 5,
    },
    {
        name: "Mason F.",
        role: "Student",
        image: "/assets/users/mason.jpg",
        review: "Math finally makes sense to me now. I actually look forward to my sessions!",
        rating: 5,
    },
    {
        name: "Olivia Z.",
        role: "Parent",
        image: "/assets/users/olivia.jpg",
        review: "We`ve tried other platforms, but TutorLink has the most caring and qualified tutors.",
        rating: 5,
    },
    {
        name: "Ethan W.",
        role: "Student",
        image: "/assets/users/ethan.jpg",
        review: "Flexible timings and great tutors. Fits my busy schedule perfectly.",
        rating: 4,
    },
    {
        name: "Isabella C.",
        role: "Tutor",
        image: "/assets/users/isabella.jpg",
        review: "I`ve built great relationships with my students and love seeing them grow.",
        rating: 5,
    },
    {
        name: "James D.",
        role: "Student",
        image: "/assets/users/james.jpg",
        review: "Using TutorLink feels like having a personal coach. Super helpful!",
        rating: 4,
    },
    {
        name: "Mia G.",
        role: "Parent",
        image: "/assets/users/mia.jpg",
        review: "My daughter`s grades have improved and she`s more motivated than ever. Thank you!",
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
        <section className="bg-gray-50 py-14">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                    What Our Users Say
                </h2>

                <div ref={sliderRef} className="keen-slider">
                    {testimonials.map((t, index) => (
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