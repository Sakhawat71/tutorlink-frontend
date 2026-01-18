
export interface IBooking {
    id: string;
}

export interface IBookingCreateInput {
    studentId: string;
    tutorId: string;
    selectedSlotId: string;
    date: string;
    duration: number;
    price: number;
    subject: string;
}

export interface Booking {
    id: string;
    tutor: {
        name: string;
    };
    subject: string;
    date: string;
    selectedSlot: {
        startTime: string;
    };
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}
