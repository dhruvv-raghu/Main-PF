"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 w-full float-right clear-both ${
        isScrolled ? "bg-black/30 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="!text-white text-4xl font-bold tracking-wider">
            [Watchr] <span className="block text-white text-2xl font-bold tracking-wider">A Dhruvv Raghu Project</span>
          </Link>
          

          <div className="text-white text-8xl items-center gap-20 flex">

            
            <NavLink href="/blog">Click here for The Blog</NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg">
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-6">
            <MobileNavLink href="/projects" onClick={() => setIsMenuOpen(false)}>
              Projects
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/services" onClick={() => setIsMenuOpen(false)}>
              Services
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

// Desktop Navigation Link
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white hover:text-white text-sm uppercase tracking-widest font-medium transition-colors duration-300"
    >
      {children}
    </Link>
  )
}

// Mobile Navigation Link
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white hover:text-white text-xl uppercase tracking-widest font-medium transition-colors duration-300 py-2"
    >
      {children}
    </Link>
  )
}