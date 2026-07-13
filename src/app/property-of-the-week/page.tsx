import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Bed, Bath, Expand, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { propertyOfWeekQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Property } from "@/types";

export const metadata: Metadata = {
  title: "Property of the Week",
  description: "Discover our handpicked featured luxury property of the week at Royal Hermitage.",
};

const FALLBACK: Property = {
  _id: "7",
  title: "Villa One Hyde Park",
  slug: { current: "villa-one-hyde-park" },
  price: 1200000,
  listingType: "For Sale",
  propertyType: "Villa",
  location: "2050 Bloomingdale Ave, Los Angeles",
  description:
    "Stunning contemporary villa with panoramic views, featuring premium finishes and smart home technology throughout.",
  bedrooms: 4,
  bathrooms: 2,
  area: 3500,
  isPropertyOfWeek: true,
};

async function getPropertyOfWeek(): Promise<Property> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return FALLBACK;
    const data = await client.fetch<Property>(propertyOfWeekQuery);
    return data ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
}

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
];

export default async function PropertyOfTheWeekPage() {
  const property = await getPropertyOfWeek();

  const mainImageUrl = property.images?.[0]
    ? urlFor(property.images[0]).width(1200).height(800).url()
    : GALLERY_IMAGES[0];

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="min-h-screen bg-royal-dark text-white pt-20">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Button asChild variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <Link href="/properties" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              All Properties
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-royal-secondary/20 flex items-center justify-center">
            <Star size={18} className="text-royal-secondary" fill="currentColor" />
          </div>
          <div>
            <p className="text-royal-secondary text-xs font-semibold uppercase tracking-[0.2em]">
              Featured This Week
            </p>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair">
              Property Of The Week
            </h1>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-10">
          {/* Main image — 3 cols */}
          <div className="lg:col-span-3 relative rounded-2xl overflow-hidden h-72 md:h-[420px]">
            <Image
              src={mainImageUrl}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-royal-secondary text-royal-dark uppercase tracking-wide">
                {property.listingType}
              </span>
            </div>
          </div>

          {/* Right column — 2 images + stat */}
          <div className="lg:col-span-2 grid grid-rows-3 gap-4">
            {/* Stats card */}
            <div className="bg-royal-primary/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 row-span-1">
              <p className="text-4xl font-bold text-royal-secondary font-playfair mb-1">280+</p>
              <p className="text-white/70 text-sm mb-3">Premium Properties</p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-royal-secondary/50 text-royal-secondary hover:bg-royal-secondary/10"
              >
                <Link href="/properties" className="flex items-center gap-1.5">
                  Browse All <ArrowRight size={14} />
                </Link>
              </Button>
            </div>

            {/* Gallery images */}
            {GALLERY_IMAGES.slice(1, 3).map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden row-span-1">
                <Image src={img} alt={`Gallery ${i + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <MapPin size={14} className="text-royal-secondary" />
              {property.location}
            </div>
            <h2 className="text-3xl font-bold font-playfair mb-2">{property.title}</h2>
            <p className="text-4xl font-bold text-royal-secondary font-playfair mb-6">
              {formattedPrice}
              {property.listingType === "For Rent" && (
                <span className="text-white/50 text-lg font-normal">/month</span>
              )}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <StatChip icon={<Bed size={18} />} value={property.bedrooms} label="Bedrooms" />
              <StatChip icon={<Bath size={18} />} value={property.bathrooms} label="Bathrooms" />
              <StatChip icon={<Expand size={18} />} value={`${property.area.toLocaleString()} ft²`} label="Area" />
            </div>

            <p className="text-white/70 leading-relaxed mb-8">{property.description}</p>

            <Button
              asChild
              size="lg"
              className="bg-royal-secondary hover:bg-royal-secondary/90 text-royal-dark font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-royal-secondary/30"
            >
              <Link href={`/properties/${property.slug.current}`} className="flex items-center gap-2">
                View Full Details
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          {/* For Sale/Rent toggle card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="font-playfair font-bold text-xl mb-5">Quick Details</h3>
            <dl className="space-y-4">
              {[
                { label: "Property Type", value: property.propertyType },
                { label: "Status", value: property.listingType },
                { label: "Price", value: formattedPrice },
                { label: "Bedrooms", value: property.bedrooms },
                { label: "Bathrooms", value: property.bathrooms },
                { label: "Area", value: `${property.area.toLocaleString()} sq ft` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-white/8">
                  <dt className="text-white/50 text-sm">{label}</dt>
                  <dd className="font-semibold text-sm text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatChip({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-white/8 rounded-xl px-4 py-3">
      <span className="text-royal-secondary">{icon}</span>
      <div>
        <p className="font-bold text-white">{value}</p>
        <p className="text-white/50 text-xs">{label}</p>
      </div>
    </div>
  );
}
