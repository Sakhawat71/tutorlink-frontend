"use client";
import Banner from "./Banner";
import Features from "./Features";
import Testimonials from "./Testimonials";
import FaqHome from "./FaqHome";
import PowerUpSection from "./PowerUpSection";
// import { useSession } from "next-auth/react";

export default function HomeComponents() {

    // const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-gray-50">
            
            <Banner />
            
            {/* Key Features */}
            <Features />

            {/* Testimonials */}
            <Testimonials />

            <FaqHome />

            <PowerUpSection />
            
        </div>
    );
}