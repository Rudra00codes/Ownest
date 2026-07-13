import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import PropertyCard from "@/components/ui/PropertyCard";
import AnimatedContent from "@/components/ui/animation/animatedContent";
import { client } from "@/sanity/lib/client";
import { featuredPropertiesQuery } from "@/sanity/lib/queries";
import type { Property } from "@/types";

// Fallback data for when Sanity isn't configured
const fallbackProperties: Property[] = [
  {
    _id: "1",
    title: "Luxurious Beach Villa",
    slug: { current: "luxurious-beach-villa" },
    price: 2500000,
    listingType: "For Sale",
    propertyType: "Villa",
    location: "Malibu, California",
    description: "Stunning beachfront property with panoramic ocean views, spacious interiors, and luxury finishes throughout.",
    bedrooms: 5,
    bathrooms: 4.5,
    area: 4200,
    isFeatured: true,
    mainImage: undefined,
  },
  {
    _id: "2",
    title: "Modern Downtown Penthouse",
    slug: { current: "modern-downtown-penthouse" },
    price: 1800000,
    listingType: "For Sale",
    propertyType: "Penthouse",
    location: "Downtown LA, California",
    description: "Exclusive penthouse with floor-to-ceiling windows, private terrace, and 360-degree city views.",
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    isFeatured: true,
    mainImage: undefined,
  },
  {
    _id: "3",
    title: "Classic Brownstone Townhouse",
    slug: { current: "classic-brownstone-townhouse" },
    price: 12000,
    listingType: "For Rent",
    propertyType: "Townhouse",
    location: "Brooklyn, New York",
    description: "Historic brownstone with modern interior renovations, high ceilings, and a private garden.",
    bedrooms: 4,
    bathrooms: 2.5,
    area: 3600,
    isFeatured: true,
    mainImage: undefined,
  },
];

async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return fallbackProperties;
    const data = await client.fetch<Property[]>(featuredPropertiesQuery);
    return data?.length ? data : fallbackProperties;
  } catch {
    return fallbackProperties;
  }
}

export default async function FeaturedProperties() {
  const properties = await getFeaturedProperties();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle
            title="Featured Properties"
            subtitle="Curated Listings"
            className="mb-0"
          />
          <Button
            asChild
            variant="outline"
            className="border-royal-primary text-royal-primary hover:bg-royal-primary hover:text-white dark:border-royal-secondary dark:text-royal-secondary dark:hover:bg-royal-secondary dark:hover:text-royal-dark self-start md:self-auto transition-all duration-300"
          >
            <Link href="/properties" className="flex items-center gap-2">
              View All Properties
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <AnimatedContent key={property._id} delay={index * 0.15} distance={50} direction="vertical">
              <PropertyCard property={property} index={index} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
