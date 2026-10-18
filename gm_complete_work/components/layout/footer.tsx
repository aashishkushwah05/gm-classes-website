import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig as s } from "@/config/site";

// Footer styling is intentionally self-contained; only this component is changed.
export function Footer() {
  const social = [
    { href: s.instagram, label: "Instagram", src: "/social/instagram.jpg" },
    { href: s.youtube, label: "YouTube", src: "/social/youtube.jpg" },
    { href: `https://wa.me/${s.whatsapp}`, label: "WhatsApp", src: "/social/whatsapp.jpg" },
  ].filter((item) => item.href);

  return (
    <footer className="border-t border-[#3b2c12] bg-[#080d19] text-[#f8f5ed]">
      <div className="container mx-auto grid gap-8 px-5 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image src="/gm-logo.png" alt="GM Classes (Guru Mantra Classes) logo" width={72} height={72} className="size-16 rounded-full object-cover ring-1 ring-[#d8ad43]/60" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#d2c7ad]">{s.fullName} — {s.tagline}. MP Board &amp; CBSE, Hindi + English medium.</p>
          <div className="mt-5 grid gap-3">
            <div className="rounded-xl border-2 border-[#e7c76f]/75 bg-gradient-to-r from-[#26334d] via-[#17233b] to-[#101827] p-4 shadow-[0_6px_22px_rgba(216,173,67,0.20)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e7c76f]">Founder</p>
              <p className="mt-1 text-sm font-semibold text-white">Mr. Vinod Kumar Gupta</p>
              <a href={`tel:${s.phones[0]?.replace(/\s/g, "")}`} className="mt-1 inline-block text-xs text-[#e8d9b2] hover:text-[#ffd76a]">{s.phones[0]}</a>
            </div>
            <div className="rounded-xl border-2 border-[#e7c76f]/75 bg-gradient-to-r from-[#26334d] via-[#17233b] to-[#101827] p-4 shadow-[0_6px_22px_rgba(216,173,67,0.20)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e7c76f]">Director</p>
              <p className="mt-1 text-sm font-semibold text-white">Mrs. Apoorva Sen</p>
            </div>
          </div>
          {social.length > 0 && (
            <div className="mt-5 flex items-center gap-3">
              {social.map(({ href, label, src }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="grid size-11 place-items-center overflow-hidden rounded-xl border border-[#d8ad43]/45 bg-white p-1 transition duration-200 hover:-translate-y-1 hover:border-[#f5cc61] hover:shadow-[0_5px_16px_rgba(245,204,97,0.22)]">
                  <Image src={src} alt={`${label} logo`} width={36} height={36} className="size-8 object-contain" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-white">Explore</p>
          <div className="mt-4 grid gap-3 text-sm text-[#c8bea8]">
            <Link href="/courses" className="hover:text-[#f5cc61]">Courses</Link>
            <Link href="/results" className="hover:text-[#f5cc61]">Results</Link>
            <Link href="/faculty" className="hover:text-[#f5cc61]">Faculty</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Institute</p>
          <div className="mt-4 grid gap-3 text-sm text-[#c8bea8]">
            <Link href="/about" className="hover:text-[#f5cc61]">About</Link>
            <Link href="/admissions" className="hover:text-[#f5cc61]">Admissions</Link>
            <Link href="/contact" className="hover:text-[#f5cc61]">Contact</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-[#c8bea8]">
            {s.phones.map((p) => <p key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-[#f5cc61]">{p}</a></p>)}
            <p className="flex items-center gap-2"><Mail className="size-4 shrink-0" /><a href={`mailto:${s.email}`} className="break-all hover:text-[#f5cc61]">{s.email}</a></p>
            <p>{s.address}</p>
            <p>{s.hours}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#d8ad43]/30 bg-[#050811]">
        <div className="container mx-auto px-5 py-5 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-[#b7ac94]">© {new Date().getFullYear()} {s.name}. All rights reserved.</span>
            <div className="grid gap-2 sm:min-w-[330px] sm:grid-cols-2">
              <div className="rounded-xl border-2 border-[#f1c75b]/80 bg-gradient-to-br from-[#293752] to-[#0d1424] px-4 py-4 shadow-[0_6px_24px_rgba(241,199,91,0.22)]">
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#e7c76f]">Website crafted by</span>
                <span className="mt-1 block text-sm font-bold text-white">Developed by Aashish Kushwah</span>
              </div>
              <a href="https://zenext-ai-official.vercel.app/index.html" target="_blank" rel="noopener noreferrer" className="rounded-xl border-2 border-[#aaa5ff]/80 bg-gradient-to-br from-[#302b63] to-[#111329] px-4 py-4 shadow-[0_6px_24px_rgba(124,117,255,0.22)] transition hover:border-[#d0cdff] hover:shadow-[0_7px_25px_rgba(124,117,255,0.30)]">
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#b7b3ff]">Technology partner</span>
                <span className="mt-1 block text-sm font-bold text-white">Powered by Zenext.ai <span aria-hidden="true">↗</span></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
