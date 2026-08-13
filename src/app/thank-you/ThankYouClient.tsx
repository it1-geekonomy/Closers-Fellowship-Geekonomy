"use client";

import ApplicationPage from "@/components/ApplicationPage";

export default function ThankYouClient() {
  return (
    <div className="relative">
      <div className="pointer-events-none select-none" aria-hidden>
        <ApplicationPage />
      </div>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,20,18,0.72)] p-[30px]">
        <div
          className="w-full max-w-[560px] border border-line bg-cream px-8 py-[52px] text-left sm:px-[50px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
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
          <a
            href="/"
            className="mt-8 inline-flex rounded-full border border-line bg-transparent px-6 py-2.5 font-display text-sm font-semibold tracking-wide text-ink transition hover:border-green hover:text-green"
          >
            Done
          </a>
        </div>
      </div>
    </div>
  );
}
