
"use client";

import { useState, useEffect } from "react";
import { IPhoneFrame } from "@/components/iphone-frame";
import { PixelFrame } from "@/components/pixel-frame";
import { DashboardUI } from "@/components/dashboard-ui";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateCode } from "@/lib/codegen";
import { improvePrompt } from "@/ai/flows/improve-prompt-flow";
import { exportToCms } from "@/ai/flows/export-to-cms-flow";
import { type ExportSection } from "@/ai/flows/export-to-cms-flow.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight, Sparkles, Upload } from "lucide-react";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { charityAppHtml } from "@/templates/charity_app";

type Device = "iphone" | "pixel" | "testing";

export default function Home() {
  const [device, setDevice] = useState<Device>("iphone");
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState(0);
  const [cmsLink, setCmsLink] = useState("");

  const isTestingUi = device === "testing";

  useEffect(() => {
    if (isTestingUi) {
      setCode(charityAppHtml);
      setSubmittedPrompt("Charity App Template");
    } else {
      // If switching away from testing UI, clear the code unless it was user-generated
      if (submittedPrompt === "Charity App Template") {
        setCode("");
        setSubmittedPrompt("");
      }
    }
  }, [device, isTestingUi, submittedPrompt]);


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

  const handleExport = async () => {
    setIsExporting(true);
    setExportStep(1); // Generating folders....

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(code, 'text/html');
        const appContainer = doc.querySelector('.app-container') || doc.body;
        const sections = Array.from(appContainer.querySelectorAll('section'));

        const exportSections: ExportSection[] = sections.map(section => {
            const id = section.id || `section-${Math.random().toString(36).substring(2, 9)}`;
            const nameElement = section.querySelector('h1, h2, h3, h4, h5, h6');
            const name = nameElement ? nameElement.textContent || 'Untitled Section' : 'Untitled Section';
            const imageElement = section.querySelector('img');
            const imageUrl = imageElement ? imageElement.src : '';
            const htmlBody = section.innerHTML;

            return { id, name, imageUrl, htmlBody };
        }).reverse();
        

        if (exportSections.length > 0) {
            const result = await exportToCms({ sections: exportSections });
            setCmsLink(`https://app.onreptile.com/organization/17877abd-6fdd-4103-b672-c97a429237f7/folder/c2e0bca5-4df0-4641-a211-5cf280116757`);
        } else {
             setCmsLink(`https://app.onreptile.com/organization/17877abd-6fdd-4103-b672-c97a429237f7/folder/c2e0bca5-4df0-4641-a211-5cf280116757`);
        }

        setExportStep(2); // Exporting Content...
        
        await new Promise((resolve) => setTimeout(resolve, 1500));


    } catch (error) {
        console.error("Failed to export to CMS:", error);
    } finally {
        setIsExporting(false);
        setExportStep(0);
    }
  };

  const showContent = loading || submittedPrompt || isExporting || cmsLink;
  const showImproveButton = prompt.length > 0 && !prompt.includes('\n');
  const allowGenerate = prompt.length > 150;

  const exportMessages = [
    "",
    "Generating folders....",
    "Exporting Content...",
  ];

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
      <ResizablePanel defaultSize={50} maxSize={50}>
        <div
          className={cn(
            "flex h-full flex-col p-6",
            !showContent && "items-center justify-center"
          )}
        >
          {showContent && !cmsLink && (
            <div className="flex-1 mb-4 p-4">
              <p className="text-sm text-muted-foreground mb-2">
                {isExporting ? "Exporting Status:" : "Submitted Prompt:"}
              </p>
              <p className="text-base">
                {isExporting ? exportMessages[exportStep] : submittedPrompt}
              </p>
            </div>
          )}
          {cmsLink && (
            <div className="flex-1 mb-4 p-4">
              <p className="text-sm text-muted-foreground mb-2">Export Complete!</p>
              <p className="text-base">
                Your project has been exported. You can access it here:{" "}
                <a href={cmsLink} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  {cmsLink}
                </a>
              </p>
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
              disabled={isTestingUi}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              {showImproveButton && !isTestingUi && (
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
                disabled={loading || !prompt || (showImproveButton && !allowGenerate) || isTestingUi}
                className={cn(
                  (loading || !prompt || (showImproveButton && !allowGenerate) || isTestingUi) 
                    ? "bg-gray-400" 
                    : "btn-gradient",
                  "text-white px-4 py-2 rounded-full flex items-center gap-2"
                )}
              >
                Prototype with AI <ArrowRight size={20} />
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
                <SelectItem value="testing">Testing UI</SelectItem>
                <SelectSeparator />
                <SelectItem value="add-device" disabled>Add device</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={cn("relative flex items-center justify-center", !isTestingUi && "h-[800px] w-[370px]")}>
            <div
              className={`absolute transition-all duration-300 ease-in-out ${
                device === "iphone"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none -z-[999]"
              }`}
            >
              <IPhoneFrame>
                <DashboardUI code={code} loading={loading} />
              </IPhoneFrame>
            </div>
            <div
              className={`absolute transition-all duration-300 ease-in-out ${
                device === "pixel"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none -z-[999]"
              }`}
            >
              <PixelFrame>
                <DashboardUI code={code} loading={loading} />
              </PixelFrame>
            </div>
            {isTestingUi && (
              <div className="h-[780px] w-full rounded-lg border bg-background shadow-sm overflow-hidden">
                <DashboardUI code={code} loading={loading} />
              </div>
            )}
          </div>
           {(code || isTestingUi) && (
            <Button variant="outline" onClick={handleExport} disabled={isExporting}>
              <Upload className="mr-2 h-4 w-4" />
              {isExporting ? "Exporting..." : "Export to CMS"}
            </Button>
          )}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

    