"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarInset } from '@/components/ui/sidebar';
import { Calendar, Clock, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const TutorDashboard = () => {

    const { data: session } = useSession();
    const router = useRouter();

    // Redirect if not authenticated or not a tutor
    if (status === "loading") {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    if (!session || session.user.role !== "tutor") {
        router.push("/login");
        return null;
    }

    const tutorName = session.user.name || "Tutor";


    return (
        <SidebarInset>
            <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome, {tutorName}!</h1>
                    <Button
                        variant="outline"
                        className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                        onClick={() => ("/tutor/profile")}
                    >
                        <User className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-indigo-600" />
                            <CardTitle className="text-lg">Manage Availability</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                Set your available time slots for students to book.
                            </p>
                            <Button
                                variant="link"
                                className="text-indigo-600 p-0"
                                onClick={() => ("/tutor/availability")}
                            >
                                Go to Availability
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex items-center gap-2">
                            <User className="h-5 w-5 text-indigo-600" />
                            <CardTitle className="text-lg">View Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                Update your bio, subjects, and hourly rate.
                            </p>
                            <Button
                                variant="link"
                                className="text-indigo-600 p-0"
                                onClick={() => ("/tutor/profile")}
                            >
                                View Profile
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-indigo-600" />
                            <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">
                                Check your scheduled sessions with students.
                            </p>
                            <Button
                                variant="link"
                                className="text-indigo-600 p-0"
                                onClick={() => ("/tutor/bookings")}
                            >
                                View Bookings
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Placeholder for Additional Content */}
                <div className="min-h-[50vh] flex-1 rounded-xl bg-gray-50 p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
                </div>
            </div>
        </SidebarInset>
    );
};

export default TutorDashboard;