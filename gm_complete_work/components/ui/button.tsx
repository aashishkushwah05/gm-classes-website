import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" && "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-lg",
    variant === "secondary" && "bg-secondary text-secondary-foreground hover:-translate-y-0.5",
    variant === "outline" && "border border-border bg-surface text-foreground hover:bg-white/5",
    variant === "ghost" && "text-foreground hover:bg-white/5",
    size === "sm" && "min-h-9 px-3 text-sm",
    size === "md" && "min-h-10 px-4 text-sm",
    size === "lg" && "min-h-12 px-5 text-base",
    className,
  );

  if (href) return <Link className={classes} href={href}>{children}</Link>;

  return <button className={classes} {...props}>{children}</button>;
}
