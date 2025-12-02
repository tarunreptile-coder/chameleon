
"use client";

import { useEffect, useRef } from "react";

type DashboardUIProps = {
  code: string;
  loading: boolean;
};

export function DashboardUI({ code, loading }: DashboardUIProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && code) {
      iframeRef.current.srcdoc = code;
    }
  }, [code]);

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-white">
        <div className="uiverse">
            <div className="uiverse__loading">
                <div></div>
                <div></div>
            </div>
        </div>
      </div>
    );
  }

  if (code) {
    return (
      <iframe
        ref={iframeRef}
        title="Generated Content"
        className="h-full w-full border-none"
        sandbox="allow-scripts allow-same-origin"
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-white text-center p-4">
      <p className="text-muted-foreground">Enter a prompt and click 'Generate' to see UI here.</p>
    </div>
  );
}
