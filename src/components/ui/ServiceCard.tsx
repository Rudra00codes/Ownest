import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

export default function ServiceCard({
  icon,
  title,
  description,
  className,
  index = 0,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl p-7 border border-border",
        "hover:border-royal-secondary/40 hover:shadow-xl hover:shadow-royal-primary/10",
        "transition-all duration-400 card-hover opacity-0 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-royal-primary/5 to-royal-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

      {/* Icon */}
      <div className="relative mb-5 inline-flex">
        <div className="w-14 h-14 rounded-xl bg-royal-primary/10 dark:bg-royal-secondary/10 flex items-center justify-center text-royal-primary dark:text-royal-secondary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-royal-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <h3 className="font-playfair font-bold text-xl text-foreground mb-3 group-hover:text-royal-primary dark:group-hover:text-royal-secondary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-royal-primary/0 via-royal-secondary to-royal-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
    </div>
  );
}
