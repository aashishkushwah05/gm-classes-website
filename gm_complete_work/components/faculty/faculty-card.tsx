"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FacultyMember } from "@/lib/faculty";
import { FacultyPhoto } from "./faculty-photo";

/** Grid card: complete photo on top (never cropped), details below, equal heights per row. */
export function FacultyCard({ member, index = 0 }: { member: FacultyMember; index?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.965 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.36, delay: reduce ? 0 : Math.min(index * 0.035, 0.12), ease: [0.22, 1, 0.36, 1] }}
      className="gm-faculty-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_1px_0_rgba(34,27,17,.03)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_26px_55px_-32px_rgba(156,114,44,.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <FacultyPhoto
        src={member.image}
        alt={`${member.name}${member.subjects.length ? ` — ${member.subjects.join(", ")}, GM Classes` : ", GM Classes"}`}
        sizes="(min-width:1280px) 22vw, (min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
        className="border-b border-border"
        width={member.id === "mithun-chouhan" ? 4 : member.imageWidth}
        height={member.id === "mithun-chouhan" ? 5 : member.imageHeight}
        fit={member.id === "mithun-chouhan" ? "cover" : "contain"}
        objectPosition={member.id === "mithun-chouhan" ? "76% center" : "center"}
      />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug tracking-tight">{member.displayName ?? member.name}</h3>
        {member.designation && <p className="mt-0.5 text-sm font-medium text-primary">{member.designation}</p>}

        {member.subjects.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {member.subjects.map((subject) => (
              <li key={subject} className="gm-faculty-subject rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium">
                {subject}
              </li>
            ))}
          </ul>
        )}

        {(member.qualification || member.experience) && (
          <dl className="mt-3 space-y-1 text-sm">
            {member.qualification && (
              <div className="flex gap-2"><dt className="text-muted">Qualification</dt><dd className="font-medium">{member.qualification}</dd></div>
            )}
            {member.experience && (
              <div className="flex gap-2"><dt className="text-muted">Experience</dt><dd className="font-medium">{member.experience}</dd></div>
            )}
          </dl>
        )}

        {member.quote && (
          <div className="mt-auto pt-4">
            <p className="border-l-2 border-primary/40 pl-3 text-sm italic leading-6 text-secondary">
              &ldquo;{member.quote}&rdquo;
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
}
