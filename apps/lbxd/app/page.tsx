'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg'];

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

// Image carousel component for background
const ImageCarousel = ({ images, offset = 0 }: { images: string[]; offset?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(offset);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [images.length]);

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
  );
};

// Static image component for the three divisions
const StaticImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="h-full w-full overflow-hidden relative">
      <img src={src || '/placeholder.svg'} alt={alt} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="h-screen w-full relative overflow-hidden">
        <ImageCarousel images={images} />
        <div className="relative z-20 h-full flex items-center justify-end pr-16">
          <div className="font-main text-right text-white max-w-6xl">
            <motion.div initial="hidden" animate="visible" variants={titleVariants} className="p-8">
              <motion.h1
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold drop-shadow-lg tracking-tight"
              >
                Cinema
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={titleVariants}
                transition={{ delay: 2.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-light drop-shadow-md mt-16"
              >
                Through my Lens
              </motion.p>

              <motion.p
                initial="hidden"
                animate="visible"
                variants={titleVariants}
                transition={{ delay: 3.5 }}
                className="text-lg text-gray-300 mt-8"
              >
                Scroll to see what this site has in store.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Thoughts & Insights Section */}
      <section className="h-screen w-full relative overflow-hidden">
        {/* Background carousel (same array, offset to alternate) */}
        <ImageCarousel images={images} offset={2} />
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
              <motion.h2
                initial="hidden"
                animate="visible"
                variants={titleVariants}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-light mb-16 leading-tight text-white tracking-tight"
              >
                Thoughts &<br />
                Insights
              </motion.h2>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={titleVariants}
                transition={{ delay: 0.8 }}
                className="text-2xl text-gray-200 mb-16 leading-relaxed font-light"
              >
                Dive into a world where cinema meets personal perspective. Every frame tells a
                story; every scene evokes an emotion.
              </motion.p>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Movie Reviews Section */}
      <section className="h-screen w-full relative overflow-hidden">
        {/* Background carousel (same array, offset to alternate) */}
        <ImageCarousel images={images} offset={3} />
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
              <motion.h2
                initial="hidden"
                animate="visible"
                variants={titleVariants}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-light mb-16 leading-tight text-white tracking-tight"
              >
                Movie
                <br />
                Reviews
              </motion.h2>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={titleVariants}
                transition={{ delay: 0.8 }}
                className="text-2xl text-gray-200 mb-16 leading-relaxed font-light"
              >
                Expressing my honest views on recently released movies. Raw thoughts and unfiltered
                opinions on the latest cinema.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All This and More Section */}
      <section className="h-screen w-full relative overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Three vertical divisions */}
          <div className="flex-1">
            <StaticImage src={images[0]!} alt="Cinema experience 1" />
          </div>
          <div className="flex-1">
            <StaticImage src={images[1]!} alt="Cinema experience 2" />
          </div>
          <div className="flex-1">
            <StaticImage src={images[2]!} alt="Cinema experience 3" />
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-20 h-full w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight drop-shadow-lg"
            >
              All This
              <br />
              and More
            </motion.h2>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
