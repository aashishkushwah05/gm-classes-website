"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const slides = [
  {
    src: "/classroom.jpg",
    alt: "A GM Classes classroom with student benches and a blackboard",
    label: "Our Classroom",
  },
  {
    src: "/about-gallery/teaching-maths-board-1.png",
    alt: "GM Classes teacher explaining a mathematics question on the classroom whiteboard",
    label: "Concept-Based Learning",
  },
  {
    src: "/about-gallery/teaching-maths-board-2.png",
    alt: "GM Classes teacher teaching mathematics at the whiteboard",
    label: "Learning by Explanation",
  },
  {
    src: "/about-gallery/teaching-maths-board-3.png",
    alt: "Teacher explaining a Class 10 mathematics question on the whiteboard",
    label: "Classroom Teaching",
  },
  {
    src: "/about-gallery/classroom-test.png",
    alt: "GM Classes teacher conducting a classroom mathematics test",
    label: "Practice & Assessment",
  },
];

export function AboutGallery() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const show = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
  }, []);

  function onTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
  }

  function onTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    const dy = (event.changedTouches[0]?.clientY ?? touchStartY.current) - touchStartY.current;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      show(active + (dx < 0 ? 1 : -1));
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  return (
    <div
      className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_60px_-38px_rgba(20,24,35,.55)] [perspective:1000px]"
      aria-label="About GM Classes photo gallery"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-[opacity,transform,filter] duration-700 ease-out ${
            index === active
              ? "z-10 translate-x-0 rotate-y-0 scale-100 opacity-100"
              : "z-0 scale-[0.96] opacity-0"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(min-width:1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent px-5 pb-12 pt-16 sm:px-7">
            <p className="text-sm font-semibold tracking-wide text-white drop-shadow sm:text-base">{slide.label}</p>
          </div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2.5" aria-label="Choose About GM Classes photo">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show photo ${index + 1}: ${slide.label}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => show(index)}
            className={`h-2.5 rounded-full border border-white/90 shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 ${index === active ? "w-7 bg-white" : "w-2.5 bg-white/55 hover:bg-white/90"}`}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">{`Photo ${active + 1} of ${slides.length}: ${slides[active].label}`}</span>
    </div>
  );
}
