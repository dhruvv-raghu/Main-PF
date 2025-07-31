"use client";

import React, { useEffect, useRef, useState } from "react";
import { Brain, Users, Lightbulb } from "lucide-react";

const About = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === introRef.current) {
            if (entry.isIntersecting) setIntroVisible(true);
          } else if (entry.target === detailsRef.current) {
            if (entry.isIntersecting) setDetailsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (introRef.current) observer.observe(introRef.current);
    if (detailsRef.current) observer.observe(detailsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* SECTION 1: Full-screen centered title (like Hero) */}
      <section
        ref={introRef}
        className="min-h-screen bg-[#354f52] flex flex-col items-center justify-center p-6"
      >
        <div
          className={`transition-all duration-1000 ${
            introVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Here, You'll find everything About Me!
          </h2>
          <p className="text-4xl md:text-4xl text-white/70 max-w-4xl mx-auto">
            A brief look into my passions, skills, and what drives my work in
            technology. Just keep scrolling!
          </p>
        </div>
      </section>

      {/* SECTION 2: Detailed view with background image */}
      <section
        ref={detailsRef}
        id="about"
        className="relative min-h-screen flex items-center py-20 md:py-32"
      >
        {/* Background Image with Blur Effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="/mainpf3.jpeg" // Using one of your gallery images
            alt="Abstract background"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for blur effect and text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2f3e46] via-[#2f3e46]/20 to-transparent "></div>
        </div>

        {/* Left-aligned Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
          <div
            className={`transition-all duration-1000 delay-300 w-full lg:w-1/2 xl:w-2/5 ${
              detailsVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-6 text-left">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                I'm a student pursuing a future in Data Science and Machine
                Learning. I particularly enjoy understanding the Mathematical
                Design of ML Systems from the ground-up. I love building them
                just as much!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
