import ThankYouClient from "./ThankYouClient";

export default function ThankYouPage() {
  return (
    <>
      {/* Single Lead fire on real /thank-you load. sessionStorage prevents doubles. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  try {
    if (sessionStorage.getItem('cf_lead_fired') === '1') return;
    sessionStorage.setItem('cf_lead_fired', '1');
  } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'closers_fellowship_application_success',
    page_path: '/thank-you'
  });

  var tries = 0;
  var timer = setInterval(function () {
    tries += 1;
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
      clearInterval(timer);
    } else if (tries > 40) {
      clearInterval(timer);
    }
  }, 100);
})();
          `,
        }}
      />
      <ThankYouClient />
    </>
  );
}
