"use client";

import Image from "next/image";
import { Phone, ArrowUp, MessageCircle, X, Send, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { siteConfig as s } from "@/config/site";

const topics = [
  { q: "Which classes does GM Classes teach?", a: "GM Classes offers coaching from Class 1 to Class 12. Ask the institute to confirm the subjects and batch available for your class.", keys: ["class", "classes", "grade", "standard", "teach"] },
  { q: "Which education boards are supported?", a: "GM Classes lists both CBSE and MP Board. Please confirm availability for your specific class and subject.", keys: ["cbse", "mp board", "board"] },
  { q: "Are Hindi and English medium classes available?", a: "Both Hindi and English medium options are listed. Availability may vary by class and batch, so please confirm with the institute.", keys: ["hindi", "english", "medium", "language"] },
  { q: "Who is the director of GM Classes?", a: "The institute information lists Mr. Vinod Gupta as the owner/director.", keys: ["director", "owner", "vinod", "founder", "who runs"] },
  { q: "When was GM Classes established?", a: "The institute information says GM Classes has been operating since 2019.", keys: ["established", "started", "since", "year", "founded"] },
  { q: "What is the tagline of GM Classes?", a: "The tagline is “From Concepts to Confidence.”", keys: ["tagline", "slogan", "motto"] },
  { q: "What is the teaching philosophy?", a: "GM Classes focuses on building strong concepts from the basics so students can approach advanced topics with greater confidence.", keys: ["philosophy", "teaching style", "concept", "basics", "fundamentals"] },
  { q: "What makes GM Classes different?", a: "GM Classes highlights a calm learning environment near Jitapur Nahar in Khargone, strong concept-building, regular practice, and personalized academic guidance.", keys: ["different", "special", "usp", "why choose", "benefit"] },
  { q: "Where is GM Classes located?", a: "GM Classes is listed at Nahar Marg, Sanawad Road, Khargone, Madhya Pradesh 451001, near Jitapur Nahar.", keys: ["address", "location", "where", "map", "direction", "reach"] },
  { q: "What are the institute's working hours?", a: "The listed working hours are 8:00 AM–10:00 AM and 1:00 PM–8:00 PM. Please call to confirm availability before visiting.", keys: ["working hours", "opening hours", "open", "close", "office timing"] },
  { q: "How can I contact GM Classes?", a: "You can call 8889603862 or 8435588086. The listed WhatsApp number is 8889603862.", keys: ["contact", "phone", "call", "number", "whatsapp", "telephone"] },
  { q: "What is the institute email address?", a: "The provided email is Vinodguptaggw@gmail.com. Please verify the spelling when sending an email.", keys: ["email", "mail", "gmail", "email address"] },
  { q: "How does the admission process work?", a: "Admissions are handled offline. Visit the centre to discuss the suitable class, board, medium, course, fees, and batch, then complete the required formalities there.", keys: ["admission process", "how to join", "enrol", "enroll", "registration process"] },
  { q: "Are admissions open?", a: "The institute information describes admissions as open for the upcoming academic session. Contact GM Classes to confirm current seat availability.", keys: ["admission open", "admissions open", "seat available", "join now"] },
  { q: "Is a demo class available?", a: "The provided institute details list a 7-day free demo. Contact GM Classes to confirm how to access it for your class and subject.", keys: ["demo", "trial", "free class", "sample class"] },
  { q: "Is counselling available before admission?", a: "Yes, counselling is listed as available. The team can help discuss the appropriate class, board, medium, and batch.", keys: ["counselling", "counseling", "guidance", "advice"] },
  { q: "What is the registration fee?", a: "The supplied fee details list a registration fee of ₹500. Confirm the current amount with the institute before payment.", keys: ["registration fee", "registration charge", "admission fee"] },
  { q: "Can I pay fees in instalments?", a: "Instalment payment is marked as available in the supplied institute details. Ask the office about the current instalment schedule and terms.", keys: ["installment", "instalment", "monthly payment", "pay in parts", "payment plan"] },
  { q: "What are the exact course fees?", a: "Fees depend on class, medium, board, and course. The supplied fee sheet has some overlapping or unclear entries, so please call 8889603862 or 8435588086 for the confirmed current fee.", keys: ["fee", "fees", "price", "cost", "tuition", "how much"] },
  { q: "Are discounts available?", a: "The supplied details mention possible offers for starting seats, but no confirmed discount amount is specified. Contact the institute to ask about current offers.", keys: ["discount", "offer", "scholarship", "concession"] },
  { q: "When do regular batches start?", a: "The provided details say batches start in April, with the regular academic schedule continuing from June alongside the school session. Confirm the current session dates with the institute.", keys: ["batch start", "start date", "when start", "session start"] },
  { q: "What is the batch schedule?", a: "Timings vary by class and course. The supplied sheet includes some class-specific times but also has unclear entries, so please contact the institute for your exact timetable.", keys: ["batch timing", "schedule", "timetable", "class time", "timing"] },
  { q: "Are classes offline or online?", a: "The institute details list offline, online, and hybrid as possible modes. Please confirm which mode is currently available for your chosen course.", keys: ["offline", "online", "hybrid", "mode", "online classes"] },
  { q: "How long does the academic course run?", a: "The supplied details describe the academic cycle as April to March or until the main examination, depending on the course. Confirm the duration for your specific batch.", keys: ["duration", "how long", "course length", "academic year"] },
  { q: "How many seats are available?", a: "The supplied course details mention 50+ seats overall. Actual availability depends on the class and batch, so please confirm before visiting.", keys: ["seats", "vacancy", "available seats", "capacity"] },
  { q: "Do you provide regular tests?", a: "Yes. GM Classes lists regular subject-wise tests to help track student progress throughout the year.", keys: ["test", "tests", "assessment", "progress test"] },
  { q: "Are mock tests conducted?", a: "Mock tests are marked as available in the supplied institute details. Ask the faculty how they are scheduled for your course.", keys: ["mock test", "mock exam", "practice exam"] },
  { q: "Are revision sessions provided?", a: "Yes, revision sessions are marked as available. Ask your faculty about the revision plan for your class.", keys: ["revision", "revision class", "revision session"] },
  { q: "Is doubt-solving support available?", a: "Yes, doubt support is listed. Students can ask faculty to help clarify questions and concepts.", keys: ["doubt", "solve questions", "question help", "stuck", "problem"] },
  { q: "Do students receive study material?", a: "Study material is listed as available. The institute describes assignments, important questions, practice material, and subject-wise notes.", keys: ["study material", "notes", "assignment", "worksheet", "pdf", "material"] },
  { q: "Is mentorship provided?", a: "Mentorship is marked as available in the supplied details. Contact the institute to learn how mentoring works for your course.", keys: ["mentorship", "mentor", "personal guidance"] },
  { q: "Which subjects are taught in Classes 11 and 12?", a: "The supplied website details list Maths, Physics, Chemistry, and Biology for Classes 11–12. Confirm your exact subject combination and medium with the institute.", keys: ["class 11", "class 12", "physics", "chemistry", "biology", "maths", "pcmb"] },
  { q: "Do you teach all subjects for Classes 8, 9, and 10?", a: "The supplied details list all-subject coaching for Classes 8, 9, and 10. Please confirm the board and medium available for your batch.", keys: ["class 8", "class 9", "class 10", "all subjects"] },
  { q: "Do you prepare students for Navodaya entrance?", a: "Yes, Navodaya entrance preparation is listed for Class 5 and Class 8.", keys: ["navodaya", "jawahar navodaya", "entrance exam"] },
  { q: "Do you offer PNST preparation?", a: "PNST preparation is listed among the competitive-exam programs. Contact GM Classes to confirm the current batch, subjects, and fee.", keys: ["pnst"] },
  { q: "Do you offer AADET preparation?", a: "AADET preparation is listed among the competitive-exam programs. Contact GM Classes to confirm the current batch details.", keys: ["a adet", "aadet"] },
  { q: "Do you offer PVFT preparation?", a: "PVFT preparation is listed among the competitive-exam programs. Contact GM Classes to confirm the current batch details.", keys: ["pvft"] },
  { q: "Do you provide JEE and NEET foundation coaching?", a: "JEE/NEET foundation coaching is listed. Ask the institute about the available subjects, eligibility, schedule, and fee for the current session.", keys: ["jee", "neet", "foundation", "competitive exam"] },
  { q: "Are crash courses available?", a: "Crash courses are listed for Classes 8, 10, 11, and 12. Confirm the current schedule and fee with the institute.", keys: ["crash course", "short course", "exam revision"] },
  { q: "Can parents visit the institute?", a: "Yes. Parents and students can visit the centre to discuss course requirements, suitable batches, fees, and admission formalities.", keys: ["parent", "visit", "meet teacher", "visit institute"] },
  { q: "How can I check student results?", a: "Use the Results page on the website to view student achievements that GM Classes has published. If you need a specific result, contact the institute.", keys: ["result", "results", "topper", "marks", "percentage", "achievement"] },
  { q: "What should I bring for admission?", a: "The supplied details do not specify a document checklist. Please call the institute before visiting so the team can confirm which documents are required.", keys: ["documents", "document", "what to bring", "admission papers", "certificate"] },
  { q: "Can I change my batch after joining?", a: "Batch changes depend on availability and institute policy. Please discuss your situation directly with the GM Classes team.", keys: ["change batch", "switch batch", "transfer batch"] },
  { q: "How can I get directions to the institute?", a: "The listed address is Nahar Marg, Sanawad Road, Khargone, Madhya Pradesh 451001. Call 8889603862 if you need help finding the location.", keys: ["directions", "route", "navigate", "google maps"] },
  { q: "What is the WhatsApp number for enquiries?", a: "The WhatsApp number provided is 8889603862.", keys: ["whatsapp number", "message on whatsapp", "whatsapp contact"] },
  { q: "What is the fee for Navodaya preparation?", a: "The supplied sheet lists ₹10,000 for Class 5 and ₹12,000 for Class 8 Navodaya preparation. Please confirm the current fee with the institute before payment.", keys: ["navodaya fee", "navodaya fees", "class 5 fee", "class 5 navodaya", "class 8 navodaya"] },
  { q: "What are the listed crash-course fees?", a: "The supplied sheet lists crash-course amounts of ₹10,000 for Classes 11 and 12 and ₹5,500 for Classes 8 and 10. Confirm the current fee and what it includes with the institute.", keys: ["crash fee", "crash course fee", "class 11 crash", "class 12 crash"] },
  { q: "What is the fee for JEE or NEET coaching?", a: "The supplied sheet mentions ₹50,000 per year for JEE and NEET, but the current course scope and fee should be confirmed directly with GM Classes.", keys: ["jee fee", "neet fee", "jee coaching cost", "neet coaching cost"] },
  { q: "Do you offer personalized academic guidance?", a: "Yes. Personalized academic guidance is part of the institute's stated approach. Ask the team about support for your class and learning needs.", keys: ["personalized", "individual attention", "academic guidance", "personal guidance"] },
  { q: "How can I choose the right course?", a: "You can visit the institute for counselling and discuss your class, board, medium, subjects, goals, and available batches with the team.", keys: ["choose course", "which course", "which batch", "recommend course", "guidance"] },
];
const questionBank = Array.from(new Set([
  ...topics.map((topic) => topic.q),
  ...topics.flatMap((topic) => {
    const plain = topic.q.replace(/[?]$/, "").toLowerCase();
    return [
      `Please tell me about ${plain}.`,
      `I would like to know ${plain}.`,
      `Can you explain ${plain}?`,
      `Could you help me with ${plain}?`,
    ];
  }),
]));

function getReply(input: string) {
  const value = input.toLowerCase();
  const ranked = topics.map((topic) => ({ topic, score: topic.keys.reduce((sum, key) => sum + (value.includes(key) ? 1 : 0), 0) })).sort((a, b) => b.score - a.score);
  if (ranked[0]?.score) return ranked[0].topic.a;
  if (/hello|hi\b|hey|good morning|good evening/.test(value)) return "Hello! Welcome to GM Classes. I can help with classes, courses, fees, timings, admissions, study material, and contact details. What would you like to know?";
  return "I don't have a confirmed answer for that yet. Please contact GM Classes by phone or WhatsApp so the team can give you accurate, up-to-date information.";
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([{ from: "bot", text: "Hello! I'm the GM Classes assistant. Ask me about classes, courses, admissions, fees, or timings." }]);
  const suggestions = useMemo(() => questionBank.filter((q) => q.toLowerCase().includes(search.toLowerCase())).slice(0, 3), [search]);
  useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 500); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  function send(text = input) {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((old) => [...old, { from: "user", text: clean }]);
    setInput("");
    setSearch("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((old) => [...old, { from: "bot", text: getReply(clean) }]);
      setTyping(false);
    }, 900);
  }
  return <>
    {open && <section role="dialog" aria-label="GM Classes chatbot" className="gm-chat-panel fixed bottom-24 right-3 z-[70] flex max-h-[min(72vh,620px)] w-[min(92vw,390px)] flex-col overflow-hidden rounded-3xl border border-amber-300/40 bg-white shadow-2xl sm:bottom-28 sm:right-6">
      <header className="flex items-center justify-between bg-[#101114] px-4 py-3 text-white"><div className="flex items-center gap-3"><Image src="/social/gm-chatbot.png" alt="" width={42} height={42} className="rounded-full object-cover"/><div><strong className="block text-sm">GM Classes Assistant</strong><span className="text-xs text-emerald-300">English · Instant answers</span></div></div><button onClick={() => setOpen(false)} aria-label="Close chatbot" className="rounded-full p-2 hover:bg-white/10"><X size={19}/></button></header>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-stone-50 p-3">{messages.map((m, i) => <div key={i} className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-5 ${m.from === "user" ? "ml-auto bg-emerald-600 text-white" : "mr-auto border border-amber-100 bg-white text-stone-800 shadow-sm"}`}>{m.text}</div>)}{typing && <div role="status" aria-label="GM Classes assistant is typing" className="gm-chat-typing mr-auto flex items-center gap-1 rounded-2xl border border-amber-100 bg-white px-4 py-3 shadow-sm"><span></span><span></span><span></span><span className="sr-only">Typing…</span></div>}{messages.length === 1 && <div className="pt-1"><label className="mb-2 flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3"><Search size={16} className="text-stone-400"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a question…" className="min-w-0 flex-1 py-2 text-xs outline-none"/></label><div className="flex flex-wrap gap-1.5">{suggestions.map((q) => <button key={q} onClick={() => send(q)} className="rounded-full border border-amber-200 bg-white px-2.5 py-1.5 text-left text-[11px] text-stone-700 hover:bg-amber-50">{q}</button>)}</div><p className="mt-2 text-[10px] text-stone-400">Ask a question · Replies in English</p></div>}</div>
      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 border-t border-stone-200 bg-white p-3"><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…" className="min-w-0 flex-1 rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-500"/><button aria-label="Send message" disabled={typing} className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-500 text-stone-950 hover:bg-amber-400 disabled:cursor-wait disabled:opacity-60"><Send size={17}/></button></form>
    </section>}
    <div className="gm-floating-actions fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <a href={`https://wa.me/${s.whatsapp}`} aria-label="Chat on WhatsApp" className="gm-floating-whatsapp grid size-14 place-items-center rounded-full bg-transparent sm:size-15"><Image src="/social/whatsapp-transparent.png" alt="WhatsApp" width={88} height={88} className="size-full rounded-full object-contain"/></a>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Open GM Classes chatbot" aria-expanded={open} className="gm-floating-chatbot grid size-[68px] place-items-center rounded-full sm:size-[76px]"><Image src="/social/gm-chatbot.png" alt="GM Classes chatbot" width={100} height={100} className="size-full object-contain"/></button>
      <a href={`tel:${s.phones[0].replace(/\s/g, "")}`} aria-label="Call GM Classes" className="gm-floating-call grid size-12 place-items-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-105"><Phone className="size-5"/></a>
      {showTop && <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="gm-floating-top grid size-12 place-items-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-transform hover:scale-105"><ArrowUp className="size-5"/></button>}
    </div>
  </>;
}
