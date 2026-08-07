import type { Metadata } from "next";
import { SUSE, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fontDisplay = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const fontSans = SUSE({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Nandana Rafi Ardika - Portfolio",
  description: "Software Engineer Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} ${fontDisplay.className}`}>
        {/* Faint Swiss grid lines */}
        <div className="fixed inset-0 z-0 grid grid-cols-4 pointer-events-none" aria-hidden="true">
          {/* <i className="border-l border-[rgba(20,20,18,0.05)]"></i>
          <i className="border-l border-[rgba(20,20,18,0.05)]"></i>
          <i className="border-l border-[rgba(20,20,18,0.05)]"></i>
          <i className="border-l border-[rgba(20,20,18,0.05)]"></i> */}
        </div>
        
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}