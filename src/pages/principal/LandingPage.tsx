import { AboutUsSection } from "../../modules/landing/AboutUsSection";
import { FooterSection } from "../../modules/landing/FooterSection";
import { HeroSection } from "../../modules/landing/HeroSection";
import { Navbar } from "../../modules/landing/Navbar";
import Specialties from "../../modules/landing/Specialties";


export const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <AboutUsSection />
            <Specialties />
            <FooterSection />
        </div>
    );
};