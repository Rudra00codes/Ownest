"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Only render Studio in development
export default function StudioPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Studio Unavailable</h1>
          <p className="text-muted-foreground">
            The Sanity Studio is only accessible in development mode.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
