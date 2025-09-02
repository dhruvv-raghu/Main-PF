"use client";
import { useRef, useEffect, useState } from "react";
import { Github } from "lucide-react";
import Navbar  from "@/components/Other/Navbar";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

const ProjectShowcase = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const projects: Project[] = [
    {
      title: "Multimodal AI Tutor",
      description:
        "A sophisticated dockerized AI system that processes videos and PDFs via Kafka streaming, featuring intelligent cross-modal content analysis for enhanced learning experiences.",
      tech: ["Python", "Docker", "Kafka", "AI/ML"],
      link: "https://github.com/dhruvv-raghu",
      image: "/img1.jpg",
    },
    {
      title: "Language Interpreters",
      description:
        "Advanced AST Walker interpreters including PyLox and TensorSpeak, designed for intuitive neural network declaration with custom syntax and semantic analysis.",
      tech: ["Python", "AST", "Compilers"],
      link: "https://github.com/dhruvv-raghu",
      image: "/mainpf2.jpg",
    },
    {
      title: "Sports Analytics Pipeline",
      description:
        "Real-time computer vision pipeline leveraging YOLO object detection and OpenCV for comprehensive sports performance metrics and player tracking analysis.",
      tech: ["YOLO", "OpenCV", "Analytics", "Python"],
      link: "https://github.com/dhruvv-raghu",
      image: "/mainpf.jpg",
    },
    {
      title: "Neural Network Optimizer",
      description:
        "Advanced optimization algorithms for deep learning models featuring adaptive learning rates and momentum-based convergence for improved training efficiency.",
      tech: ["PyTorch", "NumPy", "Optimization"],
      link: "https://github.com/dhruvv-raghu",
      image: "/img2.jpg",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(Math.min(newSection, projects.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects.length]);

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <Navbar />
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-[#84a98c] scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Project Sections */}
      {projects.map((project, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          className="relative min-h-screen flex items-center py-20"
        >
          {/* Background Image with Blur Effect */}
          <div className="absolute inset-0 z-0">
            <img
              src={project.image || "/placeholder.svg"}
              alt={`${project.title} background`}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for blur effect and text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2f3e46] via-[#2f3e46]/50 to-transparent"></div>
          </div>

          {/* Left-aligned Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
            <div className="w-full lg:w-1/2 xl:w-2/5">
              <div className="space-y-8 text-left">
                {/* Project Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                  {project.title}
                </h1>

                {/* Project Description */}
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {project.description}
                </p>

                {/* Technology Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.tech.map((tech) => (
                    <button
                      key={tech}
                      className="px-6 py-3 bg-[#354f52]/80 backdrop-blur-sm text-white rounded-full text-lg font-medium hover:bg-[#52796f]/80 transition-all duration-300 border border-white/20 hover:border-[#84a98c]/50"
                    >
                      {tech}
                    </button>
                  ))}
                </div>

                {/* View Project Link */}
                <div className="pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[#84a98c] hover:text-white text-lg font-medium transition-colors duration-300 group"
                  >
                    View Project
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer Section */}
      <footer className="relative min-h-screen flex items-center justify-center bg-[#2f3e46]">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-light text-[#cad2c5] mb-8">
            Explore More
          </h2>
          <p className="text-xl text-[#cad2c5]/70 mb-12 max-w-2xl mx-auto">
            Discover my complete portfolio of data science projects, research,
            and open-source contributions
          </p>
          <a
            href="https://github.com/dhruvv-raghu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-[#354f52] hover:bg-[#52796f] text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Github className="w-6 h-6" />
            Visit GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ProjectShowcase;
