'use client';

import Image from 'next/image';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const FaqHome = () => {
    return (
        <section className="bg-gray-50 py-10">

            <h2 className=" text-center text-3xl lg:text-4xl font-bold text-gray-900">
                Wherever you want to learn
            </h2>
            <p className='text-center text-xl mt-2'>Wherever you are on your Learning journey, TutorLink can help.</p>

            <div className="container mx-auto px-6 lg:px-20 mt-16">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* FAQ Content */}
                    <div className="w-full lg:w-1/2">
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-medium">
                                    How do I book a tutor on TutorLink?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    Browse available tutors on the “Browse Tutors” page, filter by subject or availability, and choose a time slot. Confirm your booking, and your session will appear in your dashboard.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-medium">
                                    What roles are available on TutorLink?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    TutorLink supports three roles: Students, Tutors, and Admins. Your role is assigned during registration and controls your dashboard features.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-medium">
                                    How do tutors set their availability?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    Tutors can set their available time slots from their dashboard. Only those times are shown to students when booking.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-lg font-medium">
                                    Can I cancel a booking?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    Yes, students can cancel bookings from the dashboard before the session starts. Tutors will be notified.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger className="text-lg font-medium">
                                    How does TutorLink ensure security?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    We use secure login with NextAuth, encrypted data, and role-based access to ensure platform safety.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6">
                                <AccordionTrigger className="text-lg font-medium">
                                    What happens if a tutor isn`t available?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    Tutors without available slots won`t appear in the search. Use filters to find tutors who match your schedule.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* FAQ Image */}
                    <div className="w-full lg:w-1/2">
                        <Image
                            alt="Student asking a question"
                            src="https://i.ibb.co/BHQwz0Sq/medium-shot-kid-taking-notes.jpg"
                            width={600}
                            height={500}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqHome;
