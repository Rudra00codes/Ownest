import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Properties", href: "/properties" },
    { label: "Property of the Week", href: "/property-of-the-week" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    "Property Buying",
    "Property Selling",
    "Property Renting",
    "Legal Consultation",
    "Property Management",
    "Market Research",
  ],
};

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-royal-secondary/50 to-transparent" />

      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 group">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-bold font-playfair tracking-wide">
                  OWN{" "}
                  <span className="text-gold-shimmer">NEST</span>
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Redefining luxury real estate since 2025. We connect extraordinary
              people with extraordinary properties.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:text-royal-secondary hover:border-royal-secondary/50 hover:bg-royal-secondary/10 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-royal-secondary mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-royal-secondary"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-royal-secondary mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="group flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-royal-secondary"
                    />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-royal-secondary mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 text-royal-secondary flex-shrink-0"
                />
                <span className="text-sm text-white/60 leading-relaxed">
                  123 Luxury Avenue,
                  <br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <Phone
                    size={16}
                    className="text-royal-secondary flex-shrink-0"
                  />
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@royalhermitage.com"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <Mail
                    size={16}
                    className="text-royal-secondary flex-shrink-0"
                  />
                  info@royalhermitage.com
                </a>
              </li>
            </ul>

            {/* Working Hours */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/8">
              <p className="text-xs font-semibold text-royal-secondary mb-2 uppercase tracking-wide">
                Working Hours
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                Mon–Fri: 9:00 AM – 6:00 PM
                <br />
                Saturday: 10:00 AM – 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Royal Hermitage. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
