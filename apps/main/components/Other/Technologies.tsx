"use client";

import { useEffect, useRef, useState } from "react";
import { Code, Database, Brain, Server, Layout, BarChart3 } from "lucide-react";

const Technologies = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate only once
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const frontendTech = [
    { name: "TypeScript", icon: Code, color: "#3178c6" },
    { name: "React", icon: Layout, color: "#61dafb" },
    { name: "Next.js", icon: Server, color: "#ffffff" },
    { name: "Node.js", icon: Server, color: "#339933" },
    { name: "Express", icon: Server, color: "#ffffff" },
    { name: "JavaScript", icon: Code, color: "#f7df1e" },
  ];

  const dataScienceTech = [
    { name: "PyTorch", icon: Brain, color: "#ee4c2c" },
    { name: "OpenCV", icon: BarChart3, color: "#5c3ee8" },
    { name: "NumPy", icon: BarChart3, color: "#013243" },
    { name: "Pandas", icon: Database, color: "#150458" },
    { name: "NetworkX", icon: Database, color: "#ff6b35" },
  ];

  // TechCard with slight modifications:
  // - Each card moves a bit to the right via container margin (ml-4 in grid)
  // - Increased gap between cards (gap-6)
  // - A bottom margin is added to cards to push the bottom row a little further down
  const TechCard = ({ tech, index }: { tech: any; index: number }) => (
    <div
      className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4 w-36 h-36 flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{
        transitionDelay: `${index * 80}ms`,
        marginBottom: "0.5rem",
      }}
    >
      <div
        className="p-3 rounded-full mb-3 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${tech.color}20` }}
      >
        <tech.icon size={28} style={{ color: tech.color }} />
      </div>
      <h3 className="text-md font-semibold text-white text-center">
        {tech.name}
      </h3>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="min-h-screen flex flex-col justify-center py-20 bg-[#2f3e46]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8">
        {/* Top Title Section - moved higher up */}
        <div
          className={`text-center mb-1 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Technologies
          </h2>
        </div>
        {/* Two-Column Layout for Skills */}
        <div className=" flex items-center gap-12 lg:gap-20">
          {/* Left Column: Web Development */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#84a98c] text-center lg:text-left ml-8">
              Web Development
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-20 justify-items-center ml-12">
              {frontendTech.map((tech, index) => (
                <TechCard key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </div>
          {/* Right Column: Data Science */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#84a98c] text-center lg:text-left ml-8">
              Data Science & ML
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-20 justify-items-center ml-12">
              {dataScienceTech.map((tech, index) => (
                <TechCard
                  key={tech.name}
                  tech={tech}
                  index={index + frontendTech.length} // Continue animation stagger
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
