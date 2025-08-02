"use client";

import React, { useRef, useEffect } from "react";
import { Github, User } from "lucide-react";

// The Project interface and ProjectCard component remain the same.
interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  featured?: boolean;
  isGithub?: boolean;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="min-w-[30vw] h-[70vh] group cursor-pointer">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="h-full bg-[#354f52] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
          {/* Header with visual element */}
          <div className="h-1/3 bg-gradient-to-br from-[#52796f]/30 to-[#84a98c]/20 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(132,169,140,0.2),rgba(255,255,255,0))]"></div>
            {/* Logic fixed: Show Github icon for Github links, User icon otherwise */}
            {project.isGithub ? (
              <Github className="w-16 h-16 text-[#cad2c5]/80 relative z-10" />
            ) : (
              <User className="w-16 h-16 text-[#cad2c5]/80 relative z-10" />
            )}
          </div>
          {/* Content */}
          <div className="h-2/3 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold text-[#cad2c5] mb-4 group-hover:text-[#84a98c] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-lg text-[#cad2c5]/80 leading-relaxed mb-6">
                {project.description}
              </p>
            </div>
            {/* Tech stack */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-6 py-3 bg-[#52796f]/40 text-[#cad2c5] rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:bg-[#52796f]/60 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

// Corrected Projects Component
const Projects = () => {
  const projects: Project[] = [
    {
      title: "Multimodal AI Tutor",
      description:
        "A sophisticated dockerized AI system that processes videos and PDFs via Kafka streaming, featuring intelligent cross-modal content analysis.",
      tech: ["Python", "Docker", "Kafka", "AI/ML"],
      link: "https://github.com/dhruvv-raghu",
      featured: true,
    },
    {
      title: "Language Interpreters",
      description:
        "Advanced AST Walker interpreters including PyLox and TensorSpeak, designed for intuitive neural network declaration.",
      tech: ["Python", "AST", "Compilers"],
      link: "https://github.com/dhruvv-raghu",
    },
    {
      title: "Sports Analytics Pipeline",
      description:
        "Real-time computer vision pipeline leveraging YOLO object detection and OpenCV for comprehensive sports performance metrics.",
      tech: ["YOLO", "OpenCV", "Analytics", "Python"],
      link: "https://github.com/dhruvv-raghu",
    },
    {
      title: "Distributed Database System",
      description:
        "High-performance fault-tolerant database implementing the RAFT consensus algorithm for reliable leader election and ACID properties.",
      tech: ["Go", "RAFT", "Distributed Systems"],
      link: "https://github.com/dhruvv-raghu",
      featured: true,
    },
    {
      title: "Neural Network Optimizer",
      description:
        "Advanced optimization algorithms for deep learning models featuring adaptive learning rates and momentum-based convergence.",
      tech: ["PyTorch", "NumPy", "Optimization"],
      link: "https://github.com/dhruvv-raghu",
    },
    {
      title: "Explore More Projects",
      description:
        "Discover my complete portfolio of data science projects, research, open-source contributions, and collaborative work.",
      tech: ["Portfolio", "Open Source", "Collaboration"],
      link: "https://github.com/dhruvv-raghu",
      isGithub: true,
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // This effect adds horizontal scrolling with the vertical mouse wheel
  // This effect adds horizontal scrolling with the vertical mouse wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return; // Ignore horizontal mouse wheel movement

        // These values help determine if the scroll is at the beginning or end
        const scrollAmount = e.deltaY;
        const isAtStart = scrollAmount < 0 && container.scrollLeft === 0;
        const isAtEnd =
          scrollAmount > 0 &&
          Math.ceil(container.scrollLeft + container.clientWidth) >=
            container.scrollWidth;

        // If we are not at the edges, we hijack the scroll
        if (!isAtStart && !isAtEnd) {
          e.preventDefault(); // Prevent page scroll ONLY when scrolling horizontally
          container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            // 'auto' feels more responsive than 'smooth' for this interaction
            behavior: "auto",
          });
        }
        // If we ARE at an edge (isAtStart or isAtEnd), we do nothing.
        // This allows the default vertical page scroll to happen.
      };
      container.addEventListener("wheel", onWheel);
      return () => container.removeEventListener("wheel", onWheel);
    }
  }, []);

  return (
    // FIX 3: Added `overflow-hidden` to prevent horizontal scroll on the body
    <section className="min-h-screen bg-[#2f3e46] py-20 overflow-hidden">
      {/* Header Container (Constrained Width) */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-6xl font-light text-[#cad2c5] mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-[#cad2c5]/70 max-w-2xl leading-relaxed">
            A curated selection of work in data science, machine learning, and
            distributed systems engineering
          </p>
        </div>
      </div>

      {/* FIX 1: The scroll container is now outside the `max-w-7xl` div */}
      <div
        ref={scrollContainerRef}
        // FIX 2: Added horizontal padding `px-8` to align content with the header
        className="flex gap-8 pb-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#84a98c]/30 overflow-x-auto px-8"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
