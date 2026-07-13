import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/animation/splitText";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  center = false,
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", center && "text-center", className)}>
      {subtitle && (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.2em] mb-3",
            light ? "text-royal-secondary" : "text-royal-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold font-playfair leading-tight",
          light ? "text-white" : "text-royal-primary dark:text-white"
        )}
      >
        <SplitText
          text={title}
          tag="span"
          className="inline-block"
          textAlign={center ? "center" : "left"}
          delay={35}
        />
      </h2>
      <div
        className={cn(
          "mt-4 h-0.5 w-16 bg-royal-secondary rounded-full",
          center && "mx-auto"
        )}
      />
    </div>
  );
}
