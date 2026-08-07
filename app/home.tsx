"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { PortfolioData } from "@/types/portfolio";

export default function Home({ data }: { data:PortfolioData }) {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      
      elements.forEach((elem) => {
        gsap.fromTo(
          elem,
          { y: 40, autoAlpha: 0 }, // autoAlpha handles visibility and opacity
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%", // Trigger when element is 85% down the viewport
            },
          }
        );
      });
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <>
      <Navbar data={data}/>
      <main className="relative z-10">
        <Hero data={data} />
        <About data={data} />
        <Projects data={data} />
        <div className="mt-[-80vh]">
          <Stack data={data} />
          <Contact data={data} />
        </div>
      </main>
      <Footer data={data}/>
    </>
  );
}