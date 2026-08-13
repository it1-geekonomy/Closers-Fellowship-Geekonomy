import Image from "next/image";
import ApplicationForm from "@/components/ApplicationForm";

export default function ApplicationPage() {
  return (
    <main className="min-h-screen bg-page py-0 sm:px-4 sm:py-[34px]">
      <div className="relative mx-auto max-w-[940px] min-w-0 overflow-x-hidden border-0 border-line bg-cream px-6 py-9 sm:border sm:px-12 sm:py-[60px] md:px-[66px]">
        <header className="flex items-start justify-between gap-4">
          <Image
            src="/Geek Logo Black 1.png"
            alt="Geekonomy"
            width={280}
            height={48}
            priority
            className="h-11 w-auto sm:h-14"
          />
          <div className="text-right font-sans text-[13px] leading-[1.35] font-medium tracking-[1px] text-ink sm:text-sm">
            ON - SITE
            <br />
            BENGALURU
          </div>
        </header>

        <section className="mt-12 sm:mt-[66px]">
          <div className="font-display text-lg font-bold tracking-[4px] text-[#4a4a45] uppercase sm:text-[22px] sm:tracking-[6px]">
            THE CLOSERS FELLOWSHIP
          </div>
          <div className="my-4 h-1 w-[74px] rounded-sm bg-green" />
          <h1 className="font-display text-[42px] leading-none font-bold tracking-[0.5px] text-ink sm:text-[62px]">
            You found the door.
            <br />
            <span className="text-green">Now earn the room.</span>
          </h1>
          <p className="mt-[26px] max-w-[660px] text-base leading-[1.65] text-[#4a4a45] sm:text-[16.5px]">
            This is not an application in the usual sense. It is three questions. No
            cover letter, no buzzwords, a CV only if you feel like it. Answer the way a
            closer would, straight and specific. We read every one ourselves. If your
            answers land, we call within a few days.
          </p>
          <p className="mt-4 max-w-[640px] text-sm leading-[1.6] text-muted">
            Seats are open across the closing team, from Head of Sales to Account
            Executives. On-site, JP Nagar. Half your pay is fixed. The other half you
            earn.
          </p>
        </section>

        <ApplicationForm />

        <footer className="mt-[34px] font-sans text-[12.5px] tracking-[0.5px] text-[#a2a29a]">
          Geekonomy &nbsp;·&nbsp; The Closers Fellowship
        </footer>
      </div>
    </main>
  );
}
