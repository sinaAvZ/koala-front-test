import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { WebVitals } from "@/components/atoms/webVitals";
import Header from "@/components/organisms/header/header";
import Footer from "@/components/organisms/footer/footer";

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
