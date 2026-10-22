"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, Sparkles, X, MessageCircle, Languages, Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig as s } from "@/config/site";

const links = [
  ["Home", "/"],
  ["Courses", "/courses"],
  ["Study Material", "/study-material"],
  ["Results", "/results"],
  ["Faculty", "/faculty"],
  ["About", "/about"],
  ["Admissions", "/admissions"],
  ["Contact", "/contact"],
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [theme, setTheme] = useState<"system" | "light" | "dark">("light");

  useEffect(() => {
    // Match the current tab session; new sessions begin in English.
    const savedLanguage = window.sessionStorage.getItem("gm-classes-language-session");
    setLanguage(savedLanguage === "hi" ? "hi" : "en");
    const savedTheme = window.localStorage.getItem("gm-classes-theme");
    const nextTheme = savedTheme === "dark" || savedTheme === "light" || savedTheme === "system" ? savedTheme : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemTheme = () => {
      const selected = window.localStorage.getItem("gm-classes-theme") || "light";
      if (selected === "system") applyTheme("system");
    };
    media.addEventListener("change", onSystemTheme);
    return () => media.removeEventListener("change", onSystemTheme);
  }, []);

  const applyTheme = (value: "system" | "light" | "dark") => {
    const resolved = value === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : value;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.style.colorScheme = resolved;
  };

  const changeTheme = (value: "system" | "light" | "dark") => {
    setTheme(value);
    window.localStorage.setItem("gm-classes-theme", value);
    applyTheme(value);
  };

  const chooseLanguage = (next: "en" | "hi") => {
    setLanguage(next);
    setLanguageDialogOpen(false);
    window.localStorage.setItem("gm-classes-language", next);
    window.sessionStorage.setItem("gm-classes-language-session", next);
    if (next === "hi") {
      document.cookie = `googtrans=/en/hi; path=/; max-age=31536000`;
    } else {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    }
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = next === "hi" ? "hi" : "";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Slim utility strip — intentionally restrained so the header stays premium. */}
      <div className="hidden border-b border-[#2f2618] bg-[#0a0907] md:block">
        <div className="container mx-auto flex h-8 items-center justify-between px-5 text-[11px] font-medium tracking-wide text-[#b8aa8d] lg:px-8">
          <span>Admissions open · Limited seats available</span>
          <a href={`tel:${s.phones[0].replace(/\s/g, "")}`} className="hover:text-primary">{s.phones[0]}</a>
        </div>
      </div>

      {/* Header stays a fixed dark-charcoal brand bar regardless of the light page
          theme below it — explicit colors throughout, nothing here reads the
          light-mode --background/--foreground/--muted/--border tokens. */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-primary/25 bg-[#0a0907]/95 shadow-[0_18px_50px_-35px_rgba(156,114,44,.55)] backdrop-blur-2xl"
            : "border-[#2f2618]/80 bg-[#0a0907]/88 backdrop-blur-xl"
        }`}
      >
        <div className="container mx-auto flex h-[76px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="group flex items-center gap-3.5">
            <motion.div
              whileHover={{ rotate: -3, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src="/gm-logo.png"
                alt="GM Classes (Guru Mantra Classes) logo"
                width={54}
                height={54}
                className="relative size-11 rounded-full object-cover ring-1 ring-primary/40 sm:size-12"
                priority
              />
            </motion.div>
            <div className="block min-w-0">
              <p className="text-[12px] font-bold tracking-[0.16em] text-[#f5f1e8] sm:text-[13px] sm:tracking-[0.2em]">GM CLASSES</p>
              <p className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.18em] text-[#b8aa8d] sm:block sm:tracking-[0.22em]">{s.tagline}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="group relative rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-[#c7bda9] transition-colors hover:text-[#f5f1e8]"
              >
                <span className={isActive(href) ? "text-[#f5f1e8]" : ""}>{label}</span>
                {isActive(href) && (
                  <motion.span
                    layoutId="gm-nav-active"
                    className="absolute inset-x-3 bottom-1 h-px bg-primary shadow-[0_0_10px_rgba(156,114,44,.8)]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                {!isActive(href) && (
                  <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-primary/70 transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <button type="button" onClick={() => setLanguageDialogOpen(true)} title={language === "en" ? "हिंदी में देखें" : "View in English"} aria-label="Toggle Hindi and English" className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#2f2618] bg-white/5 px-3 text-xs font-semibold text-[#c7bda9] hover:border-primary/50 hover:text-primary"><Languages className="size-4" />{language === "en" ? "हिंदी" : "English"}</button>
            <label className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#2f2618] bg-white/5 px-2 text-[#c7bda9]" title="Color theme"><span className="sr-only">Color theme</span>{theme === "dark" ? <Moon className="size-4" /> : theme === "light" ? <Sun className="size-4" /> : <Monitor className="size-4" />}<select aria-label="Color theme" value={theme} onChange={(e) => changeTheme(e.target.value as "system" | "light" | "dark")} className="max-w-[86px] bg-transparent text-xs outline-none"><option value="system" className="text-black">System</option><option value="light" className="text-black">Light</option><option value="dark" className="text-black">Dark</option></select></label>
            <Link
              href="/contact"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-[#2f2618] bg-white/5 text-[#c7bda9] transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              aria-label="Call or contact"
              title="Contact"
            >
              <Phone className="size-4" />
            </Link>
            <Link
              href="/admissions"
              className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(156,114,44,.95)] transition-all hover:-translate-y-0.5"
            >
              <span className="relative z-10">Enquire Now</span>
              <Sparkles className="relative z-10 size-3.5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/admissions"
              className="hidden h-10 items-center rounded-xl bg-primary px-3.5 text-xs font-bold text-primary-foreground sm:inline-flex"
            >
              Enquire
            </Link>
            <button
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#2f2618] bg-white/5 px-3 text-xs font-semibold text-[#f5f1e8] transition-colors hover:border-primary/50 hover:text-primary ${open ? "" : "gm-menu-attention"}`}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
              <span>{open ? "Close" : "Main Menu"}</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="gm-mobile-nav-panel overflow-hidden border-t border-[#2f2618] bg-[#0a0907]/98 backdrop-blur-2xl xl:hidden"
            >
              <nav className="container mx-auto grid gap-1 px-5 py-4" aria-label="Mobile navigation">
                {links.map(([label, href], index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035, duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium ${
                        isActive(href)
                          ? "bg-primary/15 text-primary"
                          : "text-[#c7bda9] hover:bg-white/5 hover:text-[#f5f1e8]"
                      }`}
                    >
                      {label}
                      {isActive(href) && <span className="size-1.5 rounded-full bg-primary" />}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#2f2618] pt-4">
                  <button type="button" onClick={() => setLanguageDialogOpen(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#2f2618] text-sm font-medium text-[#c7bda9]"><Languages className="size-4" />{language === "en" ? "हिंदी" : "English"}</button>
                  <label className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#2f2618] text-sm font-medium text-[#c7bda9]"><span className="sr-only">Color theme</span>{theme === "dark" ? <Moon className="size-4" /> : theme === "light" ? <Sun className="size-4" /> : <Monitor className="size-4" />}<select aria-label="Color theme" value={theme} onChange={(e) => changeTheme(e.target.value as "system" | "light" | "dark")} className="max-w-[100px] bg-transparent text-sm outline-none"><option value="system" className="text-black">System</option><option value="light" className="text-black">Light</option><option value="dark" className="text-black">Dark</option></select></label>
                  <Link href="/contact" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#2f2618] text-sm font-medium text-[#c7bda9]">
                    <Phone className="size-4" /> Contact
                  </Link>
                  <Link href="/admissions" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                    <MessageCircle className="size-4" /> Enquire
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {languageDialogOpen && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/65 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setLanguageDialogOpen(false); }}
          >
            <motion.section
              role="dialog" aria-modal="true" aria-labelledby="gm-language-title"
              className="w-full max-w-sm rounded-2xl border border-[#8f6b2d]/60 bg-[#11100d] p-6 text-[#f5f1e8] shadow-2xl"
              initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }}
            >
              <div className="mb-4 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl border border-[#8f6b2d]/50 bg-[#d9ad52]/10 text-[#e0b75b]"><Languages className="size-5" /></span><div><h2 id="gm-language-title" className="text-lg font-semibold">Choose language</h2><p className="text-sm text-[#b8aa8d]">भाषा चुनें</p></div></div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => chooseLanguage("en")} className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${language === "en" ? "border-[#e0b75b] bg-[#e0b75b]/15 text-[#f3cf7a]" : "border-[#3a3326] hover:border-[#e0b75b]/60"}`}>English</button>
                <button type="button" onClick={() => chooseLanguage("hi")} className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${language === "hi" ? "border-[#e0b75b] bg-[#e0b75b]/15 text-[#f3cf7a]" : "border-[#3a3326] hover:border-[#e0b75b]/60"}`}>हिंदी</button>
              </div>
              <button type="button" onClick={() => setLanguageDialogOpen(false)} className="mt-4 w-full rounded-xl border border-[#3a3326] px-4 py-2.5 text-sm text-[#b8aa8d] hover:text-white">Cancel / रद्द करें</button>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
