"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __cfThankYouInit?: boolean;
  }
}

export default function ThankYouPage() {
  useEffect(() => {
    if (window.__cfThankYouInit) return;
    window.__cfThankYouInit = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "closers_fellowship_application_success",
      page_path: "/thank-you",
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center bg-cream px-6 py-16 sm:px-12 md:px-20">
      <div className="mx-auto w-full max-w-[720px]">
        <div className="font-display text-base font-semibold tracking-[5px] text-[#4a4a45] uppercase sm:text-lg">
          THE CLOSERS FELLOWSHIP
        </div>
        <div className="my-4 h-1 w-[60px] rounded-sm bg-green" />
        <h1 className="font-display text-[42px] leading-[1.05] font-bold text-ink sm:text-[62px]">
          That&apos;s it. No follow-up needed.
        </h1>
        <p className="mt-7 max-w-[640px] text-base leading-[1.65] text-[#4a4a45] sm:text-[17px]">
          We read every application ourselves, not a bot. If your answers land, you will
          hear from us within a few days for a short call. If they do not, it was not the
          fit this time, and we respect your time enough to tell you.
        </p>
        <p className="mt-7 text-[13px] tracking-[0.5px] text-muted">
          Geekonomy &nbsp;·&nbsp; Built for people who close.
        </p>
        <a
          href="/"
          className="mt-12 inline-flex rounded-full border border-line px-6 py-2.5 font-display text-sm font-semibold tracking-wide text-ink transition hover:border-green hover:text-green"
        >
          Back to application
        </a>
      </div>
    </main>
  );
}
