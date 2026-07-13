import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
import { client } from "@/sanity/lib/client";
import { allTeamQuery } from "@/sanity/lib/queries";
import type { TeamMember } from "@/types";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Royal Hermitage's 18-year legacy in luxury real estate, our passionate team, and our commitment to excellence.",
};

const fallbackTeam: TeamMember[] = [
  {
    _id: "1",
    name: "Jonathan Sterling",
    position: "Founder & CEO",
    bio: "With over 20 years of experience in luxury real estate, Jonathan founded Royal Hermitage with a vision to provide exceptional service to discerning clients.",
  },
  {
    _id: "2",
    name: "Sophia Martinez",
    position: "Chief Operations Officer",
    bio: "Sophia oversees all operations and ensures that every client receives the highest level of service that our brand promises.",
  },
  {
    _id: "3",
    name: "Michael Chen",
    position: "Head of Property Acquisitions",
    bio: "Michael has an exceptional eye for identifying properties with outstanding investment potential and exclusive features.",
  },
  {
    _id: "4",
    name: "Emily Johnson",
    position: "Luxury Property Specialist",
    bio: "Emily specializes in high-end properties and has a network of exclusive clients looking for exceptional homes.",
  },
];

async function getTeam(): Promise<TeamMember[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return fallbackTeam;
    const data = await client.fetch<TeamMember[]>(allTeamQuery);
    return data?.length ? data : fallbackTeam;
  } catch {
    return fallbackTeam;
  }
}

const missionItems = [
  "Delivering personalized service tailored to each client's unique needs",
  "Providing expert market knowledge and insights",
  "Maintaining the highest standards of professionalism and integrity",
  "Creating seamless, stress-free real estate experiences",
];

const visionItems = [
  "Setting the standard for exceptional client service in the industry",
  "Representing the most extraordinary properties in our markets",
  "Building lasting relationships based on trust and results",
  "Embracing innovation while honoring traditional values",
  "Making a positive impact in the communities we serve",
];

const certifications = [
  { title: "Certified Luxury Home Marketing Specialist", year: "Since 2010" },
  { title: "International Real Estate Specialist", year: "Since 2012" },
  { title: "Real Estate Board – Gold Status", year: "Since 2015" },
  { title: "Sustainable Property Certification", year: "Since 2018" },
];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Our Legacy"
        backgroundImage="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle title="Our Story" subtitle="Established in 2005" />
              <p className="text-muted-foreground mb-5 leading-relaxed">
                Royal Hermitage was founded with a vision to redefine the luxury
                real estate experience. What began as a small boutique agency has
                grown into one of the most respected names in high-end real
                estate, while maintaining our commitment to personalized service
                and attention to detail.
              </p>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                Our founder, Jonathan Sterling, recognized a gap in the market
                for a truly client-focused approach to luxury real estate. Drawing
                on his extensive experience, he assembled a team of like-minded
                professionals who shared his passion for exceptional service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Royal Hermitage represents some of the most extraordinary
                properties and discerning clients worldwide. While we&apos;ve grown,
                our core values remain unchanged: integrity, expertise, discretion,
                and an unwavering commitment to exceeding our clients&apos; expectations.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Hermitage office"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 glass-dark rounded-xl p-5 border border-white/10">
                <p className="text-royal-secondary font-bold text-3xl font-playfair">18+</p>
                <p className="text-white/70 text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Purpose"
            subtitle="Mission & Vision"
            center
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-royal-primary/10 flex items-center justify-center mb-5">
                <CheckCircle2 size={24} className="text-royal-primary dark:text-royal-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground font-playfair">
                Our Mission
              </h3>
              <ul className="space-y-3">
                {missionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-royal-secondary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 rounded-xl bg-royal-secondary/10 flex items-center justify-center mb-5">
                <CheckCircle2 size={24} className="text-royal-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground font-playfair">
                Our Vision
              </h3>
              <ul className="space-y-3">
                {visionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-royal-secondary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Meet Our Team"
            subtitle="The Experts"
            center
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <TeamMemberCard key={member._id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Certifications"
            subtitle="Professional Excellence"
            center
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map(({ title, year }) => (
              <div
                key={title}
                className="bg-card rounded-2xl p-6 border border-border text-center hover:border-royal-secondary/40 transition-colors duration-300 card-hover"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-royal-primary/10 dark:bg-royal-secondary/10 flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-royal-secondary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground font-playfair mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-royal-secondary text-xs font-medium">{year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
