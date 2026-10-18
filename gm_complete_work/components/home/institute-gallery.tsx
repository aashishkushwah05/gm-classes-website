"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/institute-gallery/exterior-wide.jpg", alt: "GM Classes institute exterior and signboard", label: "Our Institute" },
  { src: "/institute-gallery/entrance-closeup.jpg", alt: "Entrance and staircase of GM Classes", label: "Welcome to GM Classes" },
  { src: "/institute-gallery/student-banner.jpg", alt: "GM Classes student achievement and course display banner", label: "Learning & Achievements" },
  { src: "/institute-gallery/institute-entrance.jpg", alt: "Front entrance of GM Classes coaching institute", label: "Visit Our Centre" },
];

export function InstituteGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 2000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="gm-hero-image-frame relative aspect-[4/4.1] overflow-hidden rounded-[2rem] border border-white/80 bg-surface p-2.5 shadow-[0_35px_90px_-42px_rgba(57,42,17,.48)] sm:aspect-[5/4.2] lg:aspect-[4/4.3]"
      aria-label="GM Classes institute photo gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-2.5 overflow-hidden rounded-[1.55rem] transition-all duration-700 ease-in-out ${index === active ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.035] opacity-0"}`}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(min-width:1024px) 48vw, 100vw"
            className="gm-hero-image object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent px-5 pb-12 pt-16 sm:px-7">
            <p className="text-sm font-semibold tracking-wide text-white drop-shadow sm:text-base">{slide.label}</p>
          </div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2.5" aria-label="Choose institute photo">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show photo ${index + 1}: ${slide.label}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full border border-white/90 shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 ${index === active ? "w-7 bg-white" : "w-2.5 bg-white/55 hover:bg-white/90"}`}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">{`Photo ${active + 1} of ${slides.length}: ${slides[active].label}`}</span>
    </div>
  );
}
