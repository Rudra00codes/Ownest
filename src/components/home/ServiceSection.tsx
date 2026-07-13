import Link from "next/link";
import {
  Home,
  Building,
  Key,
  PenSquare,
  ShieldCheck,
  Ruler,
  ArrowRight,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/button";

import AnimatedContent from "@/components/ui/animation/animatedContent";

const services = [
  {
    icon: <Home size={28} />,
    title: "Property Buying",
    description:
      "We guide you through every step of the buying process, securing your dream property at the best possible price.",
  },
  {
    icon: <Building size={28} />,
    title: "Property Selling",
    description:
      "Maximize your property's value with our strategic marketing approach, professional staging, and skilled negotiation.",
  },
  {
    icon: <Key size={28} />,
    title: "Property Renting",
    description:
      "Whether renting or managing your rental, our team provides comprehensive services tailored to your needs.",
  },
  {
    icon: <PenSquare size={28} />,
    title: "Legal Consulting",
    description:
      "Our legal experts provide guidance on all aspects of real estate transactions, protecting your interests.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Property Management",
    description:
      "From tenant screening to maintenance coordination, we handle the details so you enjoy worry-free ownership.",
  },
  {
    icon: <Ruler size={28} />,
    title: "Property Valuation",
    description:
      "Get an accurate assessment of your property's worth with our data-backed valuation services.",
  },
];

export default function ServiceSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle
            title="What We Offer"
            subtitle="Our Services"
            className="mb-0"
          />
          <Button
            asChild
            variant="outline"
            className="border-royal-primary text-royal-primary hover:bg-royal-primary hover:text-white dark:border-royal-secondary dark:text-royal-secondary dark:hover:bg-royal-secondary dark:hover:text-royal-dark self-start md:self-auto transition-all duration-300"
          >
            <Link href="/services" className="flex items-center gap-2">
              All Services
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedContent key={service.title} delay={index * 0.1} distance={40} direction="vertical">
              <ServiceCard {...service} index={index} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
