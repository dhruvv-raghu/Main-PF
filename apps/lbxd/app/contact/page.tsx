import type React from "react"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { Github, Instagram, Linkedin, Film } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black font-main">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Heading with gold gradient */}
          <h1 className="text-7xl md:text-8xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200">
            Contact
          </h1>

          {/* Brief intro */}
          <p className="text-white/90 text-xl mb-16 max-w-2xl">
            Connect with us through our social platforms or reach out directly.
          </p>

          {/* Social links */}
          <div className="grid gap-8 mb-16">
            <SocialLink
              icon={<Github className="w-8 h-8" />}
              platform="GitHub"
              username="cinematicstudios"
              href="https://github.com/cinematicstudios"
            />

            <SocialLink
              icon={<Instagram className="w-8 h-8" />}
              platform="Instagram"
              username="@cinematic"
              href="https://instagram.com/cinematic"
            />

            <SocialLink
              icon={<Linkedin className="w-8 h-8" />}
              platform="LinkedIn"
              username="Cinematic Studios"
              href="https://linkedin.com/company/cinematic-studios"
            />

            <SocialLink
              icon={<Film className="w-8 h-8" />}
              platform="Letterboxd"
              username="cinematicstudios"
              href="https://letterboxd.com/cinematicstudios"
            />
          </div>

          {/* Gold accent line */}
          <div className="w-24 h-1 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200"></div>
        </div>
      </main>
    </div>
  )
}

interface SocialLinkProps {
  icon: React.ReactNode
  platform: string
  username: string
  href: string
}

function SocialLink({ icon, platform, username, href }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-6 p-6 rounded-lg bg-black border border-amber-900/30 hover:border-amber-500/50 transition-all duration-300 group"
    >
      <div className="text-amber-500 group-hover:text-amber-400 transition-colors">{icon}</div>
      <div>
        <div className="text-amber-500 font-medium mb-1">{platform}</div>
        <div className="text-white text-lg">{username}</div>
      </div>
      <div className="ml-auto text-white/50 group-hover:text-amber-400 transition-colors">→</div>
    </Link>
  )
}
