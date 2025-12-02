"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IPhoneFrame } from "@/components/iphone-frame";
import { PixelFrame } from "@/components/pixel-frame";
import { DashboardUI } from "@/components/dashboard-ui";

type Device = "iphone" | "pixel";

export default function Home() {
  const [device, setDevice] = useState<Device>("iphone");

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-secondary p-4">
      <div className="mb-8 flex items-center gap-2 rounded-lg bg-background p-1 shadow-sm">
        <Button
          onClick={() => setDevice("iphone")}
          variant={device === "iphone" ? "default" : "ghost"}
          className="w-40"
        >
          iPhone 17 Pro
        </Button>
        <Button
          onClick={() => setDevice("pixel")}
          variant={device === "pixel" ? "default" : "ghost"}
          className="w-40"
        >
          Google Pixel 9 Pro
        </Button>
      </div>

      <div className="relative flex h-[800px] w-[370px] items-center justify-center">
        <div
          className={`absolute transition-all duration-300 ease-in-out ${
            device === "iphone"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <IPhoneFrame>
            <DashboardUI />
          </IPhoneFrame>
        </div>
        <div
          className={`absolute transition-all duration-300 ease-in-out ${
            device === "pixel"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <PixelFrame>
            <DashboardUI />
          </PixelFrame>
        </div>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Created with Tailwind CSS & Next.js.
      </p>
    </main>
  );
}
