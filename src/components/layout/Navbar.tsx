"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] max-w-7xl",
        isScrolled
          ? "top-4 bg-black/20 border border-white/20 backdrop-blur-sm rounded-[1rem] py-3 px-6"
          : "top-8 bg-black/20 backdrop-blur-sm rounded-[1rem] py-2 px-4 md:px-8"
      )}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
          <span className="text-xl font-normal tracking-widest uppercase">OwnNest</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-normal text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors duration-300 hover:text-white/80 relative",
                pathname === link.href ? "text-white" : "text-white/80"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full opacity-50" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link href="/contact" className="flex items-center gap-3 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-all">
            Request a Call
            <div className="bg-black text-white rounded-full p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-white transition-colors hover:bg-white/10"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-dark border-t border-white/10">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-royal-secondary bg-royal-secondary/10"
                    : "text-white/80 hover:text-white hover:bg-white/5 hover:translate-x-1"
                )}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-3 bg-white text-black px-5 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-all w-full"
              >
                Request a Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
