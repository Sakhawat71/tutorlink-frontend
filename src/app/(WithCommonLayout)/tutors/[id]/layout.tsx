import { getTutorDetails } from "@/services/TutorProfile";
import { ITutor } from "@/types";
import { TutorProvider } from "@/providers/TutorProvider";
import { FadeLoader } from "react-spinners";

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
};

const TutorLayout = async ({ children, params }: LayoutProps) => {
    const id = (await params).id;

    const tutorData = await getTutorDetails(id);
    const tutor: ITutor = tutorData?.data || null;

    if (!tutorData || !tutor) {
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
