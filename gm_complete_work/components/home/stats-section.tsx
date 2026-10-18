import { Heart, Users } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";

const stats = [
  { Icon: Users, value: 1000, suffix: "+", label: "Students" },
  { Icon: Heart, value: 800, suffix: "+", label: "Families Trust Us" },
] as const;

export function StatsSection() {
  return (
    <section className="border-t border-border py-14 sm:py-16">
      <div className="container mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-10 sm:max-w-xl sm:mx-auto">
          {stats.map(({ Icon, value, suffix, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <span className="mb-3 grid size-11 place-items-center rounded-full border border-primary/25 bg-background text-primary">
                <Icon className="size-5" />
              </span>
              <CountUp
                value={value}
                suffix={suffix}
                className="font-serif text-4xl font-semibold tabular-nums tracking-tight text-foreground sm:text-5xl"
              />
              <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
