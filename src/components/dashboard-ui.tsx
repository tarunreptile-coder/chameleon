"use client";

import { Bell } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function DashboardUI() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <header className="flex shrink-0 items-center justify-between p-4 pt-6">
        <Avatar className="size-9">
          <AvatarImage
            src={userAvatar?.imageUrl}
            data-ai-hint={userAvatar?.imageHint}
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" className="size-9">
          <Bell className="size-5" />
        </Button>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4"></main>
    </div>
  );
}
