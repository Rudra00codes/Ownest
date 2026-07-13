"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["123 Luxury Avenue", "Beverly Hills, CA 90210", "United States"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+1 (555) 123-4567"],
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@royalhermitage.com"],
    href: "mailto:info@royalhermitage.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon–Fri: 9:00 AM – 6:00 PM", "Saturday: 10:00 AM – 4:00 PM", "Sunday: Closed"],
  },
];

const subjects = [
  "Property Inquiry",
  "Selling My Property",
  "Renting / Leasing",
  "Property Management",
  "Legal Consultation",
  "General Inquiry",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulated submission
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const inputClass =
    "w-full h-12 px-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30 focus:border-royal-primary transition-all placeholder:text-muted-foreground";

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in Touch"
        backgroundImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <SectionTitle title="Send Us a Message" subtitle="Get in Touch" />

              {sent && (
                <div className="mb-6 flex items-center gap-3 bg-royal-secondary/10 border border-royal-secondary/30 rounded-xl p-4">
                  <CheckCircle size={20} className="text-royal-secondary flex-shrink-0" />
                  <p className="text-sm text-foreground">
                    Thank you! We&apos;ll be in touch within one business day.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Smith" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Subject *
                    </label>
                    <select name="subject" value={formData.subject} onChange={handleChange} required className={inputClass}>
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your real estate needs..."
                    className={cn(inputClass, "h-auto resize-none py-3")}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-royal-primary hover:bg-royal-primary/90 text-white transition-all duration-300 hover:shadow-lg hover:shadow-royal-primary/30 h-12"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <SectionTitle title="Ways to Reach Us" subtitle="Contact Information" />

              <div className="space-y-4 mb-8">
                {contactInfo.map(({ icon: Icon, title, lines, href }) => (
                  <div key={title} className="flex gap-5 bg-card rounded-2xl p-6 border border-border hover:border-royal-secondary/30 transition-colors duration-300">
                    <div className="w-11 h-11 rounded-xl bg-royal-primary/10 dark:bg-royal-secondary/10 flex items-center justify-center text-royal-secondary flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                      {href ? (
                        <a href={href} className="text-muted-foreground text-sm hover:text-royal-primary dark:hover:text-royal-secondary transition-colors">
                          {lines[0]}
                        </a>
                      ) : (
                        lines.map((line, i) => (
                          <p key={i} className="text-muted-foreground text-sm">{line}</p>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-muted h-64 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-royal-primary/10 flex items-center justify-center">
                    <MapPin size={24} className="text-royal-secondary" />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-semibold text-sm">123 Luxury Avenue</p>
                    <p className="text-muted-foreground text-xs">Beverly Hills, CA 90210</p>
                  </div>
                  <p className="text-xs text-muted-foreground">(Google Maps integration available with API key)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
