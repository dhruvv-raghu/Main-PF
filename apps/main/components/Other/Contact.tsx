"use client";
import { useRef, useEffect, useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";

const Contact = () => {
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

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:raghudhruv2@gmail.com",
      label: "raghudhruv2@gmail.com",
      description: "Drop me a line anytime",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/dhruvv-raghu",
      label: "dhruvv-raghu",
      description: "Check out my code",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dhruvv-raghu-b114a3240/",
      label: "Dhruvv Raghu",
      description: "Let's connect professionally",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#2f3e46] flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
            Get In Touch
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white leading-relaxed mb-12 max-w-6xl mx-auto">
            I'm always excited to discuss new opportunities in Data Science and
            Machine Learning. Whether it's about a potential collaboration, job
            opportunity, or just to chat about the latest in deep learning, feel
            free to reach out!
          </p>
          <br />
          {/* Social Links */}
          <div className="space-y-6 mb-12 flex items-center gap-8">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-6 p-6 bg-[#354f52]/80 backdrop-blur-sm rounded-2xl hover:bg-[#52796f]/80 transition-all duration-300 border border-white/20 hover:border-[#84a98c]/50 hover:scale-105 hover:shadow-lg group max-w-2xl mx-auto"
              >
                <div className="p-4 bg-[#84a98c]/20 rounded-xl group-hover:bg-[#84a98c]/30 transition-all duration-300">
                  <link.icon className="w-8 h-8 text-[#84a98c]" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#84a98c] transition-colors duration-300">
                    {link.name}
                  </h3>
                  <p className="text-white/70 text-lg">{link.label}</p>
                  <p className="text-white/50 text-sm mt-1">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
