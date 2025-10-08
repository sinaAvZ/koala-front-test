import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Providers from "@/lib/core/providers/providers";
import { WebVitals } from "@/components/atoms/webVitals";

export const metadata: Metadata = {
  title: "Koala Blockchain - Crypto Tracker",
  description: "Real-time cryptocurrency price tracking with Binance API",
  generator: "Sina Moradi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
