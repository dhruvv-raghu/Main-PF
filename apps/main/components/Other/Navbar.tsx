"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Technologies", href: "#technologies" },
    // This will now correctly navigate to the projects page
    { label: "Projects", href: "/projects" },
    { label: "Interests", href: "#interests" },
    { label: "Contact", href: "#contact" },
  ];

  // FIX 1: The helper function was moved outside and before the return statement.
  const handleRedirect = (item) => {
    // FIX 2: Correct 'if' statement syntax with parentheses.
    if (item.href.startsWith("#")) {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigates to other pages like /projects
      window.location.href = item.href;
    }
    // Always close the mobile menu after a click
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled || isMobileMenuOpen // Also apply style if menu is open for better UX
          ? "bg-nav-glass backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <a href="/" className="cursor-pointer">
            <h1 className="text-nav-text-hover text-3xl md:text-4xl font-bold tracking-wider">
              The Dhruvv Raghu Portfolio
            </h1>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <button
                key={item.label}
                // FIX 3: Correct onClick handler syntax
                onClick={() => handleRedirect(item)}
                className="text-nav-text hover:text-nav-text-hover text-lg font-medium uppercase tracking-widest transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-nav-text hover:text-nav-text-hover p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="bg-nav-glass backdrop-blur-lg rounded-lg p-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  // FIX 4: Unify mobile handler to use the same logic
                  onClick={() => handleRedirect(item)}
                  className="text-nav-text hover:text-nav-text-hover block w-full text-left px-4 py-3 text-xl uppercase tracking-widest font-medium hover:bg-white/10 rounded-lg transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
