import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PropertyOfWeekBanner() {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12">
      <section className="bg-black rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden max-w-7xl mx-auto">
        {/* Background Video */}
        <div className="absolute inset-0 pointer-events-none">
          <video 
            className="absolute inset-0 w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative container mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Star
                  size={24}
                  className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  fill="currentColor"
                />
              </div>
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                  Weekly Feature
                </p>
                <h2 className="text-3xl md:text-4xl font-playfair italic font-medium text-white">
                  Property Of The Week
                </h2>
                <p className="text-white/50 text-sm mt-2">
                  Discover our handpicked exceptional listing
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="rounded-full bg-white hover:bg-gray-100 text-black font-medium transition-all duration-300 h-14 pl-6 pr-2 py-2 text-base flex-shrink-0 shadow-xl"
            >
              <Link href="/property-of-the-week" className="flex items-center gap-4">
                View Featured Property
                <span className="bg-black text-white p-2.5 rounded-full flex items-center justify-center">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
