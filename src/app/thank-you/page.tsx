"use client";

import ApplicationPage from "@/components/ApplicationPage";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYouPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "closers_fellowship_application_success",
      page_path: "/thank-you",
    });

    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
  }, []);

  function handleClose() {
    window.location.assign("/");
  }

  return (
    <div className="relative">
      {/* Main website behind the window */}
      <div className="pointer-events-none select-none" aria-hidden>
        <ApplicationPage />
      </div>

      {/* Modal window overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,20,18,0.72)] p-[30px]"
        onClick={handleClose}
      >
        <div
          className="w-full max-w-[560px] border border-line bg-cream px-8 py-[52px] text-left sm:px-[50px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-display text-base font-semibold tracking-[5px] text-muted uppercase">
            THE CLOSERS FELLOWSHIP
          </div>
          <div className="my-3 h-1 w-[60px] rounded-sm bg-green" />
          <h1
            id="confirm-title"
            className="font-display text-[32px] leading-[1.05] font-bold text-ink sm:text-[38px]"
          >
            That&apos;s it. No follow-up needed.
          </h1>
          <p className="mt-[18px] text-[15px] leading-[1.65] text-[#4a4a45]">
            We read every application ourselves, not a bot. If your answers land, you
            will hear from us within a few days for a short call. If they do not, it was
            not the fit this time, and we respect your time enough to tell you.
          </p>
          <div className="mt-6 text-[13px] tracking-[0.5px] text-muted">
            Geekonomy &nbsp;·&nbsp; Built for people who close.
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="mt-8 inline-flex cursor-pointer rounded-full border border-line bg-transparent px-6 py-2.5 font-display text-sm font-semibold tracking-wide text-ink transition hover:border-green hover:text-green"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
