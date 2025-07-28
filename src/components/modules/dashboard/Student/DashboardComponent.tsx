"use client";

import { useSession } from 'next-auth/react';
import React from 'react';

const StudentDashboardComponent = () => {

    const seassion = useSession();
    console.log(" in st dc",seassion);

    return (
        <div>

        </div>
    );
};

export default StudentDashboardComponent;