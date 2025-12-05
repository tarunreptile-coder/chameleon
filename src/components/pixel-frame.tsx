
"use client";

import { useState, useEffect, type ReactNode } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Wifi, Battery, Signal } from "lucide-react";

type PixelFrameProps = {
  children: ReactNode;
  className?: string;
};

export function PixelFrame({ children, className }: PixelFrameProps) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(format(new Date(), "h:mm aa"));
    };

    updateClock(); // Set initial time
    const timerId = setInterval(updateClock, 60000); // Update every minute

    return () => clearInterval(timerId);
  }, []);

  return (
    <div
      className={cn(
        "relative mx-auto h-[800px] w-[370px] rounded-[30px] border-[10px] border-neutral-800 bg-neutral-950 shadow-2xl pb-[35px]",
        className
      )}
    >
      <div className="absolute -right-1 top-32 h-24 w-1 rounded-r-lg bg-neutral-800"></div>
      <div className="h-full w-full overflow-hidden rounded-[20px] bg-white">
        <div className="absolute inset-x-0 top-0 z-10 px-4 pt-2">
            <div className="flex items-center justify-between text-black">
                <span className="text-xs font-bold">{currentTime}</span>
                <div className="absolute left-1/2 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-black"></div>
                <div className="flex items-center gap-1.5">
                    <Signal size={14} />
                    <Wifi size={14} />
                    <Battery size={20} className="scale-x-110" />
                </div>
            </div>
        </div>
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
