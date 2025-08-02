"use client";

import React from "react";

// Import all your components
import Navbar from "@/components/Other/Navbar";
import Hero from "@/components/Other/Hero";
import About from "@/components/Other/About";
import Technologies from "@/components/Other/Technologies";
import SpecialInterests from "@/components/Other/SpecialInterests";
import Contact from "@/components/Other/Contact";

export default function Home() {
  // All the GSAP, Observer, and useEffect logic has been removed to restore normal scroll.
  return (
    <main className="bg-[#2f3e46] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Technologies />
      <SpecialInterests />
      <Contact />
    </main>
  );
}
