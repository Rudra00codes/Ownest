"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/ui/PropertyCard";
import PageHeader from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";
import type { Property, PropertyFilters, ListingType, PropertyType } from "@/types";

// Fallback properties used while Sanity isn't configured
const FALLBACK_PROPERTIES: Property[] = [
  {
    _id: "1", title: "Luxurious Beach Villa", slug: { current: "luxurious-beach-villa" },
    price: 2500000, listingType: "For Sale", propertyType: "Villa",
    location: "Malibu, California",
    description: "Stunning beachfront property with panoramic ocean views.",
    bedrooms: 5, bathrooms: 4.5, area: 4200, isFeatured: true,
  },
  {
    _id: "2", title: "Modern Downtown Penthouse", slug: { current: "modern-downtown-penthouse" },
    price: 1800000, listingType: "For Sale", propertyType: "Penthouse",
    location: "Downtown LA, California",
    description: "Exclusive penthouse with floor-to-ceiling windows and 360-degree city views.",
    bedrooms: 3, bathrooms: 3, area: 2800,
  },
  {
    _id: "3", title: "Classic Brownstone Townhouse", slug: { current: "classic-brownstone-townhouse" },
    price: 12000, listingType: "For Rent", propertyType: "Townhouse",
    location: "Brooklyn, New York",
    description: "Historic brownstone with modern interior renovations.",
    bedrooms: 4, bathrooms: 2.5, area: 3600,
  },
  {
    _id: "4", title: "Hillside Contemporary Mansion", slug: { current: "hillside-contemporary-mansion" },
    price: 5500000, listingType: "For Sale", propertyType: "House",
    location: "Beverly Hills, California",
    description: "Architectural masterpiece with infinity pool and home theater.",
    bedrooms: 6, bathrooms: 7, area: 8500,
  },
  {
    _id: "5", title: "Riverside Modern Apartment", slug: { current: "riverside-modern-apartment" },
    price: 7500, listingType: "For Rent", propertyType: "Apartment",
    location: "Chelsea, New York",
    description: "Light-filled apartment with designer kitchen and river views.",
    bedrooms: 2, bathrooms: 2, area: 1800,
  },
  {
    _id: "6", title: "Mediterranean Villa Estate", slug: { current: "mediterranean-villa-estate" },
    price: 4200000, listingType: "For Sale", propertyType: "Villa",
    location: "Santa Barbara, California",
    description: "Elegant Mediterranean-style estate with lush gardens.",
    bedrooms: 5, bathrooms: 5.5, area: 6200,
  },
];

const LISTING_TYPES: ListingType[] = ["For Sale", "For Rent"];
const PROPERTY_TYPES: PropertyType[] = ["House", "Apartment", "Villa", "Penthouse", "Townhouse", "Estate"];

export default function PropertiesPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading properties...</div>}>
      <PropertiesContent />
    </React.Suspense>
  );
}

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties] = useState<Property[]>(FALLBACK_PROPERTIES);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>({
    type: "all",
    propertyType: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize from URL params
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const pt = searchParams.get("propertyType") || "all";
    setSearchTerm(q);
    setFilters((f) => ({ ...f, propertyType: pt as any }));
  }, [searchParams]);

  const filteredProperties = properties.filter((p) => {
    if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !p.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.type !== "all" && p.listingType !== filters.type) return false;
    if (filters.propertyType !== "all" && p.propertyType !== filters.propertyType) return false;
    if (filters.minPrice && p.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && p.price > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms !== "any" && p.bedrooms < parseInt(filters.bedrooms)) return false;
    return true;
  });

  const resetFilters = () => {
    setFilters({ type: "all", propertyType: "all", minPrice: "", maxPrice: "", bedrooms: "any" });
    setSearchTerm("");
    router.push("/properties");
  };

  const hasActiveFilters = filters.type !== "all" || filters.propertyType !== "all" ||
    filters.minPrice || filters.maxPrice || filters.bedrooms !== "any" || searchTerm;

  return (
    <>
      <PageHeader
        title="Properties"
        subtitle="Discover Your Perfect Home"
        backgroundImage="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <div className="bg-card rounded-2xl border border-border p-4 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30 focus:border-royal-primary transition-all"
                />
              </div>

              {/* Type pills */}
              <div className="flex items-center gap-2">
                {["all", ...LISTING_TYPES].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilters((f) => ({ ...f, type: t as any }))}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      filters.type === t
                        ? "bg-royal-primary text-white"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {t === "all" ? "All" : t}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setFilterOpen(!filterOpen)}
                  variant="outline"
                  size="sm"
                  className="border-border"
                >
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-royal-secondary" />
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button onClick={resetFilters} variant="ghost" size="sm" className="text-muted-foreground">
                    <X size={16} className="mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Expanded Filters */}
            <div className={cn(
              "grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden transition-all duration-300",
              filterOpen ? "max-h-40 mt-4 pt-4 border-t border-border" : "max-h-0"
            )}>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Property Type</label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters((f) => ({ ...f, propertyType: e.target.value as any }))}
                  className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30"
                >
                  <option value="all">All Types</option>
                  {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Min Price</label>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Max Price</label>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Min Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters((f) => ({ ...f, bedrooms: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-royal-primary/30"
                >
                  <option value="any">Any</option>
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={String(n)}>{n}+</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground text-sm">
              <span className="font-bold text-foreground text-lg">{filteredProperties.length}</span>{" "}
              {filteredProperties.length === 1 ? "property" : "properties"} found
            </p>
          </div>

          {/* Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((p, i) => (
                <PropertyCard key={p._id} property={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-playfair">No properties found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search term</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
