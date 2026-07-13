import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { LenisProvider } from "@/components/providers/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const clashGrotesk = localFont({
  src: "../../public/font/ClashGrotesk_Headlines/ClashGrotesk_Complete/Fonts/WEB/fonts/ClashGrotesk-Variable.woff2",
  variable: "--font-clash",
  display: "swap",
});

const manrope = localFont({
  src: "../../public/font/Manrope_Body/Manrope_Complete/Fonts/WEB/fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Royal Hermitage | Luxury Real Estate",
    template: "%s | Royal Hermitage",
  },
  description:
    "Discover extraordinary luxury properties with Royal Hermitage — Beverly Hills premier real estate agency specializing in exceptional homes and investments.",
  keywords: [
    "luxury real estate",
    "Beverly Hills properties",
    "high-end homes",
    "property investment",
    "royal hermitage",
  ],
  authors: [{ name: "Royal Hermitage" }],
  creator: "Royal Hermitage",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://royalhermitage.com",
    siteName: "Royal Hermitage",
    title: "Royal Hermitage | Luxury Real Estate",
    description:
      "Discover extraordinary luxury properties with Royal Hermitage.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Hermitage | Luxury Real Estate",
    description: "Discover extraordinary luxury properties with Royal Hermitage.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${clashGrotesk.variable} ${manrope.variable} font-sans antialiased`}>
        <LenisProvider>
          <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        </LenisProvider>
      </body>
    </html>
  );
}
