"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import SplitText from "@/components/ui/animation/splitText";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [mountVideo, setMountVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Load the video only on client side to optimize LCP and initial paint
  useEffect(() => {
    const timer = setTimeout(() => setMountVideo(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  ];

  return (
    <section className="bg-white p-2 md:p-3 lg:p-4 min-h-screen flex flex-col">
      <div className="relative flex-1 w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-4 md:p-10 lg:p-14">
        {/* Fallback Poster Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${fallbackImage})`,
          }}
        />

        {/* Video Background */}
        {/* {mountVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
            poster={fallbackImage}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
              type="video/mp4"
            />
          </video>
        )}
 */}
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-black/20 pointer-events-none  " />

        {/* Top Spacer - Leaves room for the global fixed navbar to overlay nicely */}
        <div className="relative z-10 w-full h-20" />

        {/* Bottom Content Area */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-8 w-full mt-auto">
          
          {/* Left side: Text & Buttons */}
          <div className="max-w-3xl">
            <h1 className="text-white text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] mb-10 tracking-tight flex flex-col items-start gap-1">
              <SplitText
                text="Your dream home,"
                tag="span"
                className="italic font-normal tracking-wide text-white"
                textAlign="left"
                delay={30}
              />
              <SplitText
                text="Handpicked with care"
                tag="span"
                className="font-sans font-normal text-white"
                textAlign="left"
                delay={30}
              />
            </h1>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/properties"
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-normal tracking-wide hover:bg-black/80 transition-colors"
              >
                Explore Properties
              </Link>
              <Link
                href="/"
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Home"
              >
                <Home size={20} />
              </Link>
              <Link
                href="/about"
                className="glass border border-white/30 text-white px-4 py-2 rounded-full text-sm font-normal tracking-wide hover:bg-white/10 transition-colors"
              >
                Who We Are
              </Link>
            </div>
          </div>
          
          {/* Right side: Glass Stats Panel */}
          <div className="border border-white/20 rounded-[2rem] p-8 lg:p-10 flex flex-col min-w-[200px] animate-fade-in-up backdrop-blur-sm bg-black/20">
            <div className="text-white text-3xl md:text-4xl font-bold mb-2 tracking-tight">1850+</div>
            <div className="text-white text-md md:text-lg font-medium mb-8">Happy Clients</div>
            
            {/* Avatars */}
            <div className="flex -space-x-4">
              {avatars.map((src, i) => (
                <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white/40 overflow-hidden shadow-lg z-10 hover:z-20 transition-transform hover:scale-110">
                  <Image src={src} alt="Happy client" width={40} height={40} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
