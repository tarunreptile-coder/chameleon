import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type IPhoneFrameProps = {
  children: ReactNode;
  className?: string;
};

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto h-[780px] w-[360px] rounded-[50px] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl",
        className
      )}
    >
      <div className="absolute left-1/2 top-0 h-4 w-40 -translate-x-1/2 rounded-b-lg bg-neutral-900"></div>
      <div className="absolute -left-1 top-20 h-16 w-1 rounded-l-lg bg-neutral-900"></div>
      <div className="absolute -left-1 top-48 h-8 w-1 rounded-l-lg bg-neutral-900"></div>
      <div className="absolute -right-1 top-32 h-24 w-1 rounded-r-lg bg-neutral-900"></div>
      <div className="h-full w-full overflow-hidden rounded-[40px] bg-black">
        <div className="absolute left-1/2 top-4 z-10 h-7 w-32 -translate-x-1/2 rounded-full bg-black"></div>
        <div className="dark h-full w-full">{children}</div>
      </div>
    </div>
  );
}
