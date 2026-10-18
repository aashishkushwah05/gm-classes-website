import { CalendarCheck, GraduationCap, Languages, Sparkles, Target } from "lucide-react";
import { siteConfig as s } from "@/config/site";

// Verified facts only — no invented deadlines, seat counts, or offers.
const announcements = [
  { Icon: Sparkles, text: "Admissions Open — Class 1 to 12" },
  { Icon: GraduationCap, text: "MP Board & CBSE · Hindi + English Medium" },
  { Icon: Target, text: "7-Day Free Demo Available" },
  { Icon: Languages, text: "Navodaya · PNST · ADDET · PVFT · JEE/NEET Foundation" },
  { Icon: CalendarCheck, text: `Serving Khargone Since ${s.establishedYear}` },
] as const;

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className={`gm-ticker-row flex shrink-0 items-center ${ariaHidden ? "motion-reduce:hidden" : ""}`} aria-hidden={ariaHidden}>
      {announcements.map(({ Icon, text }, i) => (
        <span key={i} className="flex shrink-0 items-center gap-2.5 px-6 py-3 text-xs font-medium tracking-wide text-[#e9e2d2] sm:text-sm">
          <Icon className="size-3.5 shrink-0 text-primary" />
          {text}
          <span className="ml-6 h-1 w-1 shrink-0 rounded-full bg-primary/50" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export function AnnouncementTicker() {
  return (
    <div className="gm-ticker-viewport relative z-10 overflow-hidden border-b border-[#201c14] bg-[#0a0907]">
      <div className="gm-ticker-track flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:py-2">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
