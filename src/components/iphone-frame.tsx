import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Wifi, Battery, Signal } from "lucide-react";

type IPhoneFrameProps = {
  children: ReactNode;
  className?: string;
};

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto h-[780px] w-[360px] rounded-[50px] border-[12px] border-neutral-800 bg-neutral-950 shadow-2xl",
        className
      )}
    >
      {/* Power button */}
      <div className="absolute -right-[10px] top-36 h-24 w-[6px] rounded-l-md bg-neutral-800" />
      {/* Volume up */}
      <div className="absolute -left-[10px] top-32 h-14 w-[6px] rounded-r-md bg-neutral-800" />
      {/* Volume down */}
      <div className="absolute -left-[10px] top-[14.5rem] h-14 w-[6px] rounded-r-md bg-neutral-800" />
      {/* Mute switch */}
      <div className="absolute -left-[10px] top-[7.25rem] h-8 w-[6px] rounded-r-md bg-neutral-800" />
      
      <div className="h-full w-full overflow-hidden rounded-[40px] bg-white">
        <div className="absolute inset-x-0 top-0 z-10 px-6 pt-3">
          <div className="flex items-center justify-between text-black">
            <span className="text-xs font-bold">9:41</span>
            <div className="absolute left-1/2 top-1.5 h-7 w-28 -translate-x-1/2 rounded-full bg-black"></div>
            <div className="flex items-center gap-1.5">
              <Signal size={14} />
              <Wifi size={14} />
              <Battery size={20} className="scale-x-110" />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
