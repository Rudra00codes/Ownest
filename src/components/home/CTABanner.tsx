import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedContent from "@/components/ui/animation/animatedContent";

export default function CTABanner() {
  return (
    <div className="py-12 px-4 md:px-8">
      <section className="relative mx-auto max-w-7xl rounded-[2rem] overflow-hidden py-24 md:py-32 shadow-2xl">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video 
            className="absolute inset-0 w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
          >
            {/* Using a high-quality stock video URL */}
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <AnimatedContent className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center" distance={60} direction="vertical" duration={1}>
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-playfair italic font-medium mb-12 leading-[1.1] tracking-tight">
            Fine Homes <span className="font-serif relative inline-block">
              &
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-white/70" />
            </span><br />
            Luxury Properties
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white hover:bg-gray-100 text-black font-medium transition-all duration-300 h-14 pl-6 pr-2 py-2 text-base shadow-xl"
            >
              <Link href="/contact" className="flex items-center gap-4">
                Contact Us Now
                <span className="bg-black text-white p-2.5 rounded-full flex items-center justify-center">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 h-14 px-8 text-base bg-black/20 backdrop-blur-sm"
            >
              <Link href="/properties" className="flex items-center gap-2">
                Browse Properties
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </AnimatedContent>
      </section>
    </div>
  );
}
