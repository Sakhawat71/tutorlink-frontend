
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