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
      <body className={`${fontSans.className} ${fontDisplay.className} relative min-h-screen bg-background`}>
        {/* Fixed Background Video (100vw, 100vh, stays still on scroll, negative z-index, no overlay) */}
        <div className="fixed inset-0 w-screen h-screen -z-50 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://ik.imagekit.io/nanandr/portfolio/17077-278405114_medium.mp4" type="video/mp4" />
          </video>
        </div>

        { children }
      </body>
    </html>
  );
}