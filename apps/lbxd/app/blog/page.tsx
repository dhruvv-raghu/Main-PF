"use client"

import type React from "react"
import Link from "next/link"


// The Navbar component for the blog section
function BlogNavbar() {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black w-full">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className= "text-yellow-300 text-2xl font-bold tracking-wider">[Watchr]</span><span className="block text-yellow-300 text-2xl font-bold tracking-wider">A Dhruvv Raghu Project</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}


// The main page component with filler content
export default function BlogPage() {
  return (
    <div className="bg-yellow-300 min-h-screen font-main">
      <BlogNavbar />

      <main className="w-full px-6 md:px-8 pt-32">
        <div className="min-h-screen flex items-center justify-center pb-20">
          <header className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-12 tracking-tight">
              The Blog
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-8xl mx-auto leading-relaxed">
              Explore what I write about film, storytelling, and the art of cinema. 
              Dive into thoughtful analysis, personal reflections, and cinematic discoveries.
            </p>
          </header>
        </div>
      </main>
    </div>
  )
}