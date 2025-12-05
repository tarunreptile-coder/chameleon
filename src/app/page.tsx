
"use client";

import { useState } from "react";
import { IPhoneFrame } from "@/components/iphone-frame";
import { PixelFrame } from "@/components/pixel-frame";
import { DashboardUI } from "@/components/dashboard-ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateCode } from "@/lib/codegen";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Device = "iphone" | "pixel";

export default function Home() {
  const [device, setDevice] = useState<Device>("iphone");
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateCode = async () => {
    setLoading(true);
    setCode("");
    try {
      const generatedCode = await generateCode(prompt);
      setCode(generatedCode);
    } catch (error) {
      console.error("Failed to generate code:", error);
      // Optionally, show an error message to the user
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen w-full flex-row items-center justify-center gap-16 bg-secondary p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <Input 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt to generate UI..."
          className="h-12 text-lg"
        />
        <Button onClick={handleGenerateCode} disabled={loading || !prompt} className="w-full h-12 text-lg">
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Select value={device} onValueChange={(value) => setDevice(value as Device)}>
          <SelectTrigger className="w-[370px]">
            <SelectValue placeholder="Select a device" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iphone">iPhone 17 Pro</SelectItem>
            <SelectItem value="pixel">Google Pixel 9 Pro</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex h-[800px] w-[370px] items-center justify-center">
          <div
            className={`absolute transition-all duration-300 ease-in-out ${
              device === "iphone"
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-95 pointer-events-none -z-10"
            }`}
          >
            <IPhoneFrame>
              <DashboardUI code={code} loading={loading} />
            </IPhoneFrame>
          </div>
          <div
            className={`absolute transition-all duration-300 ease-in-out ${
              device === "pixel"
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-95 pointer-events-none -z-10"
            }`}
          >
            <PixelFrame>
              <DashboardUI code={code} loading={loading} />
            </PixelFrame>
          </div>
        </div>
      </div>
    </main>
  );
}
