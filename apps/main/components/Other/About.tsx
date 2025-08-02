"use client";

import React, { useEffect, useRef, useState } from "react";
// Import ArrowDown for the button icon
import { ArrowDown } from "lucide-react";

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
      {/* SECTION 1: Full-screen centered title with button */}
      <section
        ref={introRef}
        className="min-h-screen bg-[#354f52] flex flex-col items-center justify-center p-6 text-center"
      >
        <div
          className={`transition-all duration-1000 ${
            introVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-8 text-left">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Here, You'll Find Everything About Me!
            </h2>
            <div className="max-w-6xl">
              <p className="text-xl md:text-2xl text-white/70 mb-10 leading-relaxed">
                You can keep scrolling to learn more about my background, or
                click the button below to jump straight to my work.
              </p>
              <br />
              <a
                href="projects"
                className="inline-flex items-center gap-4 px-12 py-6 bg-[#84a98c] text-[#2f3e46] text-xl font-bold rounded-full shadow-lg hover:bg-[#cad2c5] hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                View My Projects
                <ArrowDown className="w-6 h-6" />
              </a>
            </div>
          </div>
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
            src="/mainpf3.jpeg"
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
              <p className="text-lg md:text-3xl text-white leading-relaxed">
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
