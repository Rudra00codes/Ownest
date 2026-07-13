import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="text-royal-secondary text-7xl font-bold font-playfair mb-2">404</p>
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us
          help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-royal-primary hover:bg-royal-primary/90 text-white">
            <Link href="/" className="flex items-center gap-2">
              <Home size={16} />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
