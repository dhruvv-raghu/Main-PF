"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:raghudhruv2@gmail.com",
      label: "raghudhruv2@gmail.com",
      color: "#ea4335",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/dhruvv-raghu",
      label: "dhruvv-raghu",
      color: "#333",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dhruvv-raghu-b114a3240/",
      label: "Dhruvv Raghu",
      color: "#0077b5",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 bg-gradient-to-b from-[#2f3e46] to-[#354f52] mesh-bg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-center text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-[#cad2c5] text-center mb-16 max-w-3xl mx-auto">
            Let's discuss opportunities in Data Science, Machine Learning, or
            any interesting projects
          </p>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Contact Info & Social Links */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="glass-dark rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 font-playfair">
                  Connect With Me
                </h3>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.name !== "Email" ? "_blank" : undefined}
                      rel={
                        link.name !== "Email"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                    >
                      <div
                        className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${link.color}20` }}
                      >
                        <link.icon size={24} style={{ color: link.color }} />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{link.name}</p>
                        <p className="text-[#84a98c] text-sm">{link.label}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Note - Full Width */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="glass-dark rounded-2xl p-8">
                <h4 className="text-xl font-bold text-white mb-4">
                  Quick Note
                </h4>
                <p className="text-[#cad2c5] leading-relaxed">
                  I'm always excited to discuss new opportunities in Data
                  Science and Machine Learning. Whether it's about a potential
                  collaboration, job opportunity, or just to chat about the
                  latest in deep learning, feel free to reach out!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
