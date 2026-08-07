"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";

export default function Home() {
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
      <Hero />
      <About />
      <Projects />
      <div className="mt-[-80vh]">
        <Stack />
        <Contact />
      </div>
    </>
  );
}