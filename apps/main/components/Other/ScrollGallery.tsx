"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollGalleryProps {
  title: string;
  images: string[];
}

const ScrollGallery = ({ title, images }: ScrollGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || images.length === 0) return;

    const container = containerRef.current;
    const imageHeight = window.innerHeight;

    // Pin the container and control the animation based on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${imageHeight * (images.length - 1)}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          setProgress(scrollProgress);

          // Determine the current image index based on scroll progress
          const current = Math.floor(scrollProgress * images.length);
          setCurrentImage(Math.min(current, images.length - 1));
        },
      },
    });

    images.forEach((_, index) => {
      if (index > 0) {
        // Initially position the image above the viewport
        gsap.set(imagesRef.current?.[index], { yPercent: -100, opacity: 1 });

        // Slide the image down into view
        tl.to(
          imagesRef.current?.[index],
          {
            yPercent: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          index, // Stagger the start of each slide-in
        );

        // Optionally, fade out the previous image as the new one slides in (adjust timing as needed)
        tl.to(
          imagesRef.current?.[index - 1],
          {
            opacity: 0.7,
            duration: 0.4,
            ease: "none",
          },
          index - 0.2, // Start fading slightly before the slide-in completes
        );
      }
    });

    // Initial setup for the first image
    gsap.set(imagesRef.current?.[0], { opacity: 1, yPercent: 0 });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images.length]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Full screen background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f3e46] via-[#354f52] to-[#52796f]" />

      {/* Images - Full Screen */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) =>
              imagesRef.current ? (imagesRef.current[index] = el) : null
            }
            className="absolute inset-0"
            style={{
              opacity: index === 0 ? 1 : 0,
              yPercent: index === 0 ? 0 : -100, // Start subsequent images off-screen
            }}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        {/* Title */}
        <h3 className="text-4xl md:text-6xl font-bold font-playfair text-white text-center mb-8 drop-shadow-2xl">
          {title}
        </h3>

        {/* Progress indicators */}
        <div className="flex gap-3 mb-8">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "bg-[#84a98c] scale-125 shadow-lg"
                  : "bg-white/40 backdrop-blur-sm"
              }`}
            />
          ))}
        </div>

        {/* Image counter */}
        <div className="text-white/90 text-lg font-medium mb-4 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
          {currentImage + 1} / {images.length}
        </div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#52796f] to-[#84a98c] transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollGallery;
