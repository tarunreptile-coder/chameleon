
"use client";

import { useState, useEffect } from "react";
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
        const response = await fetch('https://app.onreptile.com/api/ContentEntity/Post?organizationId=17877abd-6fdd-4103-b672-c97a429237f7', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 0Eb4bA_QT0TDO8NdG9jjdAFU5w1H07lNcb3BBTPcneI3dQUP4cWwn7134LGmkLQuupzBLC6BAKuVwL1cbO4ovHM0Je58S8obkxcZC8QP0AxLgLJpBeEbxZ02VNJx_LxpLno-s0jYDWgIpxtLv60zRptQ9oom3rLlH0Mj0IDMnq8fS9ddZxovJKHem6N5nF-6QLHpd-5Zwd--VAXOy1sJvdyI5_LSe6K7YsEZIlJt6sWKww1Lr9sDYQQv6wcC_5EL2FWSOIbeaR0QRf8JuktlJn0sxoS-MzP4eSxGn7MKL0Z-WAc02G9cwYk-KTlP7Eg_-IK7IT7tsw5CJDjttOAAzd7chMKPf7nl3Hhoh5pLpgRijrexsM7BymJsG7g0pFxElFxAxn6CRFFkL3LpwyoKdiJDoiG4YBGskUqmHQigzstKjh2latS2XyoJt-HstxV7Oqrcb96v6P-x93Gyy9Bg5a-W6a0MUm3O8yh7W2StmqvhtPn_hwuF-Mf0OfVDSN9GFxBFqSl-_Ef3kn0gscsN_JNg8MiTllof9uYxw3MdtO39ki4OsC2VOK35a_dUz3Mw7zGNk6puV38YM5fIy-hu-436MrkGC4wgrsiWTg745peoNlCn-tHkYCSzaTJI4jFClNkjdu99B1zp7P3BNa4sEfAvPek_Ez39grXqcwxEiG8P-kpNbUcROxEL0tZ8lnn_TrzLeGkDGUzyYfG9ApeHJRFz9XvucI7C4HErz8ES329mEzndWHwWOdUkpDkq_-2qJgSNBRdOtxxpMOuTDeqMbMsxbEqaM5zlfzs5WWt49k6U2l_vE10ZSzL1GCPYKf04lOQaGeBjtt1zJ4dGGsV2byaF2Z0Y1c3oqv7wIkTeA1zMTlGUfVMfiYAwgM3KpZgcb_PHZfL299--82OvGKbyLAonH5hnHWGBhnMJOvtjrrrdazKyjqoEnqaKDETVq9Pf89v8kKKkDaNO46F_S3bfgRtO_HSNSK3yOgET5lu690YA3ay1dkRIMmdQ7_AJ83fjcxxRHiy8Ufr3iBtIPAIMg6md_ljeTTMwPQriRY-s_2FoSsuijNo9nc6J2GlA1pXsDf4W4mIFD-ohuUSk_ozgchi7e6piCSmQbT_1QRPYFH9-I9XnuzdK4tHSkwU19FZCMqeBFbPWMJQX4hQS6LmDICTmMzuUptwww9jsLuDZjI5IEqgX9ptuQCJnU8vfhDoU7S0M-uThxeOdFNOWkMgxtA4VIDZ-CEC09QHcG4ZeOlnx5ZTNkQZJh-JlAWYkvDGZQYN83z1b9WoIQMHZIjP6wgzN2BTz6WNn3YPSSlN0dcYJ-xH_hm75EOhLphYG8X-ko8OIQQoDADlzPJHbzZ_WQB-kz125sjrs1wVvdQNNo_4oKsgLjB3YitB7n46hvZZgQ6bo-QXcvMsG_GKk5C_EA3Piqz6U3zU0H9zvGeECZhuuWX-85fkx3buMfR4j5ZRYYNZodhIwJM3FrvYXAhD6CNzdFb4EVxuT8KTob9CODww'
            },
            body: JSON.stringify({
                "name": submittedPrompt.split('\n')[0] || "Generated Content",
                "contentEntityType": {
                    "entityTypeId": 3,
                    "entityTypeName": "Issue"
                },
                "parentId": "c2e0bca5-4df0-4641-a211-5cf280116757"
            }),
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        const newContentId = result.id;
        
        setExportStep(2); // Exporting Content...
        
        // Simulate some processing time for the second step
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setCmsLink(`https://app.onreptile.com/content-list/${newContentId}`);

    } catch (error) {
        console.error("Failed to export to CMS:", error);
        // Handle error state in UI if needed
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
              <div className="h-full w-full rounded-lg border bg-background shadow-sm overflow-hidden">
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
