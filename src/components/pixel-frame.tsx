import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PixelFrameProps = {
  children: ReactNode;
  className?: string;
};

export function PixelFrame({ children, className }: PixelFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto h-[800px] w-[370px] rounded-[30px] border-[10px] border-neutral-300 bg-neutral-300 shadow-2xl",
        className
      )}
    >
      <div className="absolute -right-1 top-32 h-24 w-1 rounded-r-lg bg-neutral-300"></div>
      <div className="h-full w-full overflow-hidden rounded-[20px] bg-white">
        <div className="absolute left-1/2 top-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-black"></div>
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
