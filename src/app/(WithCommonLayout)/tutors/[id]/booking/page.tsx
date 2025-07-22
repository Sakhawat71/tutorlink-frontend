"use client";

import React from 'react';
import { useTutor } from '@/providers/TutorProvider';
import { BookSession } from '@/components/modules/booking/BookSession';


const BookTutorPage = () => {

    const {data : tutor} = useTutor();
    console.log(tutor);

    return (
        <div>
            <BookSession tutor={tutor?.data}/>
        </div>
    );
};

export default BookTutorPage;

//  studentId 
//   tutorId 
//   date    
//   duration
//   price 