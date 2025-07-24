import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const Testimonials = () => {
    return (
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
    );
};

export default Testimonials;