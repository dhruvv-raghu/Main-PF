"use client";

import React from "react";
import Navbar from "@/components/Other/Navbar";
import Hero from "@/components/Other/Hero";
import About from "@/components/Other/About";
import Technologies from "@/components/Other/Technologies";
import Projects from "@/components/Other/Projects";
import SpecialInterests from "@/components/Other/SpecialInterests";
import ScrollGallery from "@/components/Other/ScrollGallery";
import Contact from "@/components/Other/Contact";

export default function Home() {
  return (
    <main className="bg-[#2f3e46] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <SpecialInterests />

      {/* Scroll-pinned Image Galleries */}
      <ScrollGallery
        title="Mathematical Beauty"
        images={["/mainpf.jpg", "/mainpf2.jpg", "", ""]}
      />

      <ScrollGallery
        title="Data in Motion"
        images={[
          "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1600",
        ]}
      />

      <ScrollGallery
        title="Sports Analytics"
        images={[
          "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1600",
        ]}
      />

      <Contact />
    </main>
  );
}
