import { TutorProvider } from "@/providers/TutorProvider";
import { getTutorDetails } from "@/services/TutorProfile";
import { FadeLoader } from "react-spinners";


const TutorLayout = async (
    { params, children }: { params: { id: string }, children: React.ReactNode }
) => {

    const tutor = await getTutorDetails(params.id);
    console.log('tutor in layout ', tutor);

    if (!tutor) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader />
            </div>
        );
    }

    return (
        <div>
            <TutorProvider tutor={tutor}>{children}</TutorProvider>
        </div>
    );
};

export default TutorLayout;
