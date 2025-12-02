"use client";

import { Bell } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function DashboardUI() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4"></main>
    </div>
  );
}
