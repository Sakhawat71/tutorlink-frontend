"use client"

import { useParams } from 'next/navigation';
import React from 'react';

const SubjectDetails = () => {

    const { id } = useParams();

    return (
        <div>
            <h2>Subject Id : {id}</h2>
        </div>
    );
};

export default SubjectDetails;