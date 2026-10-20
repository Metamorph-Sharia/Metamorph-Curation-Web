import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";

import "./globals.css";

const instrumentSans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s | Metamorph Curation", default: "Metamorph Curation" },
  description: "The Metamorph team's console for reviewing and correcting the legal knowledge base.",
  robots: { index: false, follow: false }, // an internal tool
};

// The browser's own chrome matches the page background, in light and dark (globals.css --bg).
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#141110" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-[100dvh] text-[15px] leading-normal">
        <a
          href="#main"
          className="sr-only rounded-ui bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to Content
        </a>
        {children}
      </body>
    </html>
  );
}
