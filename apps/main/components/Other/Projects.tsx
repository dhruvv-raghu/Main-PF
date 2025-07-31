"use client";

import React from "react";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Multimodal AI Tutor",
      description:
        "Dockerized AI system processing videos and PDFs through an asynchronous Kafka architecture with intelligent multimodal summaries.",
      tech: ["Python", "Docker", "Kafka", "AI"],
    },
    {
      title: "Language Interpreters",
      description:
        "AST Walker interpreters including PyLox and TensorSpeak for intuitive neural network declaration.",
      tech: ["Python", "AST", "Compilers"],
    },
    {
      title: "Sports Analytics Pipeline",
      description:
        "Computer vision pipelines with YOLO detection and OpenCV for real-time sports performance analysis.",
      tech: ["YOLO", "OpenCV", "Analytics"],
    },
    {
      title: "Social Network Analysis",
      description:
        "Graph-based analysis using Neo4j for community detection and behavioral pattern recognition.",
      tech: ["Neo4j", "NetworkX", "Graph Theory"],
    },
    {
      title: "Distributed Database",
      description:
        "Fault-tolerant database implementing RAFT consensus with automatic leader election and ACID transactions.",
      tech: ["Go", "RAFT", "Distributed Systems"],
    },
    // The "View All" card is now part of the grid for a balanced layout
    {
      isCTA: true,
      title: "Explore More Projects",
      description: "View my complete portfolio on GitHub.",
      link: "https://github.com/dhruvv-raghu",
    },
  ];

  return (
    // Vertically centered the content using flexbox
    <section className="min-h-screen bg-[#2f3e46] text-white flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Projects</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Selected work in data science, machine learning, and distributed
            systems
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) =>
            project.isCTA ? (
              // CTA Card styled to fit the grid
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center flex flex-col justify-center items-center hover:bg-white/10 transition-all duration-300 border-2 border-dashed border-white/20 hover:border-white/40"
              >
                <Github size={32} className="mb-4 text-white/80" />
                <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.description}
                </p>
              </a>
            ) : (
              // Standard Project Card with improved spacing
              <div
                key={project.title}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 flex flex-col h-full group"
              >
                <div>
                  <h3 className="text-xl font-medium mb-3 group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
