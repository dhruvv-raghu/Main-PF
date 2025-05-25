'use client';
import Navbar from "@/components/Navbar"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black font-main">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-7xl md:text-8xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200">
          About
        </h1>

        {/* About text */}
        <div className="mb-16">
          <p className="text-white/90 text-xl leading-relaxed">
            We are a collective of filmmakers and visual artists dedicated to pushing the boundaries of cinematic
            expression. Our work explores the intersection of narrative and visual poetry, creating immersive
            experiences that challenge conventional storytelling.
          </p>
        </div>

        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent z-10"></div>
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Behind the scenes"
              fill
              className="object-cover"
            />
          </div>
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent z-10"></div>
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Film production"
              fill
              className="object-cover"
            />
          </div>
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg md:col-span-2">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent z-10"></div>
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Film still"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="relative w-[21.1em] h-[12.8em]">
              <div className="card card--glass">
                <div className="card__content">
                  <h1 className="card__title">Transforming tech {idx + 1}</h1>
                  <div className="card__logo">XYZ</div>
                  <p className="card__url">someagency.xyz</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gold accent line */}
        <div className="w-24 h-1 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200"></div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .card {
          --blur: 12px;
          --width: 21.1em;
          --height: 12.8em;
          --move-by: 2em;
          background-image: linear-gradient(90deg, hsl(223, 90%, 60%), hsl(223, 90%, 50%));
          border-radius: 1em;
          box-shadow: 0 0.25em 0.375em hsla(0, 0%, 0%, 0.1);
          position: absolute;
          top: var(--move-by);
          left: calc(var(--move-by) * -1);
          width: var(--width);
          height: var(--height);
          transform: translate(-50%, -50%);
        }

        .card--glass {
          backdrop-filter: blur(var(--blur));
          -webkit-backdrop-filter: blur(var(--blur));
          background-image: linear-gradient(90deg, hsla(0, 0%, 100%, 0.2), hsla(0, 0%, 100%, 0.05));
          color: transparent;
          top: calc(var(--move-by) * -1);
          left: var(--move-by);
        }

        .card--glass::before,
        .card--glass::after {
          border-radius: inherit;
          content: "";
          display: block;
          position: absolute;
          inset: 0;
        }

        .card--glass::before {
          border: 1px solid hsl(0, 0%, 100%);
          mask-image: linear-gradient(135deg, hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0) 50%);
        }

        .card--glass::after {
          border: 1px solid hsl(223, 90%, 50%);
          mask-image: linear-gradient(135deg, hsla(0, 0%, 100%, 0) 50%, hsl(0, 0%, 100%));
        }

        .card__content {
          background: linear-gradient(hsla(0, 0%, 100%, 0) 3.125em, hsl(223, 90%, 70%) 3.375em, hsl(178, 90%, 80%) 4.5em)
              0 0 / calc(var(--width) - var(--move-by) * 2) 50%,
            linear-gradient(90deg, hsl(178, 90%, 80%) 13em, hsl(223, 90%, 70%) calc(var(--width) - var(--move-by) * 2), hsla(0, 0%, 100%, 0) 19.1em)
              0 100% / 100% 50%,
            linear-gradient(90deg, hsla(0, 0%, 100%, 0.5) 4em, hsla(0, 0%, 100%, 0.2)) 0 0 / 100% 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.25em 1.5em;
          position: relative;
          height: 100%;
          z-index: 1;
          background-clip: text;
          -webkit-background-clip: text;
          background-repeat: no-repeat;
        }

        .card__title,
        .card__logo {
          font-size: 1.5em;
          font-weight: 700;
          line-height: 1.17;
        }

        .card__title {
          font-family: Caladea, serif;
          width: 75%;
        }

        .card__logo {
          text-align: end;
          width: 25%;
        }

        .card__url {
          font-size: 0.75em;
          align-self: flex-end;
          margin-left: auto;
        }
      `}</style>
    </div>
  )
}

