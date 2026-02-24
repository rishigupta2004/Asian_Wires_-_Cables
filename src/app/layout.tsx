import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import LenisProvider from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Asian Wires & Cables | Conducting Excellence Since 1990",
  description: "Premium wire and cable manufacturer in New Delhi. ISO 9001:2008 certified. Speaker wires, audio cables, CCTV cables, industrial cables. True Master, M1 VOICE, and Pro Asian 1051 quality tiers.",
  keywords: "wires, cables, speaker wires, audio cables, CCTV cables, wire manufacturer India, cable manufacturer Delhi, Asian Wires, True Master, M1 VOICE, Pro Asian 1051, electrical cables",
  openGraph: {
    title: "Asian Wires & Cables | Conducting Excellence Since 1990",
    description: "Premium wire and cable manufacturer. ISO 9001:2008 certified. Make in India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[var(--background-primary)] text-[var(--foreground-primary)] selection:bg-[var(--accent-primary)] selection:text-[var(--background-primary)]`}
      >
        <div className="noise-overlay" />
        <LenisProvider>
          <GSAPProvider>
            <CustomCursor />
            <Navigation />
            <main className="relative z-10">{children}</main>
          </GSAPProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
