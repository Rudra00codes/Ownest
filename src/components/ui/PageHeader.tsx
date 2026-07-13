import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative h-72 md:h-96 flex items-end overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/90 via-royal-dark/50 to-royal-dark/20" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pb-12 animate-fade-in">
        {subtitle && (
          <p className="text-royal-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-playfair leading-tight">
          {title}
        </h1>
        <div className="mt-4 h-0.5 w-20 bg-royal-secondary rounded-full" />
      </div>
    </section>
  );
}
