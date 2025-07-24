"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"

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

// Helper component for mobile navigation links
function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white hover:text-gray-300 text-xl uppercase tracking-widest font-medium transition-colors duration-300 py-2"
    >
      {children}
    </Link>
  )
}

// The Navbar component for the blog section
function BlogNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Effect to handle navbar style change on scroll
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
          {/* Logo/Brand */}
          <Link href="/" className="text-white text-3xl font-bold tracking-wider">
            [Watchr] <span className="text-white/70 font-light">Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/">Main Site</NavLink>
            <NavLink href="/blog/reviews">Reviews</NavLink>
            <NavLink href="/blog/essays">Essays</NavLink>
            <NavLink href="/blog/about">About</NavLink>
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 w-full h-screen">
          <div className="container mx-auto px-6 py-8 flex flex-col items-center text-center space-y-6">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Main Site</MobileNavLink>
            <MobileNavLink href="/blog/reviews" onClick={() => setIsMenuOpen(false)}>Reviews</MobileNavLink>
            <MobileNavLink href="/blog/essays" onClick={() => setIsMenuOpen(false)}>Essays</MobileNavLink>
            <MobileNavLink href="/blog/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}


// The main page component with filler content
export default function BlogPage() {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen font-sans">
      <BlogNavbar />
      
      {/* A background image to demonstrate the transparency effect */}
      <div
        className="absolute top-0 left-0 w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url(/img3.jpg)", opacity: 0.3 }}
      ></div>

      <main className="relative container mx-auto px-6 md:px-8 pt-32 md:pt-40">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            The Director's Cut
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            In-depth analysis, reviews, and essays on the art of filmmaking.
          </p>
        </header>

        <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
          <h2>The Unseen Language of Cinema</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
          </p>
          <p>
            Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.
          </p>
          <blockquote>
            "Film is a mosaic of time." – Andrei Tarkovsky
          </blockquote>
          <p>
            Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Sorbi in justo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam bibendum, lectus quis varius dictum, mauris turpis ultrices velit, eget iaculis enim eros sed leo.
          </p>
          <h2>Color as a Character</h2>
          <p>
            Nam quis enim. In hac habitasse platea dictumst. Sed nec ante. In nonummy. Fusce consectetuer. Mauris polygoni, lacus in facilisis consectetuer, lacus lacus consectetuer dui, et consectetuer nunc mi et tellus. Praesent ante. Mauris eu dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.
          </p>
           <p>
            Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.
          </p>
        </article>
      </main>

      <footer className="text-center py-16 text-gray-600">
        <p>&copy; 2025 [Watchr] Blog</p>
      </footer>
    </div>
  )
}