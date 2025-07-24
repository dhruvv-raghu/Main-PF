"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"

// NOTE: For better organization, these components should be in their own files, 
// e.g., '@/components/BlogNavbar.tsx' and '@/components/BlogFooter.tsx'.

// Helper component for desktop navigation links
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white text-sm uppercase tracking-wider font-medium transition-colors duration-300"
    >
      {children}
    </Link>
  )
}

// The Navbar component for the blog section
function BlogNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/50 backdrop-blur-lg shadow-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/blog" className="text-white text-3xl font-bold tracking-wider">
            [Watchr] <span className="text-white/70 font-light">Blog</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/">Main Site</NavLink>
            <NavLink href="/blog/reviews">Reviews</NavLink>
            <NavLink href="/blog/essays">Essays</NavLink>
            <button aria-label="Search" className="text-gray-300 hover:text-white transition-colors">
              <Search size={18} />
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

// A simple footer for the blog layout
function BlogFooter() {
    return (
        <footer className="text-center py-12 text-gray-600 border-t border-gray-800">
            <p>&copy; {new Date().getFullYear()} [Watchr] Blog. All Rights Reserved.</p>
        </footer>
    )
}


// The main BlogLayout component
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen font-sans">
      <BlogNavbar />
      
      {/* The 'main' element wraps your page content */}
      {/* pt-24 adds top padding to prevent content from being hidden by the fixed navbar */}
      <main className="pt-24">
        {children}
      </main>
      
      <BlogFooter />
    </div>
  )
}