"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const circles = circleRefs.current;
    const text = textRef.current;

    if (!container || !text) return;

    // Initial setup
    gsap.set(container, { opacity: 1 });
    gsap.set(text, { opacity: 0, y: 20 });

    // Text animation
    gsap.to(text, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    // Circles animation
    circles.forEach((circle, index) => {
      if (circle) {
        gsap.fromTo(
          circle,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            delay: index * 0.2,
            ease: "elastic.out(1, 0.5)",
            repeat: -1,
            yoyo: true,
          },
        );

        // Rotation animation
        gsap.to(circle, {
          rotation: 360,
          duration: 3,
          ease: "none",
          repeat: -1,
        });
      }
    });

    // Pulsing background effect
    gsap.to(container, {
      background: "linear-gradient(45deg, #2f3e46, #354f52, #52796f, #84a98c)",
      duration: 4,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const addToCircleRefs = (el: HTMLDivElement | null) => {
    if (el && !circleRefs.current.includes(el)) {
      circleRefs.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#2f3e46] via-[#354f52] to-[#52796f]"
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            ref={addToCircleRefs}
            className="absolute rounded-full border-2 border-[#84a98c]/30"
            style={{
              width: `${100 + index * 50}px`,
              height: `${100 + index * 50}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        {/* Main Loading Spinner */}
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-[#84a98c]/30 border-t-[#84a98c] rounded-full animate-spin mx-auto" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-[#52796f]/30 border-t-[#52796f] rounded-full animate-spin mx-auto mt-4 ml-4" />
        </div>

        {/* Loading Text */}
        <div ref={textRef} className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#cad2c5] via-[#84a98c] to-[#52796f] bg-clip-text text-transparent">
            Loading Experience
          </h2>
          <p className="text-lg text-[#cad2c5]">
            Preparing something amazing for you...
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-[#84a98c] to-[#52796f] rounded-full animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#84a98c]/10 to-[#52796f]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-[#354f52]/10 to-[#2f3e46]/10 rounded-full blur-xl animate-pulse" />
      </div>
    </div>
  );
}
