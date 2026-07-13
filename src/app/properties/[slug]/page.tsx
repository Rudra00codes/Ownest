import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Bed, Bath, Expand, MapPin, Calendar, Home, ArrowLeft,
  Phone, Mail, Share2, Heart, CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { propertyBySlugQuery, allPropertySlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Property } from "@/types";

// Static fallback for dev without Sanity
const FALLBACK_PROPS: Property[] = [
  {
    _id: "1", title: "Luxurious Beach Villa", slug: { current: "luxurious-beach-villa" },
    price: 2500000, listingType: "For Sale", propertyType: "Villa",
    location: "Malibu, California",
    description: "Stunning beachfront property with panoramic ocean views.",
    bedrooms: 5, bathrooms: 4.5, area: 4200, yearBuilt: 2020, garages: 2,
    features: ["Central Air Conditioning", "Hardwood Floors", "Gourmet Kitchen", "Swimming Pool", "Garden", "Security System", "Home Office", "Fireplace", "Outdoor Kitchen", "Walk-in Closets"],
  },
];

export async function generateStaticParams() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return FALLBACK_PROPS.map((p) => ({ slug: p.slug.current }));
    const slugs = await client.fetch<{ slug: string }[]>(allPropertySlugsQuery);
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return FALLBACK_PROPS.map((p) => ({ slug: p.slug.current }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: property.title,
    description: property.description,
  };
}

async function getProperty(slug: string): Promise<Property | null> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return FALLBACK_PROPS.find((p) => p.slug.current === slug) ?? null;
    return await client.fetch<Property>(propertyBySlugQuery, { slug });
  } catch {
    return FALLBACK_PROPS.find((p) => p.slug.current === slug) ?? null;
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const images = property.images?.length
    ? property.images
    : property.mainImage
    ? [property.mainImage]
    : [];

  const mainImageUrl = images[0]
    ? urlFor(images[0]).width(1400).height(700).url()
    : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="pt-20 pb-16 bg-background">
      {/* Back */}
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Link href="/properties" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Properties
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-4 mb-10">
        <div className="relative h-72 md:h-[500px] rounded-2xl overflow-hidden">
          <Image
            src={mainImageUrl}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Badge */}
          <div className="absolute top-6 left-6">
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${
              property.listingType === "For Sale"
                ? "bg-royal-secondary text-royal-dark"
                : "bg-royal-primary text-white"
            }`}>
              {property.listingType}
            </span>
          </div>

          {/* Action buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <ActionBtn icon={<Share2 size={16} />} label="Share" />
            <ActionBtn icon={<Heart size={16} />} label="Save" />
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-3">
            {images.slice(1, 4).map((img, i) => (
              <div key={i} className="relative h-20 w-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(img).width(300).height(200).url()}
                  alt={`View ${i + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left — details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <MapPin size={14} className="text-royal-secondary" />
                {property.location}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-3">
                {property.title}
              </h1>
              <p className="text-3xl font-bold text-royal-secondary font-playfair">
                {formattedPrice}
                {property.listingType === "For Rent" && (
                  <span className="text-muted-foreground text-base font-normal">/month</span>
                )}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Bed, value: property.bedrooms, label: "Bedrooms" },
                { icon: Bath, value: property.bathrooms, label: "Bathrooms" },
                { icon: Expand, value: `${property.area.toLocaleString()} ft²`, label: "Area" },
                { icon: Calendar, value: property.yearBuilt ?? "N/A", label: "Year Built" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-card rounded-2xl p-5 border border-border text-center">
                  <Icon size={22} className="mx-auto mb-2 text-royal-secondary" />
                  <p className="font-bold text-xl text-foreground font-playfair">{value}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl p-7 border border-border">
              <h2 className="text-2xl font-bold font-playfair mb-4 text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{property.description}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This exceptional property offers the perfect blend of luxury and comfort.
                Meticulously designed with attention to detail, the home features premium
                finishes and an open floor plan that maximizes natural light.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The gourmet kitchen is equipped with top-of-the-line appliances and custom
                cabinetry. The primary suite is a true retreat offering a spa-like bathroom
                and generous closet space. Additional amenities include smart home technology
                and beautifully landscaped grounds.
              </p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-card rounded-2xl p-7 border border-border">
                <h2 className="text-2xl font-bold font-playfair mb-5 text-foreground">
                  Property Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle size={15} className="text-royal-secondary flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — sidebar */}
          <div className="space-y-6">
            {/* Inquiry Form */}
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
              <h2 className="text-xl font-bold font-playfair mb-5 text-foreground">
                Interested in this property?
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full h-11 px-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-11 px-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full h-11 px-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30"
                />
                <textarea
                  rows={4}
                  placeholder={`I'm interested in ${property.title}. Please contact me.`}
                  className="w-full p-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30 resize-none"
                />
                <Button className="w-full bg-royal-primary hover:bg-royal-primary/90 text-white transition-all duration-300 hover:shadow-lg hover:shadow-royal-primary/30">
                  Send Inquiry
                </Button>
              </form>

              {/* Agent */}
              {property.agent && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.1em] mb-3">Listed By</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-royal-primary/10 flex items-center justify-center text-royal-primary font-bold font-playfair text-lg flex-shrink-0">
                      {property.agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{property.agent.name}</p>
                      <p className="text-royal-secondary text-xs">{property.agent.position}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {property.agent.social?.email && (
                      <a href={`mailto:${property.agent.social.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-royal-primary transition-colors">
                        <Mail size={14} className="text-royal-secondary" />
                        {property.agent.social.email}
                      </a>
                    )}
                    <a href="tel:+15551234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-royal-primary transition-colors">
                      <Phone size={14} className="text-royal-secondary" />
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="glass p-2.5 rounded-xl text-white hover:bg-white/20 transition-colors duration-200"
    >
      {icon}
    </button>
  );
}
