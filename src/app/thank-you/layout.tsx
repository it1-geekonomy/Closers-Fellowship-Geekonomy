import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Application received — The Closers Fellowship · Geekonomy",
  description:
    "Thanks for applying to The Closers Fellowship. We read every application ourselves.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="thank-you-conversion" strategy="beforeInteractive">
        {`
          (function () {
            if (window.__closersThankYouTracked) return;
            window.__closersThankYouTracked = true;

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'closers_fellowship_application_success',
              page_path: '/thank-you'
            });

            function trackLead() {
              if (typeof window.fbq !== 'function') return false;
              window.fbq('track', 'Lead');
              return true;
            }

            if (!trackLead()) {
              var tries = 0;
              var timer = setInterval(function () {
                tries += 1;
                if (trackLead() || tries > 25) clearInterval(timer);
              }, 200);
            }
          })();
        `}
      </Script>
      {children}
    </>
  );
}
