"use client";

import {
  Activity,
  Bell,
  CreditCard,
  HelpCircle,
  Home,
  Settings,
} from "lucide-react";

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

      <nav className="flex shrink-0 items-center justify-around border-t bg-background/80 p-1 backdrop-blur-sm">
        {[
          { icon: Home, label: "Home" },
          { icon: CreditCard, label: "Cards" },
          { icon: Activity, label: "Activity" },
          { icon: Settings, label: "Settings" },
        ].map(({ icon: Icon, label }, index) => (
          <Button
            key={label}
            variant="ghost"
            className={`flex h-auto flex-col items-center gap-1 rounded-lg p-2 ${
              index === 0 ? "text-primary" : "text-muted-foreground"
            } hover:text-primary`}
          >
            <Icon className="size-5" />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
}
