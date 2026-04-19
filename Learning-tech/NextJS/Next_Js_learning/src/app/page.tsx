import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Instructor from "@/components/Instructor";
import TestimonialsCards from "@/components/TestimonialsCards";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <>
    <main className="min-h-screen bg-black/[0.97] antialiased bg-grid-white/[0.03]">
      <HeroSection/>
    </main>
    <FeaturedSection/>
    <WhyChooseUs/>
    <TestimonialsCards/>
    <UpcomingWebinars/>
    <Instructor/> 
    <Footer />
    </>
  );
}
