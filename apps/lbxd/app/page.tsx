"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Background from "@/components/VideoOverlay/Background"
import Navbar from "@/components/Navbar"

import type { VideoItem, VideoConfig } from "@/types/video"

const videos: VideoItem[] = [{ src: "/proj1.mp4" }, { src: "/proj2.mp4" }, { src: "/proj3.mp4" }]

const videoConfig: VideoConfig = {
  defaultBlur: 5,
  autoPlay: true,
  loop: false,
  muted: true,
  showControls: false,
  allowBlurAdjustment: false,
}

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"]

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

// Typing animation component with fixed height container
const TypedText = ({
  text,
  delay = 0,
  className = "",
  minHeight = "auto",
}: {
  text: string
  delay?: number
  className?: string
  minHeight?: string
}) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100) // typing speed

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={`inline-block ${className}`}
      style={{ minHeight }}
    >
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.7 }}
          className="inline-block ml-1 w-1 h-8 bg-[#FFC300]"
        />
      )}
    </motion.div>
  )
}

// Image carousel component for background
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // 5 seconds interval

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Background image ${currentIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-main">
      <Navbar />

      {/* Hero Section - Extremely spacious */}
      <Background videos={videos} Config={videoConfig} className="h-screen w-full">
        <div className="container mx-auto px-8 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="p-8 mx-2 text-white max-w-6xl ml-auto mr-0 pr-0" // Moved to the right
          >
            {/* Pre-allocate space for the heading to prevent layout shift */}
            <div className="h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[18rem] flex items-center justify-end"> {/* Justify to end */}
              <motion.h1
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-7xl flex items-left justify-end sm:text-8xl md:text-9xl lg:text-[12rem] font-bold drop-shadow-lg tracking-tight"
              >
                <TypedText text="Cinema" delay={0.5} />
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-light drop-shadow-md mt-16 text-right" // Aligned right
            >
              Through my Lens
            </motion.p>
          </motion.div>
        </div>
      </Background>

      {/* Thoughts & Insights Section - Full screen with image background */}
      <section className="h-screen w-full relative overflow-hidden">
        {/* Background carousel */}
        <ImageCarousel images={images} />
        
        {/* Content overlay */}
        <div className="relative z-20 h-full w-full flex items-center">
          <div className="container mx-auto px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl ml-12 md:ml-24"
            >
              <h2 className="text-6xl md:text-8xl font-light mb-16 leading-tight text-white tracking-tight">
                Thoughts &<br />
                Insights
              </h2>

              {/* Fixed height container for typed text to prevent layout shift */}
              <div className="text-2xl text-gray-200 mb-16 leading-relaxed font-light min-h-[200px]">
                <TypedText
                  text="Dive into a world where cinema meets personal perspective. Every frame tells a story; every scene evokes an emotion."
                  delay={0.5}
                  minHeight="200px"
                />
              </div>

              <motion.a
                href="/blog"
                whileHover={{ x: 10 }}
                className="inline-flex items-center text-2xl text-[#FFC300] hover:text-white transition-colors duration-300"
              >
                Explore Posts
                <svg
                  className="ml-4 w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section - Full screen with gradient */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom, #000000, #000814, #001433)",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-light text-white mb-8"
            >
              <TypedText text="Coming Soon" delay={0.2} />
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-[#FFC300] mb-8"
            >
              Storyboard
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl text-gray-300 max-w-3xl mx-auto mb-16"
            >
              Innovative software empowering writers with AI-driven insights and frameworks to craft compelling narratives
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="card w-full shadow-lg backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
            >
              <div className="card-body p-10">
                <h3 className="card-title text-4xl mb-8 font-light text-white">AI Assistance</h3>
                <div className="mb-12 text-xl leading-relaxed text-gray-200">
                  <TypedText
                    text="Language models trained specifically on storytelling samples to help craft compelling narratives and character arcs."
                    delay={0.2}
                    minHeight="150px"
                  />
                </div>
              </div>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="card w-full shadow-lg backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
            >
              <div className="card-body p-10">
                <h3 className="card-title text-4xl mb-8 font-light text-white">Story Structure</h3>
                <div className="mb-12 text-xl leading-relaxed text-gray-200">
                  <TypedText
                    text="Interactive templates and frameworks based on classic storytelling principles to guide your creative process."
                    delay={0.3}
                    minHeight="150px"
                  />
                </div>
              </div>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="card w-full shadow-lg backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
            >
              <div className="card-body p-10">
                <h3 className="card-title text-4xl mb-8 font-light text-white">Creativity Tools</h3>
                <div className="mb-12 text-xl leading-relaxed text-gray-200">
                  <TypedText
                    text="Generate ideas, overcome writer's block, and refine your prose with specialized tools developed for storytellers."
                    delay={0.4}
                    minHeight="150px"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-16">
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn glass text-white text-xl py-6 px-12 rounded-full border border-[#FFC300] bg-black/30"
            >
              Join the Waitlist
            </motion.button>
          </div>
        </div>
      </section>

      {/* Spacious Footer */}
      <footer className="py-24 bg-black">
        <div className="container mx-auto px-12">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-2xl text-gray-300 mb-8">
              &copy; {new Date().getFullYear()} Entertainment Through My Lens
            </p>
            <p className="text-xl text-gray-400">
              Storyboard — Empowering writers through AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
