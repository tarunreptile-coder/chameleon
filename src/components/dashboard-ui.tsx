"use client";

import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Briefcase,
  Clapperboard,
  CreditCard,
  HelpCircle,
  Home,
  Music,
  Plus,
  Repeat,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const transactions = [
  {
    icon: "spotify",
    name: "Spotify Subscription",
    type: "Music",
    amount: "-$10.99",
  },
  { icon: "apple", name: "Apple Store", type: "Gadgets", amount: "-$1299.00" },
  {
    icon: "freelance",
    name: "Freelance Payment",
    type: "Work",
    amount: "+$3,500.00",
  },
  {
    icon: "netflix",
    name: "Netflix",
    type: "Entertainment",
    amount: "-$15.99",
  },
  { icon: "upwork", name: "Upwork", type: "Work", amount: "+$800.00" },
];

const TransactionIcon = ({ icon }: { icon: string }) => {
  const IconMap: Record<string, { icon: React.ElementType; color: string }> = {
    spotify: { icon: Music, color: "bg-chart-1/10 text-chart-1" },
    apple: { icon: ShoppingBag, color: "bg-chart-2/10 text-chart-2" },
    freelance: { icon: User, color: "bg-chart-3/10 text-chart-3" },
    netflix: { icon: Clapperboard, color: "bg-chart-4/10 text-chart-4" },
    upwork: { icon: Briefcase, color: "bg-chart-5/10 text-chart-5" },
  };

  const { icon: IconComponent, color } = IconMap[icon] || {
    icon: HelpCircle,
    color: "bg-muted text-muted-foreground",
  };

  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-full ${color}`}
    >
      <IconComponent className="size-5" />
    </div>
  );
};

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
        <div className="text-sm font-medium text-muted-foreground">My Wallet</div>
        <Button variant="ghost" size="icon" className="size-9">
          <Bell className="size-5" />
        </Button>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-8">
          <div className="my-4 text-center">
            <div className="text-sm text-muted-foreground">Total Balance</div>
            <div className="text-5xl font-extrabold tracking-tighter">
              $12,345.67
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium text-foreground">
            {[
              { icon: ArrowUpRight, label: "Send" },
              { icon: ArrowDownLeft, label: "Receive" },
              { icon: Repeat, label: "Swap" },
              { icon: Plus, label: "Buy" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 hover:bg-secondary"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Transactions</h2>
              <Button variant="link" className="h-auto p-0 text-sm text-primary">
                View All
              </Button>
            </div>
            <div className="space-y-2">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-secondary/30 p-3"
                >
                  <TransactionIcon icon={tx.icon} />
                  <div className="flex-1">
                    <div className="font-medium">{tx.name}</div>
                    <div className="text-sm text-muted-foreground">{tx.type}</div>
                  </div>
                  <div
                    className={`font-medium ${
                      tx.amount.startsWith("+")
                        ? "text-success"
                        : "text-foreground"
                    }`}
                  >
                    {tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

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
