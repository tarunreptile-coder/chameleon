
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
  
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white">
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="uiverse">
              <div className="uiverse__loading">
                  <div></div>
                  <div></div>
              </div>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        title="Generated Content"
        className={`h-full w-full border-none bg-white transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}
        sandbox="allow-scripts allow-same-origin"
        srcDoc={code || '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-family:sans-serif;padding:20px;text-align:center;">Enter a prompt and click \'Generate\' to see UI here.</div>'}
      />
    </div>
  );
}
