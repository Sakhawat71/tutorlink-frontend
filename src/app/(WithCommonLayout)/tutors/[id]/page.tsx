"use client";

import { TutorDetailsComponent } from '@/components/modules/browseTutors/TutorDetails';
import Loading from '@/components/shared/Loading';
import { getTutorDetails } from '@/services/TutorProfile';
// import { ITutor } from '@/types/tutor.type';
import { useParams } from 'next/navigation';
import React from 'react';
import { FadeLoader } from 'react-spinners';


const TutorDetailsPage = () => {

    // const [tutor, setTutor] = useState<ITutor | null>(null);
    // const params = useParams();

    // useEffect(() => {
    //     const fetchTutorDetails = async (id: string) => {
    //         try {
    //             const details = await getTutorDetails(id);
    //             setTutor(details.data);
    //         } catch (error) {
    //             console.error("Failed to fetch tutor details:", error);
    //         }
    //     };

    //     const id = Array.isArray(params.id) ? params.id[0] : params.id;
    //     if (id) {
    //         fetchTutorDetails(id as string);
    //     }
    // }, [params.id]);



    // if (!tutor) {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //             <FadeLoader />
    //         </div>
    //     );
    // }




    const [tutor, setTutor] = React.useState({
        data: undefined,
        message: "",
        meta: undefined,
        success: false
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { id } = useParams();

    React.useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const result = await getTutorDetails(id as string);
                setTutor(result);
            } catch (error: any) {
                setError(error);
                console.error('Failed to load company:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [id]);


    if (isLoading) return <Loading />

    if (error || !tutor) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader />
            </div>
        );
    }

    if (!tutor.data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <TutorDetailsComponent tutor={tutor.data} />
        </div>
    );
};

export default TutorDetailsPage;