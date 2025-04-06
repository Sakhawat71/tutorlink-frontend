"use client";

import { useEffect, useState } from "react";
import { getSingleSubject } from "@/services/SubjectService";
import { useParams } from "next/navigation";
import { ISubject } from "@/types"; 

const SubjectDetails = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState<ISubject | null>(null);
    const [loading, setLoading] = useState(true);

    console.log(subject);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const data = await getSingleSubject(id as string);
                setSubject(data?.data);
            } catch (error) {
                console.error("Failed to fetch subject:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchSubject();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Subject Details</h1>
            <p>Subject ID: {id}</p>
            <p>Subject Name: {subject?.subject}</p>
            <p>Hourly Rate: ${subject?.hourlyRate}</p>
            {/* Add more details here */}
        </div>
    );
};

export default SubjectDetails;
