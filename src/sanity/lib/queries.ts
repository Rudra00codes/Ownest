import { groq } from "next-sanity";

// ─── Properties ────────────────────────────────────────────────────────────────

export const allPropertiesQuery = groq`
  *[_type == "property"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    price,
    listingType,
    propertyType,
    location,
    description,
    bedrooms,
    bathrooms,
    area,
    yearBuilt,
    garages,
    "mainImage": images[0],
    isFeatured,
    isPropertyOfWeek,
    publishedAt
  }
`;

export const featuredPropertiesQuery = groq`
  *[_type == "property" && isFeatured == true] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    price,
    listingType,
    propertyType,
    location,
    description,
    bedrooms,
    bathrooms,
    area,
    "mainImage": images[0]
  }
`;

export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    listingType,
    propertyType,
    location,
    description,
    fullDescription,
    bedrooms,
    bathrooms,
    area,
    yearBuilt,
    garages,
    images,
    features,
    isFeatured,
    isPropertyOfWeek,
    publishedAt,
    agent-> {
      name,
      position,
      photo,
      social
    }
  }
`;

export const propertyOfWeekQuery = groq`
  *[_type == "property" && isPropertyOfWeek == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    price,
    listingType,
    propertyType,
    location,
    description,
    bedrooms,
    bathrooms,
    area,
    images,
    agent-> {
      name,
      position,
      photo,
      social
    }
  }
`;

export const allPropertySlugsQuery = groq`
  *[_type == "property"] {
    "slug": slug.current
  }
`;

// ─── Team ──────────────────────────────────────────────────────────────────────

export const allTeamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    slug,
    position,
    bio,
    photo,
    social
  }
`;

// ─── Testimonials ───────────────────────────────────────────────────────────────

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    clientPosition,
    content,
    photo,
    rating
  }
`;

// ─── Site Settings ─────────────────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    tagline,
    heroHeading,
    heroSubtitle,
    contactEmail,
    contactPhone,
    address,
    socialLinks,
    seoDescription
  }
`;
