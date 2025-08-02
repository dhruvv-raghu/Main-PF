"use client";

import React, { useLayoutEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";

interface ScrollGalleryProps {
  title: string;
  images: string[];
}

const ScrollGallery = forwardRef<HTMLDivElement, ScrollGalleryProps>(
  ({ title, images }, ref) => {
    const imageElementsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
      const validImages = imageElementsRef.current.filter(Boolean);
      if (validImages.length <= 1) return;

      // This timeline automatically cycles through the images with a zoom effect
      const tl = gsap.timeline({
        repeat: -1, // Loop infinitely
        repeatDelay: 1, // Pause for 1 second between loops
      });

      // Set initial state of the first image
      gsap.set(validImages[0], { autoAlpha: 1 });

      validImages.forEach((_, i) => {
        const currentImage = validImages[i];
        const nextImage = validImages[(i + 1) % validImages.length];

        tl.fromTo(
          currentImage,
          { scale: 1, autoAlpha: 1 },
          { scale: 1.05, autoAlpha: 1, duration: 3, ease: "none" }, // Slow zoom in
        )
          .to(
            currentImage,
            { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" },
            ">-0.5",
          ) // Fade out current
          .fromTo(
            nextImage,
            { scale: 1.2, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out" }, // Fade in next
            "<", // Start at the same time as the fade out
          );
      });

      return () => {
        tl.kill(); // Cleanup timeline on unmount
      };
    }, [images]);

    return (
      <div ref={ref} className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {/* Solid background to prevent content overlap */}
          <div className="absolute inset-0 bg-[#2f3e46]"></div>

          <div className="relative w-full h-full">
            {images
              .filter((img) => img && img.trim() !== "")
              .map((image, index) => (
                <div
                  key={index}
                  ref={(el) => (imageElementsRef.current[index] = el)}
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0 }} // Start all hidden
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

          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <h3 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-2xl">
              {title}
            </h3>
          </div>
        </div>
      </div>
    );
  },
);

ScrollGallery.displayName = "ScrollGallery";

export default ScrollGallery;
