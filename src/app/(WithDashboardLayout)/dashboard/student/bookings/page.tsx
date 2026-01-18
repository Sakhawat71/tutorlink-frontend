import StudentBookings from '@/components/modules/dashboard/Student/StudentBooking';
// import { useSession } from 'next-auth/react';


const BookingStudentPage = () => {

    // const session = useSession();
    // console.log(session);

    return (
        <div>
            <StudentBookings />
        </div>
    );
};

export default BookingStudentPage;