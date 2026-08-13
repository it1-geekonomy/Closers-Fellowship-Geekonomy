import type { Metadata } from "next";

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
  return children;
}
