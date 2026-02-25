import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASIAN_SYS | Industrial Grade",
  description: "Asian Wires - Engineering the nervous system of modern infrastructure.",
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
      </body>
    </html>
  );
}
