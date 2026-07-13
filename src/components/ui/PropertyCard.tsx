import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Expand, MapPin, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface PropertyCardProps {
  property: Property;
  className?: string;
  index?: number;
}

export default function PropertyCard({
  property,
  className,
  index = 0,
}: PropertyCardProps) {
  const imageUrl = property.mainImage
    ? urlFor(property.mainImage).width(800).height(500).url()
    : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link
      href={`/properties/${property.slug.current}`}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border",
        "card-hover opacity-0 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Listing type badge */}
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
              property.listingType === "For Sale"
                ? "bg-royal-secondary text-royal-dark"
                : "bg-royal-primary text-white"
            )}
          >
            {property.listingType}
          </span>
        </div>

        {/* Property type */}
        {property.propertyType && (
          <div className="absolute top-4 right-4">
            <span className="glass px-2.5 py-1 rounded-full text-xs text-white font-medium">
              {property.propertyType}
            </span>
          </div>
        )}

        {/* Price on hover */}
        <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-royal-secondary font-bold text-xl font-playfair">
            {formattedPrice}
            {property.listingType === "For Rent" && (
              <span className="text-white/70 text-sm font-normal">/mo</span>
            )}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
          <MapPin size={13} className="text-royal-secondary flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="font-playfair font-bold text-lg text-foreground mb-1 group-hover:text-royal-primary dark:group-hover:text-royal-secondary transition-colors duration-200 leading-snug">
          {property.title}
        </h3>

        {/* Description */}
        {property.description && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
            {property.description}
          </p>
        )}

        <div className="mt-auto">
          {/* Price */}
          <p className="text-royal-primary dark:text-royal-secondary font-bold text-xl font-playfair mb-4">
            {formattedPrice}
            {property.listingType === "For Rent" && (
              <span className="text-muted-foreground text-sm font-normal">/mo</span>
            )}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <StatItem icon={Bed} value={property.bedrooms} label="Beds" />
            <StatItem icon={Bath} value={property.bathrooms} label="Baths" />
            <StatItem
              icon={Expand}
              value={property.area.toLocaleString()}
              label="Sq ft"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

function StatItem({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Icon size={14} className="text-royal-primary dark:text-royal-secondary" />
      <span className="font-semibold text-foreground">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}
