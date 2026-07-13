import { client } from "@/sanity/lib/client";
import { allTestimonialsQuery } from "@/sanity/lib/queries";
import type { Testimonial } from "@/types";
import SectionTitle from "@/components/ui/SectionTitle";
import TestimonialCard from "@/components/ui/TestimonialCard";

const fallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Robert Anderson",
    clientPosition: "CEO, Anderson Enterprises",
    content:
      "Royal Hermitage helped me find the perfect executive property. Their attention to detail and understanding of my needs was exceptional.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Sarah Williams",
    clientPosition: "Interior Designer",
    content:
      "I've worked with many real estate agencies, but Royal Hermitage stands out with their professionalism and quality of properties.",
    rating: 5,
  },
  {
    _id: "3",
    name: "David Thompson",
    clientPosition: "Financial Advisor",
    content:
      "The team at Royal Hermitage made my property investment process smooth and profitable. I highly recommend their services.",
    rating: 4,
  },
];

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) return fallbackTestimonials;
    const data = await client.fetch<Testimonial[]>(allTestimonialsQuery);
    return data?.length ? data : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Client Testimonials"
            center
          />
          <p className="text-muted-foreground max-w-xl mx-auto -mt-4">
            Don&apos;t just take our word for it — hear from our satisfied clients who
            found their perfect properties with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial._id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
