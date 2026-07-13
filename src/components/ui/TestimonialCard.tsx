import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  const photoUrl = testimonial.photo
    ? urlFor(testimonial.photo).width(200).height(200).url()
    : null;

  return (
    <div
      className={cn(
        "relative bg-card rounded-2xl p-7 border border-border opacity-0 animate-fade-in",
        "hover:border-royal-secondary/30 hover:shadow-lg hover:shadow-royal-primary/10 transition-all duration-300"
      )}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Quote icon */}
      <Quote
        size={36}
        className="absolute top-5 right-6 text-royal-secondary/15"
        aria-hidden
      />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              i < testimonial.rating
                ? "text-royal-secondary fill-royal-secondary"
                : "text-border"
            )}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {photoUrl ? (
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-royal-secondary/30 flex-shrink-0">
            <Image
              src={photoUrl}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-11 h-11 rounded-full bg-royal-primary/20 flex items-center justify-center flex-shrink-0 ring-2 ring-royal-secondary/30">
            <span className="text-royal-primary dark:text-royal-secondary font-bold font-playfair text-lg">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
          {testimonial.clientPosition && (
            <p className="text-muted-foreground text-xs">{testimonial.clientPosition}</p>
          )}
        </div>
      </div>
    </div>
  );
}
