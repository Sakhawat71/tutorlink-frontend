import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const Features = () => {
    return (
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
    );
};

export default Features;