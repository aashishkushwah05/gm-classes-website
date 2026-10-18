"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { ResultRecord } from "@/lib/results";
import { ResultPhoto } from "./result-photo";

const PHOTO_SIZES = "(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw";

function context(r: ResultRecord) {
  return r.kind === "selection" ? r.exam : r.classLabel;
}

function Outcome({ r }: { r: ResultRecord }) {
  if (r.kind === "percentage") {
    return (
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Overall</p>
        <p className="mt-1 font-serif text-4xl font-semibold leading-none text-primary">{r.percentage}%</p>
      </div>
    );
  }
  if (r.kind === "marks") {
    return (
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Subject-wise marks</p>
        <dl className="mt-2 divide-y divide-border">
          {r.marks.map((m) => (
            <div key={m.subject} className="flex items-baseline justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
              <dt className="text-sm text-muted">{m.subject}</dt>
              <dd className="text-base font-semibold text-foreground">{m.score}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  return (
    <div>
      <p className="inline-flex items-center gap-1.5 text-base font-semibold text-foreground">
        <BadgeCheck className="size-[18px] text-primary" aria-hidden="true" />
        {r.achievement}
      </p>
      {r.batch && <p className="mt-1 text-sm text-muted">{r.batch}</p>}
    </div>
  );
}

export function ResultCard({ record, index = 0 }: { record: ResultRecord; index?: number }) {
  const reduce = useReducedMotion();
  const ctx = context(record);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.32, delay: reduce ? 0 : Math.min(index * 0.025, 0.075), ease: [0.22, 1, 0.36, 1] }}
      data-result-card="true"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_1px_0_rgba(34,27,17,.03)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_-24px_rgba(34,27,17,.28)] motion-reduce:transition-none"
    >
      <ResultPhoto
        src={record.image}
        alt={`${record.name}, ${ctx} — GM Classes`}
        sizes={PHOTO_SIZES}
        priority={index < 3}
      />
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/[0.07] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#7a5720]">
          {ctx}
        </span>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">{record.name}</h3>
        <div className="mt-auto border-t border-border pt-4">
          <Outcome r={record} />
        </div>
      </div>
    </motion.article>
  );
}
