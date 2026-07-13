import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";

// ─── Sanity Image ─────────────────────────────────────────────────────────────

export interface SanityImage extends Image {
  alt?: string;
}

// ─── Property ─────────────────────────────────────────────────────────────────

export type ListingType = "For Sale" | "For Rent";
export type PropertyType =
  | "House"
  | "Apartment"
  | "Villa"
  | "Penthouse"
  | "Townhouse"
  | "Estate";

export interface Property {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  location: string;
  description?: string;
  fullDescription?: PortableTextBlock[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt?: number;
  garages?: number;
  mainImage?: SanityImage;
  images?: SanityImage[];
  features?: string[];
  agent?: TeamMember;
  isFeatured?: boolean;
  isPropertyOfWeek?: boolean;
  publishedAt?: string;
}

// ─── Team Member ──────────────────────────────────────────────────────────────

export interface TeamMember {
  _id: string;
  name: string;
  slug?: { current: string };
  position: string;
  bio?: string;
  photo?: SanityImage;
  social?: {
    email?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  order?: number;
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface Testimonial {
  _id: string;
  name: string;
  clientPosition?: string;
  content: string;
  photo?: SanityImage;
  rating: number;
  order?: number;
}

// ─── Site Settings ─────────────────────────────────────────────────────────────

export interface SiteSettings {
  siteTitle: string;
  tagline?: string;
  heroHeading?: string;
  heroSubtitle?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  seoDescription?: string;
}

// ─── Filter State ─────────────────────────────────────────────────────────────

export interface PropertyFilters {
  type: "all" | ListingType;
  propertyType: "all" | PropertyType;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
}
