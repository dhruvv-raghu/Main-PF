"use client";

import React from "react";

const Hero = () => {
  const letters = ["P", "O", "R", "T", "F", "O", "L", "I", "O"];
  const colors = [
    "#2f3e46",
    "#354f52",
    "#52796f",
    "#84a98c",
    "#cad2c5",
    "#84a98c",
    "#52796f",
    "#354f52",
    "#2f3e46",
  ];

  return (
    <section className="relative h-screen flex overflow-hidden">
      {letters.map((letter, index) => (
        <div
          key={index}
          className="flex-1 flex items-center justify-center relative group cursor-pointer transition-all duration-700 hover:flex-[1.2]"
          style={{ backgroundColor: colors[index] }}
        >
          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Letter */}
          <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
            <span
              className="text-6xl md:text-8xl lg:text-9xl font-bold font-playfair select-none"
              style={{
                color: index < 4 ? "#cad2c5" : "#2f3e46",
                textShadow:
                  index < 4
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(255,255,255,0.2)",
              }}
            >
              {letter}
            </span>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
