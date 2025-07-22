import { TutorProvider } from "@/providers/TutorProvider";
import { getTutorDetails } from "@/services/TutorProfile";
import { FadeLoader } from "react-spinners";


export default async function TutorLayout({ params, children }: any) {
    const tutor = await getTutorDetails(params.id);

    // console.log('tutor in layout ', tutor);

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
}
