import Image from "next/image";
import Link from "next/link";
import { Play, Eye, RotateCcw } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";

const tours = [
  {
    id: 1,
    title: "Beachfront Estate",
    location: "Malibu, CA",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    duration: "4:32",
    views: "2.4k",
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    location: "Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    duration: "3:18",
    views: "1.8k",
  },
  {
    id: 3,
    title: "Mediterranean Villa",
    location: "Santa Barbara, CA",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    duration: "5:47",
    views: "3.1k",
  },
];

export default function VirtualTours() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle
            title="Virtual Property Tours"
            subtitle="Explore Remotely"
            center
          />
          <p className="text-muted-foreground max-w-xl mx-auto -mt-4">
            Experience our properties from anywhere in the world with our
            immersive virtual tours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="group relative rounded-2xl overflow-hidden card-hover opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="relative h-56">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-royal-secondary/90 hover:bg-royal-secondary flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shadow-royal-secondary/40">
                    <Play size={20} className="text-royal-dark ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute top-3 right-3 glass px-2 py-1 rounded-md text-xs text-white font-medium">
                  {tour.duration}
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-playfair font-bold text-white mb-0.5">
                    {tour.title}
                  </h3>
                  <p className="text-white/70 text-sm">{tour.location}</p>
                  <div className="flex items-center gap-1 mt-1 text-white/50 text-xs">
                    <Eye size={11} />
                    <span>{tour.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-royal-primary hover:bg-royal-primary/90 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-royal-primary/30"
          >
            <Link href="/properties" className="flex items-center gap-2">
              <RotateCcw size={18} />
              Browse All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
