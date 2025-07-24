import Banner from "./Banner";
import Features from "./Features";
import Testimonials from "./Testimonials";
import FaqHome from "./FaqHome";
import PowerUpSection from "./PowerUpSection";
import JoinTutor from "./JoinTutor";


export default function HomeComponents() {

    return (
        <div className="min-h-screen bg-gray-50">
            <Banner />
            <Features />
            <Testimonials />
            <FaqHome />
            <JoinTutor />
            <PowerUpSection />
        </div>
    );
}