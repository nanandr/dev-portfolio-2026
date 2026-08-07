import type { Metadata } from "next";
import { SUSE, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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
        { children }
      </body>
    </html>
  );
}