"use client";

import React, { useEffect, useRef, useState } from "react";
import { Trophy, Film, BarChart3, Camera } from "lucide-react";

const SpecialInterests = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="interests" className="py-20 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-center text-white mb-16">
            Special Interests
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Sports Analytics */}
            <div
              className={`glass-dark rounded-2xl p-8 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Football Analytics"
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Trophy className="text-[#84a98c]" size={24} />
                  <BarChart3 className="text-[#cad2c5]" size={20} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
                Sports Analytics
              </h3>
              <div className="space-y-3">
                <p className="text-[#cad2c5] leading-relaxed">
                  Passionate about football analytics and sports data science
                </p>
                <p className="text-[#84a98c] leading-relaxed">
                  Developing computer vision solutions for player performance
                  metrics
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#52796f]/30 text-[#84a98c] rounded-full text-sm backdrop-blur-sm">
                  Computer Vision
                </span>
                <span className="px-3 py-1 bg-[#52796f]/30 text-[#84a98c] rounded-full text-sm backdrop-blur-sm">
                  Player Tracking
                </span>
                <span className="px-3 py-1 bg-[#52796f]/30 text-[#84a98c] rounded-full text-sm backdrop-blur-sm">
                  Performance Metrics
                </span>
              </div>
            </div>

            {/* Film & Media Blog */}
            <div
              className={`glass-dark rounded-2xl p-8 transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Cinema and Storytelling"
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Film className="text-[#84a98c]" size={24} />
                  <Camera className="text-[#cad2c5]" size={20} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
                Film & Media Blog
              </h3>
              <div className="space-y-3">
                <p className="text-[#cad2c5] leading-relaxed">
                  Writing analytical pieces about cinema and storytelling
                </p>
                <p className="text-[#84a98c] leading-relaxed">
                  Exploring the intersection of narrative structure and data
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#52796f]/30 text-[#84a98c] rounded-full text-sm backdrop-blur-sm">
                  Film Analysis
                </span>
                <span className="px-3 py-1 bg-[#52796f]/30 text-[#84a98c] rounded-full text-sm backdrop-blur-sm">
                  Storytelling
                </span>
                <span className="px-3 py-1 bg-[#52796f]/30 text-[#84a98c] rounded-full text-sm backdrop-blur-sm">
                  Narrative Data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialInterests;
