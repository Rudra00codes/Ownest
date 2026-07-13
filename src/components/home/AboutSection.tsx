import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, TrendingUp } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import AnimatedContent from "@/components/ui/animation/animatedContent";

const stats = [
  { icon: Award, value: "18+", label: "Years of Excellence" },
  { icon: Users, value: "1,400+", label: "Satisfied Clients" },
  { icon: TrendingUp, value: "$2B+", label: "Properties Sold" },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <AnimatedContent direction="horizontal" distance={60} duration={1}>
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Hermitage Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/40 to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 glass-dark rounded-2xl p-6 border border-white/10 shadow-2xl">
                <p className="text-royal-secondary font-bold text-3xl font-playfair">
                  280+
                </p>
                <p className="text-white/70 text-sm mt-1">Premium Listings</p>
                <div className="mt-3 h-0.5 w-8 bg-royal-secondary rounded-full" />
              </div>

              {/* Decorative ring */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-royal-secondary/30 opacity-60" />
            </div>
          </AnimatedContent>

          {/* Content */}
          <AnimatedContent direction="horizontal" reverse distance={60} duration={1} delay={0.15}>
            <div>
              <SectionTitle
                title="A Legacy of Luxury Real Estate Excellence"
                subtitle="Our Story"
              />

              <p className="text-muted-foreground leading-relaxed mb-4">
                Royal Hermitage was founded with a vision to redefine the luxury
                real estate experience. What began as a boutique agency has grown
                into one of the most respected names in high-end property,
                maintaining our commitment to personalized service and meticulous
                attention to detail.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Today, we represent extraordinary properties and discerning
                clients worldwide. Our core values remain unchanged: integrity,
                expertise, discretion, and an unwavering commitment to exceeding
                expectations.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl bg-royal-primary/5 dark:bg-royal-secondary/5 border border-royal-primary/10 dark:border-royal-secondary/10 text-center"
                  >
                    <Icon
                      size={20}
                      className="mx-auto mb-2 text-royal-secondary"
                    />
                    <p className="font-bold text-xl text-foreground font-playfair">
                      {value}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="bg-royal-primary hover:bg-royal-primary/90 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-royal-primary/30"
              >
                <Link href="/about" className="flex items-center gap-2">
                  Discover Our Story
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
