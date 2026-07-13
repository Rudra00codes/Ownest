import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ServiceSection from "@/components/home/ServiceSection";
import VirtualTours from "@/components/home/VirtualTours";
import MortgageCalculator from "@/components/home/MortgageCalculator";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import PropertyOfWeekBanner from "@/components/home/PropertyOfWeekBanner";

export const metadata: Metadata = {
  title: "Royal Hermitage | Luxury Real Estate",
  description:
    "Discover extraordinary luxury properties with Royal Hermitage. Browse our exclusive collection of premium homes, villas, and estates.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PropertyOfWeekBanner />
      <AboutSection />
      <FeaturedProperties />
      <ServiceSection />
      <VirtualTours />
      <MortgageCalculator />
      <Testimonials />
      <CTABanner />
    </>
  );
}
