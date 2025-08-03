"use client";
import { useRef, useEffect, useState } from "react";

const SpecialInterests = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting) {
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
    <section
      ref={sectionRef}
      id="interests"
      className="relative min-h-screen flex items-center py-20"
    >
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="/mainpf4.jpg"
          alt="Special interests background"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for blur effect and text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2f3e46] via-[#2f3e46]/80 to-transparent blur-5xl"></div>
      </div>

      {/* Left-aligned Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
        <div
          className={`transition-all duration-1000 w-full lg:w-1/2 xl:w-2/5 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="space-y-8 text-left">
            {/* Section Title */}
            <h1 className="text-4xl md:text-6xl lg:text-6xl font-light text-white leading-tight">
              Special Interests
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              I enjoy Storytelling and Cinema. I also love deconstructing
              sports, beyond just play. The psychology, the numbers and
              analytics, everything. So much so that I made my blogs center
              around these two passions.
            </p>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Sport and Cinema are very personal to me, in that both have the
              capability to weave stories and learnings that go far beyond the
              mundane daily experience. Beyond Inspiration, lies the ability to
              make them a personal experience. That is what I try to do here.
            </p>

            {/* Blog Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <a
                href="#sports-blog"
                className="inline-flex items-center justify-center px-10 py-5 bg-[#354f52]/80 backdrop-blur-sm text-white rounded-full text-xl font-medium hover:bg-[#52796f]/80 transition-all duration-300 border border-white/20 hover:border-[#84a98c]/50 hover:scale-105 hover:shadow-lg"
              >
                Sports Blog
              </a>
              <a
                href="#film-blog"
                className="inline-flex items-center justify-center px-10 py-5 bg-[#354f52]/80 backdrop-blur-sm text-white rounded-full text-xl font-medium hover:bg-[#52796f]/80 transition-all duration-300 border border-white/20 hover:border-[#84a98c]/50 hover:scale-105 hover:shadow-lg"
              >
                Film Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialInterests;
