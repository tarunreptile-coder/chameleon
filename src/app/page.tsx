
"use client";

import { useState } from "react";
import { IPhoneFrame } from "@/components/iphone-frame";
import { PixelFrame } from "@/components/pixel-frame";
import { DashboardUI } from "@/components/dashboard-ui";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateCode } from "@/lib/codegen";
import { improvePrompt } from "@/ai/flows/improve-prompt-flow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send, Sparkles } from "lucide-react";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

type Device = "iphone" | "pixel";

export default function Home() {
  const [device, setDevice] = useState<Device>("iphone");
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

  const handleGenerateCode = async () => {
    setLoading(true);
    setCode("");
    setSubmittedPrompt(prompt);
    try {
      const generatedCode = await generateCode(prompt);
      setCode(generatedCode);
    } catch (error) {
      console.error("Failed to generate code:", error);
      // Optionally, show an error message to the user
    }
    setPrompt("");
    setLoading(false);
  };
  
  const handleImprovePrompt = async () => {
    setIsImproving(true);
    try {
      const improved = await improvePrompt(prompt);
      setPrompt(improved);
    } catch (error) {
      console.error("Failed to improve prompt:", error);
    }
    setIsImproving(false);
  };

  const showContent = loading || submittedPrompt;
  const showImproveButton = prompt.length > 0 && !prompt.includes('\n');

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
      <ResizablePanel defaultSize={50} maxSize={50}>
        <div
          className={cn(
            "flex h-full flex-col p-6",
            !showContent && "items-center justify-center"
          )}
        >
          {showContent && (
            <div className="flex-1 mb-4 p-4">
              <p className="text-sm text-muted-foreground mb-2">Submitted Prompt:</p>
              <p className="text-base">{submittedPrompt}</p>
            </div>
          )}
          <div
            className="relative w-full"
            style={!showContent ? { height: '10vh' } : { height: '24vh' }}
          >
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt to generate UI..."
              className={cn("pr-16 text-lg resize-none h-full")}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              {showImproveButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleImprovePrompt}
                  disabled={isImproving}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isImproving ? "Improving..." : "Improve prompt"}
                </Button>
              )}
              <Button
                onClick={handleGenerateCode}
                disabled={loading || !prompt || showImproveButton}
                size="icon"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <main className="flex h-full flex-col items-center justify-center gap-4 bg-secondary p-4">
          <div className="absolute top-10 z-20">
            <Select value={device} onValueChange={(value) => setDevice(value as Device)}>
              <SelectTrigger className="w-[370px]">
                <SelectValue placeholder="Select a device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iphone">iPhone 17 Pro</SelectItem>
                <SelectItem value="pixel">Google Pixel 9 Pro</SelectItem>
                <SelectSeparator />
                <SelectItem value="add-device" disabled>Add device</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative flex h-[800px] w-[370px] items-center justify-center">
            <div
              className={`absolute transition-all duration-300 ease-in-out ${
                device === "iphone"
                  ? "opacity-100 scale-100 z-0"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <IPhoneFrame>
                <DashboardUI code={code} loading={loading} />
              </IPhoneFrame>
            </div>
            <div
              className={`absolute transition-all duration-300 ease-in-out ${
                device === "pixel"
                  ? "opacity-100 scale-100 z-0"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <PixelFrame>
                <DashboardUI code={code} loading={loading} />
              </PixelFrame>
            </div>
          </div>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
