'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';

interface Booking {
    id: string;
    tutorName: string;
    subject: string;
    date: string;
    time: string;
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

const StudentBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching
        setTimeout(() => {
            setBookings([
                {
                    id: '1',
                    tutorName: 'John Doe',
                    subject: 'Math',
                    date: '2025-08-02',
                    time: '10:00 AM',
                    status: 'CONFIRMED'
                },
                {
                    id: '2',
                    tutorName: 'Jane Smith',
                    subject: 'English',
                    date: '2025-08-04',
                    time: '2:00 PM',
                    status: 'PENDING'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <HashLoader color="#6366f1" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-6"
        >
            <h1 className="text-2xl font-bold mb-6 text-center">Your Bookings</h1>

            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">You have no bookings yet.</p>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold text-lg">{booking.subject}</h2>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${booking.status === 'CONFIRMED'
                                            ? 'bg-green-100 text-green-600'
                                            : booking.status === 'PENDING'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-red-100 text-red-600'
                                        }`}
                                >
                                    {booking.status}
                                </span>
                            </div>
                            <p>
                                <strong>Tutor:</strong> {booking.tutorName}
                            </p>
                            <p>
                                <strong>Date:</strong> {booking.date}
                            </p>
                            <p>
                                <strong>Time:</strong> {booking.time}
                            </p>
                            <div className="mt-4 flex justify-end">
                                <Button variant="outline">View Details</Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default StudentBookings;
