'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { HashLoader } from 'react-spinners';
import { myBookings } from '@/services/Booking';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Booking {
    id: string;
    tutorName: string;
    subject: string;
    date: string;
    selectedSlot: {
        startTime: string;
    };
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

const StudentBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const session = useSession();
    const userId = session.data?.user?.id || '';

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await myBookings(userId);
                setBookings(data?.data || []);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <HashLoader color="#6366f1" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Your Bookings</h1>

            {bookings.length === 0 ? (
                <p className="text-center text-muted-foreground">
                    You have no bookings yet.
                </p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Tutor</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.subject}</TableCell>
                                <TableCell>{booking.tutorName}</TableCell>
                                <TableCell>{
                                    new Date(booking.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                }</TableCell>
                                <TableCell>{
                                    booking.selectedSlot.startTime
                                }</TableCell>
                                <TableCell>
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default StudentBookings;
