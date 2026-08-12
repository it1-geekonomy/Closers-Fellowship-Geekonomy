"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";

const SEATS = [
  { value: "Head of Sales", label: "Head of Sales" },
  {
    value: "Builds AE — services and one-time",
    label: "Builds AE — one-time",
  },
  { value: "Retainer AE — recurring", label: "Retainer AE — recurring" },
  { value: "Not sure, you decide", label: "Not sure, you decide" },
] as const;

type SeatValue = (typeof SEATS)[number]["value"];

const QUESTIONS = [
  {
    id: "q1",
    label:
      "The biggest deal you have personally closed. The number, and what nearly killed it.",
  },
  {
    id: "q2",
    label:
      "A revenue number you have carried. Did you hit it? If not, what did you do next?",
  },
  {
    id: "q3",
    label:
      "Half this package is fixed and half you earn by hitting what you commit to. Tell us why that excites you rather than scares you.",
  },
] as const;

const fieldClass =
  "w-full max-w-full min-w-0 rounded-lg border border-line bg-[#f8f7f2] px-3.5 py-3 text-[15px] text-ink outline-none transition focus:border-green focus:bg-white";

function getUtmParams() {
  if (typeof window === "undefined") {
    return {
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      utm_source: "",
      utm_medium: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
  };
}

function SeatSelect({
  value,
  onChange,
}: {
  value: SeatValue;
  onChange: (value: SeatValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = SEATS.find((seat) => seat.value === value) ?? SEATS[0];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full min-w-0">
      <input type="hidden" name="seat" value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`${fieldClass} flex cursor-pointer items-center justify-between gap-3 text-left`}
      >
        <span className="min-w-0 truncate">{selected.label}</span>
        <span className="shrink-0 text-[#8a8a82]" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-[calc(100%+6px)] right-0 left-0 z-20 max-h-60 overflow-auto rounded-lg border border-line bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          {SEATS.map((seat) => {
            const isActive = seat.value === value;
            return (
              <li key={seat.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(seat.value);
                    setOpen(false);
                  }}
                  className={`block w-full cursor-pointer px-3.5 py-2.5 text-left text-[14px] leading-snug break-words ${
                    isActive
                      ? "bg-[#eef6e9] font-medium text-ink"
                      : "text-ink hover:bg-[#f8f7f2]"
                  }`}
                >
                  {seat.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [questionsError, setQuestionsError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seat, setSeat] = useState<SeatValue>(SEATS[0].value);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => setSubmitted(false), 5000);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const q1 = String(formData.get("q1") || "").trim();
    const q2 = String(formData.get("q2") || "").trim();
    const q3 = String(formData.get("q3") || "").trim();
    const answered = [q1, q2, q3].filter(Boolean).length;

    if (answered < 2) {
      setQuestionsError("Answer any 2 of the 3 questions to submit.");
      setSubmitError("");
      return;
    }

    setQuestionsError("");
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: String(formData.get("fullName") || "").trim(),
          email: String(formData.get("email") || "").trim(),
          phone: String(formData.get("phone") || "").trim(),
          seat,
          linkedin_portfolio: String(formData.get("linkedin") || "").trim(),
          answer_q1: q1,
          answer_q2: q2,
          answer_q3: q3,
          ...getUtmParams(),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !data?.success) {
        setSubmitError(
          data?.message || "Could not submit application. Please try again.",
        );
        return;
      }

      form.reset();
      setSeat(SEATS[0].value);
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className="relative mt-[52px] border-t border-line pt-[30px]">
          <div className="font-display text-[15px] font-bold tracking-[2px] text-green">
            01
          </div>
          <h2 className="mt-0.5 font-display text-2xl font-semibold tracking-[0.5px] text-ink sm:text-[30px]">
            Who are you
          </h2>

          <div className="mt-[22px] grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-[26px] sm:gap-y-5">
            <label className="flex min-w-0 flex-col gap-2 text-[13.5px] font-medium text-[#55554e]">
              Full name
              <input
                type="text"
                name="fullName"
                required
                placeholder="Your name"
                className={fieldClass}
              />
            </label>

            <label className="flex min-w-0 flex-col gap-2 text-[13.5px] font-medium text-[#55554e]">
              Email
              <input
                type="email"
                name="email"
                required
                placeholder="you@email.com"
                className={fieldClass}
              />
            </label>

            <label className="flex min-w-0 flex-col gap-2 text-[13.5px] font-medium text-[#55554e]">
              Phone / WhatsApp
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91"
                className={fieldClass}
              />
            </label>

            <div className="flex min-w-0 flex-col gap-2 text-[13.5px] font-medium text-[#55554e]">
              <span>Which seat fits you?</span>
              <SeatSelect value={seat} onChange={setSeat} />
            </div>

            <label className="flex min-w-0 flex-col gap-2 text-[13.5px] font-medium text-[#55554e] sm:col-span-2">
              <span>
                LinkedIn or portfolio{" "}
                <span className="text-xs font-normal text-[#a2a29a]">optional</span>
              </span>
              <input
                type="url"
                name="linkedin"
                placeholder="https://"
                className={fieldClass}
              />
            </label>
          </div>
        </section>

        <section className="relative mt-[52px] border-t border-line pt-[30px]">
          <div className="font-display text-[15px] font-bold tracking-[2px] text-green">
            02
          </div>
          <h2 className="mt-0.5 font-display text-2xl font-semibold tracking-[0.5px] text-ink sm:text-[30px]">
            The three questions
          </h2>
          <p className="mt-2 mb-1.5 text-[14.5px] text-muted">
            Answer any 2 of the 3. Be specific. Vague answers read as vague.
          </p>

          {QUESTIONS.map((q, i) => (
            <div
              key={q.id}
              className="mt-[22px] grid min-w-0 grid-cols-[40px_1fr] items-start gap-3.5 sm:grid-cols-[44px_1fr]"
            >
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-green font-display text-lg font-bold text-white">
                Q{i + 1}
              </div>
              <label className="flex min-w-0 flex-col gap-2 text-[13.5px] font-medium text-[#55554e]">
                {q.label}
                <textarea
                  name={q.id}
                  rows={3}
                  onChange={() => questionsError && setQuestionsError("")}
                  className={`${fieldClass} resize-y leading-normal`}
                />
              </label>
            </div>
          ))}

          {questionsError && (
            <p className="mt-4 text-sm font-medium text-[#b42318]" role="alert">
              {questionsError}
            </p>
          )}
        </section>

        <section className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-7">
          <div>
            <p className="text-[15px] text-[#55554e]">
              A few seats. Half your pay is yours to earn.
            </p>
            {submitError && (
              <p className="mt-2 text-sm font-medium text-[#b42318]" role="alert">
                {submitError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-full bg-green px-[34px] py-[15px] font-display text-[19px] font-bold tracking-[1px] text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "SUBMITTING…" : "SUBMIT APPLICATION →"}
          </button>
        </section>
      </form>

      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,20,18,0.72)] p-[30px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="w-full max-w-[560px] rounded border border-line bg-cream px-8 py-[52px] text-left sm:px-[50px]">
            <div className="font-display text-base font-semibold tracking-[5px] text-muted uppercase">
              THE CLOSERS FELLOWSHIP
            </div>
            <div className="my-3 h-1 w-[60px] rounded-sm bg-green" />
            <h2
              id="confirm-title"
              className="font-display text-[32px] leading-[1.05] font-bold text-ink sm:text-[38px]"
            >
              That&apos;s it. No follow-up needed.
            </h2>
            <p className="mt-[18px] text-[15px] leading-[1.65] text-[#4a4a45]">
              We read every application ourselves, not a bot. If your answers land, you
              will hear from us within a few days for a short call. If they do not, it
              was not the fit this time, and we respect your time enough to tell you.
            </p>
            <div className="mt-6 text-[13px] tracking-[0.5px] text-muted">
              Geekonomy &nbsp;·&nbsp; Built for people who close.
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 cursor-pointer rounded-full border border-line bg-transparent px-6 py-2.5 font-display text-sm font-semibold tracking-wide text-ink transition hover:border-green hover:text-green"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
