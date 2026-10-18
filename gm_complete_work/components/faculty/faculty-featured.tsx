"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import type { FacultyMember } from "@/lib/faculty";
import { FacultyPhoto } from "./faculty-photo";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-60px" } as const;

// Side-by-side from tablet width up. Server snapshot = false (stacked) so hydration always matches.
const SIDE_BY_SIDE = "(min-width: 768px)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(SIDE_BY_SIDE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const useSideBySide = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(SIDE_BY_SIDE).matches, () => false);

/**
 * Director profile: complete photo LEFT (~40%), introduction RIGHT (~60%) from 768px up; stacked on phones.
 * Entrance (plays once): card reveals → photo fades up → introduction slides in from the RIGHT → name follows.
 * On stacked (mobile) layout the introduction rises instead of sliding sideways. Reduced motion: no movement.
 */
export function FacultyFeatured({ member }: { member: FacultyMember }) {
  const reduce = useReducedMotion();
  const sideBySide = useSideBySide();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.38, ease: EASE }}
      className="gm-faculty-featured group grid overflow-hidden rounded-3xl border border-border bg-background shadow-[0_1px_0_rgba(34,27,17,.03)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_28px_60px_-34px_rgba(156,114,44,.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:grid-cols-[2fr_3fr]"
    >
      {/* LEFT — complete photograph, centred in its panel */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.42, delay: 0.04, ease: EASE }}
        className="flex items-center justify-center bg-surface p-5 sm:p-6 lg:p-8"
      >
        <div className="w-full max-w-[34rem] overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
          <FacultyPhoto
            src={member.image}
            alt={`${member.name}${member.subjects.length ? ` — ${member.subjects.join(", ")}, GM Classes` : ", GM Classes"}`}
            width={member.imageWidth}
            height={member.imageHeight}
            sizes="(min-width:768px) 40vw, 92vw"
          />
        </div>
      </motion.div>

      {/* RIGHT — introduction (slides in from the right when side by side) */}
      <motion.div
        key={sideBySide ? "side" : "stacked"}
        initial={reduce ? false : sideBySide ? { opacity: 0, x: 56 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.42, delay: 0.08, ease: EASE }}
        className="flex flex-col justify-center p-6 sm:p-8 lg:p-12"
      >
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.07] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#7a5720]">
          <GraduationCap className="size-3.5" aria-hidden="true" /> {member.isFounder ? "Founder" : "Director"}
        </span>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.35, delay: 0.12, ease: EASE }}
          className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
        >
          {member.displayName ?? member.name}
        </motion.h2>
        {member.designation && <p className="mt-1.5 text-base font-semibold text-primary">{member.designation}</p>}
        <div aria-hidden="true" className="mt-4 h-px w-14 bg-primary/60" />

        {member.subjects.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Subjects</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {member.subjects.map((subject) => (
                <li key={subject} className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium">
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(member.qualification || member.experience) && (
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {member.qualification && (
              <div className="rounded-xl border border-border bg-surface p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Qualification</dt>
                <dd className="mt-1 text-base font-semibold">{member.qualification}</dd>
              </div>
            )}
            {member.experience && (
              <div className="rounded-xl border border-border bg-surface p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Experience</dt>
                <dd className="mt-1 text-base font-semibold">{member.experience}</dd>
              </div>
            )}
          </dl>
        )}

        {member.quote && (
          <figure className="relative mt-6 rounded-xl border-l-2 border-primary/50 bg-primary/[0.04] py-3 pl-4 pr-4">
            <figcaption className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Teaching philosophy</figcaption>
            <blockquote className="mt-1 font-serif text-lg italic leading-snug text-foreground">
              &ldquo;{member.quote}&rdquo;
            </blockquote>
          </figure>
        )}
      </motion.div>
    </motion.article>
  );
}
