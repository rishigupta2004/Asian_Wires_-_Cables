import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AISAN_SYS | Industrial Grade",
  description: "Aisan Computeronics & Electronics, Delhi, India - Engineering the nervous system of modern infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#E4E3DB] text-[#0F0F0F] selection:bg-[#FF3300] selection:text-[#E4E3DB] overflow-x-hidden font-mono min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
