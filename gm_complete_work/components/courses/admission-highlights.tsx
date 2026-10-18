import { CalendarClock, IndianRupee, Tag } from "lucide-react";
import { admissionNote } from "@/lib/courses";

/** Three distinct admission facts. Wording comes from `admissionNote`; nothing is added or implied. */
export function AdmissionHighlights() {
  const items = [
    {
      key: "registration",
      icon: IndianRupee,
      label: "Registration Fee",
      value: `₹${admissionNote.registrationFee.toLocaleString("en-IN")}`,
      hint: "Separate from the course fee",
      tone: "border-primary/35 bg-primary/[0.06]",
      iconTone: "bg-primary/15 text-primary",
      valueTone: "text-primary",
    },
    {
      key: "installments",
      icon: CalendarClock,
      label: "Payment",
      value: admissionNote.installmentsAvailable ? "Installments Available" : "Ask about payment options",
      hint: "Enquire for installment details",
      tone: "border-emerald-700/20 bg-emerald-50/70",
      iconTone: "bg-emerald-600/10 text-emerald-800",
      valueTone: "text-foreground",
    },
    {
      key: "discount",
      icon: Tag,
      label: "Early / starting seats",
      value: admissionNote.discountNote,
      hint: "Enquire for applicable details",
      tone: "border-border bg-background",
      iconTone: "bg-foreground/5 text-foreground/70",
      valueTone: "text-foreground",
    },
  ];

  return (
    <ul className="grid gap-3 sm:grid-cols-3" aria-label="Admission details">
      {items.map(({ key, icon: Icon, label, value, hint, tone, iconTone, valueTone }) => (
        <li key={key} className={`flex items-start gap-3 rounded-2xl border p-4 ${tone}`}>
          <span className={`mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl ${iconTone}`}>
            <Icon className="size-[18px]" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
            <p className={`mt-1 text-base font-semibold leading-snug ${valueTone}`}>{value}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{hint}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
