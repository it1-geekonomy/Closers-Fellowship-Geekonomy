import ThankYouClient from "./ThankYouClient";

export default function ThankYouPage() {
  return (
    <>
      {/* GTM-only: push event for his Lead tag. Do NOT call fbq here. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  if (window.__cfThankYouInit) return;
  window.__cfThankYouInit = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'closers_fellowship_application_success',
    page_path: '/thank-you'
  });
})();
          `,
        }}
      />
      <ThankYouClient />
    </>
  );
}
