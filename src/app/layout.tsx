import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NoiseOverlay, CustomCursor } from "@/components/retro";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-mono-custom antialiased bg-[#E4E3DB] text-[#0F0F0F] selection:bg-[#F23A18] selection:text-[#0F0F0F] overflow-x-hidden`}
      >
        <NoiseOverlay />
        <CustomCursor />
        <main className="relative z-10">
          {children}
        </main>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
          .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
          .font-mono-custom { font-family: 'Space Mono', 'JetBrains Mono', monospace; }
          
          /* Brutalist Scrollbar */
          ::-webkit-scrollbar { width: 24px; background: #D7D6CD; border-left: 4px solid #0F0F0F; }
          ::-webkit-scrollbar-thumb { background: #F23A18; border: 4px solid #0F0F0F; }
          ::-webkit-scrollbar-thumb:hover { background: #0F0F0F; }
          ::-webkit-scrollbar-button:single-button:vertical:decrement { height: 24px; width: 24px; background-color: #E4E3DB; border: 4px solid #0F0F0F; border-bottom: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(15, 15, 15)'><polygon points='50,20 20,80 80,80'/></svg>"); background-size: 10px; background-position: center; background-repeat: no-repeat; }
          ::-webkit-scrollbar-button:single-button:vertical:increment { height: 24px; width: 24px; background-color: #E4E3DB; border: 4px solid #0F0F0F; border-top: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(15, 15, 15)'><polygon points='20,20 80,20 50,80'/></svg>"); background-size: 10px; background-position: center; background-repeat: no-repeat; }

          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes marquee_reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          @keyframes scanline { 0% { top: 0; } 100% { top: 100%; } }

          /* Brutal Glitch Effect */
          .glitch-hover:hover { 
            text-shadow: 4px 0 #F23A18, -4px 0 #0000AA; 
            animation: glitch 0.1s linear infinite; 
          }
          @keyframes glitch { 
            0% { transform: translate(0) skew(0deg) } 
            20% { transform: translate(-3px, 3px) skew(-5deg) } 
            40% { transform: translate(-3px, -3px) skew(5deg) } 
            60% { transform: translate(3px, 3px) skew(-5deg) } 
            80% { transform: translate(3px, -3px) skew(5deg) } 
            100% { transform: translate(0) skew(0deg) } 
          }

          /* Screen Tear Router Glitch */
          .screen-tear {
             animation: tear 0.3s steps(2, end) infinite;
             filter: contrast(1.5) saturate(2);
          }
          @keyframes tear {
             0% { clip-path: inset(10% 0 80% 0); transform: translateX(-10px); }
             50% { clip-path: inset(50% 0 30% 0); transform: translateX(10px); }
             100% { clip-path: inset(80% 0 5% 0); transform: translateX(-5px); }
          }

          * { cursor: none !important; }
        `}} />
      </body>
    </html>
  );
}
