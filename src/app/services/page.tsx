import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, Building, Key, PenSquare, ShieldCheck, Ruler, BadgeCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive luxury real estate services — buying, selling, renting, legal consulting, property management, and valuations.",
};

const services = [
  { icon: <Home size={28} />, title: "Property Buying", description: "We guide you through every step of the buying process, securing your dream property at the best possible price." },
  { icon: <Building size={28} />, title: "Property Selling", description: "Maximize your property's value with our strategic marketing approach, professional staging, and skilled negotiation." },
  { icon: <Key size={28} />, title: "Property Renting", description: "Whether renting or managing your rental, our team provides comprehensive services tailored to your needs." },
  { icon: <PenSquare size={28} />, title: "Legal Consulting", description: "Our legal experts provide guidance on all aspects of real estate transactions, protecting your interests." },
  { icon: <ShieldCheck size={28} />, title: "Property Management", description: "From tenant screening to maintenance coordination, we handle the details so you enjoy worry-free ownership." },
  { icon: <Ruler size={28} />, title: "Property Valuation", description: "Get an accurate assessment of your property's worth with our data-backed valuation services." },
];

const steps = [
  { number: "01", title: "Consultation", description: "We begin with a detailed consultation to understand your specific needs and goals." },
  { number: "02", title: "Strategy Development", description: "Our team creates a customized strategy tailored to your unique situation." },
  { number: "03", title: "Implementation", description: "We execute the plan with meticulous attention to detail and constant communication." },
  { number: "04", title: "Ongoing Support", description: "Our relationship doesn't end at closing — we provide continued support and services." },
];

const whyUs = [
  { icon: <BadgeCheck size={22} />, title: "Industry Expertise", description: "Decades of combined experience and deep market knowledge in every client relationship." },
  { icon: <Clock size={22} />, title: "Personalized Service", description: "We take the time to understand your unique needs and tailor our approach accordingly." },
  { icon: <ShieldCheck size={22} />, title: "Trusted Relationships", description: "Our extensive network ensures smooth transactions and exceptional service." },
  { icon: <Home size={22} />, title: "Exclusive Listings", description: "Access to premium properties, including off-market opportunities." },
  { icon: <Key size={22} />, title: "Comprehensive Support", description: "From first contact to beyond closing, we're with you every step of the way." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="What We Offer"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionTitle title="Comprehensive Real Estate Solutions" subtitle="Services" center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle title="How We Work" subtitle="Our Process" center />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ number, title, description }, i) => (
              <div key={number} className="relative bg-card rounded-2xl p-7 border border-border card-hover opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-5xl font-bold font-playfair text-royal-secondary/20 mb-3">{number}</div>
                <h3 className="text-xl font-bold font-playfair mb-3 text-foreground">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-royal-secondary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle title="The Royal Hermitage Difference" subtitle="Why Choose Us" />
              <div className="space-y-6">
                {whyUs.map(({ icon, title, description }) => (
                  <div key={title} className="flex gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-royal-primary/10 dark:bg-royal-secondary/10 flex items-center justify-center text-royal-secondary flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-playfair font-bold text-lg text-foreground mb-1">{title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-royal-primary hover:bg-royal-primary/90 text-white transition-all duration-300 hover:scale-[1.02]">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Us Today <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
                  alt="Team meeting"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden bg-black">
        {/* <div className="absolute inset-0 bg-royal-gradient" /> */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-royal-secondary/50 to-transparent" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
            Ready to Experience the<br />
            <span className="text-gold-shimmer">Royal Hermitage Difference?</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Whether you&apos;re buying, selling, or investing, our team is here to help you achieve your real estate goals.
          </p>
          <Button asChild size="lg" className="bg-royal-secondary hover:bg-royal-secondary/90 text-royal-dark font-bold transition-all duration-300 hover:scale-[1.02]">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
