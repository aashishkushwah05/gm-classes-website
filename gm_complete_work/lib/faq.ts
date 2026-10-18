// Centralized FAQ dataset — used by both /faq and the Contact page's Quick
// Questions block (via quickFaqIds), so there is exactly one place FAQ
// content is written.
//
// Every answer here is grounded in verified project data (config/site.ts,
// lib/courses.ts, lib/faculty.ts, lib/results.ts, and the facts recorded
// from the master spreadsheet). Where a question can't honestly be answered
// from that data, the answer says so and points to contacting GM Classes —
// it does not guess at fees, policies, or facilities that were never
// confirmed.

import { courses, formatFee, admissionNote, sharedHighlights } from "./courses";
import { siteConfig as s } from "@/config/site";

export const faqCategories = [
  "General",
  "Admission",
  "Courses",
  "Fees & Payment",
  "Classes & Timings",
  "Boards & Medium",
  "Tests & Exams",
  "Study Material",
  "Doubt Support",
  "Mentorship",
  "Revision",
  "Competitive Exams",
  "Results",
  "Contact & Location",
  "Demo Class",
] as const;

export type FaqCategory = (typeof faqCategories)[number];

export type FaqEntry = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

const contactUs = `Please contact GM Classes at ${s.phones[0]} for the latest details.`;

const staticFaqs: FaqEntry[] = [
  // General
  { id: "gen-what", category: "General", question: "What is GM Classes?", answer: `${s.fullName} (GM Classes) is a coaching institute in Jetapur, Khargone, teaching Class 1 to 12 along with entrance and foundation exam preparation. ${s.about}` },
  { id: "gen-where", category: "General", question: "Where is GM Classes located?", answer: `${s.address}.` },
  { id: "gen-since", category: "General", question: "Since when has GM Classes been running?", answer: `GM Classes has been operating since ${s.establishedYear}.` },
  { id: "gen-philosophy", category: "General", question: "What is GM Classes' teaching philosophy?", answer: s.philosophy },
  { id: "gen-usp", category: "General", question: "What makes GM Classes different?", answer: s.usp },
  { id: "gen-highlights", category: "General", question: "What does GM Classes offer students?", answer: `${sharedHighlights.join(", ")}.` },
  { id: "gen-locations", category: "General", question: "Does GM Classes have more than one branch?", answer: "GM Classes currently operates from one location, in Jetapur, Khargone." },

  // Admission
  { id: "adm-how", category: "Admission", question: "How do I take admission at GM Classes?", answer: "Visit the institute for counselling on the right class, board, medium and batch, then complete registration at the centre. It's a simple offline process." },
  { id: "adm-online", category: "Admission", question: "Can I complete admission online?", answer: contactUs },
  { id: "adm-docs", category: "Admission", question: "What documents are required for admission?", answer: contactUs },
  { id: "adm-test", category: "Admission", question: "Is there an entrance test to join GM Classes?", answer: "Admission is counselling-based — there's no mention of a separate entrance test to join a regular class. (Navodaya, PNST, ADDET and PVFT are themselves competitive exams GM Classes prepares students for — see the Competitive Exams section.)" },
  { id: "adm-registration-fee", category: "Admission", question: "Is there a registration fee?", answer: `Yes, a registration fee of ₹${admissionNote.registrationFee} applies.` },
  { id: "adm-installments", category: "Admission", question: "Can I pay course fees in installments?", answer: "Yes, installments are available." },
  { id: "adm-discount", category: "Admission", question: "Are there any discounts on fees?", answer: `${admissionNote.discountNote}.` },
  { id: "adm-status", category: "Admission", question: "Is admission currently open?", answer: "Yes, admission is currently open." },

  // Fees & Payment
  { id: "fee-vary", category: "Fees & Payment", question: "How much are the course fees?", answer: "Fees vary by class, board and medium. See the Courses page for the exact fee of each course." },
  { id: "fee-reg", category: "Fees & Payment", question: "What is the registration fee?", answer: `₹${admissionNote.registrationFee}, in addition to the course fee.` },
  { id: "fee-installments", category: "Fees & Payment", question: "Does GM Classes accept installment payments?", answer: "Yes, installments are available." },
  { id: "fee-online-payment", category: "Fees & Payment", question: "Can I pay fees online?", answer: contactUs },
  { id: "fee-refund", category: "Fees & Payment", question: "What is the refund policy?", answer: contactUs },
  { id: "fee-discount", category: "Fees & Payment", question: "Is there a discount for early admission?", answer: `${admissionNote.discountNote}.` },

  // Classes & Timings
  { id: "time-hours", category: "Classes & Timings", question: "What are GM Classes' working hours?", answer: s.hours },
  { id: "time-days", category: "Classes & Timings", question: "Which days are classes held?", answer: "Monday to Saturday." },
  { id: "time-8-10", category: "Classes & Timings", question: "What is the batch timing for Class 8, 9 and 10?", answer: "3:00 PM – 6:30 PM." },
  { id: "time-11", category: "Classes & Timings", question: "What is the batch timing for Class 11?", answer: "1:00 PM – 3:00 PM." },
  { id: "time-12", category: "Classes & Timings", question: "What is the batch timing for Class 12?", answer: "2:00 PM – 5:00 PM." },
  { id: "time-session", category: "Classes & Timings", question: "How long does a course run?", answer: "A full academic session, typically from April through to the board exam, alongside the school-year schedule." },

  // Boards & Medium
  { id: "board-which", category: "Boards & Medium", question: "Which boards does GM Classes teach?", answer: "MP Board and CBSE." },
  { id: "board-medium", category: "Boards & Medium", question: "Which mediums are offered?", answer: "Hindi and English medium." },
  { id: "board-both", category: "Boards & Medium", question: "Can I choose a different board and medium for different subjects?", answer: contactUs },
  { id: "board-switch", category: "Boards & Medium", question: "Can I switch medium after joining?", answer: contactUs },

  // Tests & Exams
  { id: "test-regular", category: "Tests & Exams", question: "Does GM Classes conduct regular tests?", answer: "Yes, regular tests and performance assessment are part of every course." },
  { id: "test-mock", category: "Tests & Exams", question: "Are mock tests available?", answer: "Yes, mock tests are available." },
  { id: "test-tracking", category: "Tests & Exams", question: "How is student performance tracked?", answer: "Through regular subject-wise tests and performance assessment." },
  { id: "test-board-prep", category: "Tests & Exams", question: "Does GM Classes prepare students specifically for board exams?", answer: "Yes, board-specific preparation is one of GM Classes' core highlights." },

  // Study Material
  { id: "material-provided", category: "Study Material", question: "Does GM Classes provide study material?", answer: "Yes — assignments, important questions and subject-wise notes are provided." },
  { id: "material-assignments", category: "Study Material", question: "Are assignments given regularly?", answer: "Yes, regular assignments are part of the course." },
  { id: "material-notes", category: "Study Material", question: "Are subject-wise notes provided?", answer: "Yes." },

  // Doubt Support
  { id: "doubt-support", category: "Doubt Support", question: "Can students get their doubts resolved?", answer: "Yes, doubt-solving support is available directly from the faculty." },
  { id: "doubt-individual", category: "Doubt Support", question: "Does GM Classes give individual attention to students?", answer: "Yes, individual attention is one of GM Classes' core highlights, supported by a peaceful, focused learning environment." },

  // Mentorship
  { id: "mentor-available", category: "Mentorship", question: "Does GM Classes offer mentorship?", answer: "Yes, mentorship support is available." },
  { id: "mentor-details", category: "Mentorship", question: "What does GM Classes' mentorship include?", answer: contactUs },

  // Revision
  { id: "revision-available", category: "Revision", question: "Does GM Classes conduct revision sessions?", answer: "Yes, regular practice and revision are part of every course." },
  { id: "revision-before-exam", category: "Revision", question: "Is there extra revision before board exams?", answer: contactUs },

  // Competitive Exams
  { id: "comp-navodaya", category: "Competitive Exams", question: "Does GM Classes prepare students for Navodaya entrance?", answer: "Yes, for Class 5 and Class 8 Navodaya entrance exams." },
  { id: "comp-pnst", category: "Competitive Exams", question: "Does GM Classes prepare for PNST, ADDET and PVFT?", answer: "Yes, combined coaching is available for PNST, ADDET and PVFT." },
  { id: "comp-jeeneet", category: "Competitive Exams", question: "Does GM Classes offer JEE/NEET foundation coaching?", answer: "Yes, a JEE & NEET foundation course is available, building an early base toward these exams." },
  { id: "comp-faculty", category: "Competitive Exams", question: "Is there separate faculty for competitive exams?", answer: "GM Classes' subject-wise faculty support competitive-exam preparation alongside regular classes." },
  { id: "comp-crash", category: "Competitive Exams", question: "What is a crash course?", answer: "A short, intensive revision course — GM Classes offers crash courses for Class 8, 10, 11 and 12." },

  // Results
  { id: "res-see", category: "Results", question: "Can I see GM Classes' student results?", answer: "Yes — verified student results and exam selections are listed on the Results page." },
  { id: "res-navodaya", category: "Results", question: "Has GM Classes had Navodaya selections?", answer: "Yes, see the Results page for verified Navodaya selections." },
  { id: "res-addet", category: "Results", question: "Has GM Classes had ADDET selections?", answer: "Yes, see the Results page for verified ADDET selections." },

  // Contact & Location
  { id: "contact-phone", category: "Contact & Location", question: "What is GM Classes' phone number?", answer: s.phones.join(" / ") },
  { id: "contact-whatsapp", category: "Contact & Location", question: "Can I contact GM Classes on WhatsApp?", answer: `Yes, WhatsApp ${s.phones[0]}.` },
  { id: "contact-email", category: "Contact & Location", question: "What is GM Classes' email address?", answer: s.email },
  { id: "contact-address", category: "Contact & Location", question: "What is GM Classes' full address?", answer: s.address },
  { id: "contact-directions", category: "Contact & Location", question: "How do I get directions to GM Classes?", answer: "See the map and \"Get Directions\" link on the Contact page." },

  // Demo Class
  { id: "demo-free", category: "Demo Class", question: "Does GM Classes offer a free demo class?", answer: "Yes, a 7-day free demo class is available before you commit to admission." },
  { id: "demo-how", category: "Demo Class", question: "How do I book a free demo?", answer: "Reach out through the enquiry form, phone or WhatsApp on the Contact page." },
  { id: "demo-cost", category: "Demo Class", question: "Is the demo class really free?", answer: "Yes, the 7-day demo is free." },
];

const courseFaqs: FaqEntry[] = courses.map((c) => ({
  id: `course-${c.id}`,
  category: "Courses" as const,
  question: `What is the fee and batch timing for ${c.name}?`,
  answer: `${c.name} costs ${formatFee(c)}${c.batchTiming ? `, with the batch running ${c.batchTiming}` : ""}. Duration: ${c.duration}.${c.subjects ? ` Subjects: ${c.subjects}.` : ""}`,
}));

const courseGeneralFaqs: FaqEntry[] = [
  { id: "course-classes", category: "Courses", question: "Which classes does GM Classes teach?", answer: "Class 1 to 12, with detailed course and fee information available from Class 8 onward on the Courses page." },
  { id: "course-full-list", category: "Courses", question: "Where can I see the full list of courses?", answer: "The Courses page lists every course with its board, medium, fee and batch timing, with filters to narrow it down." },
  { id: "course-navodaya", category: "Courses", question: "Does GM Classes offer a Navodaya entrance course?", answer: "Yes, for Class 5 and Class 8 — see the Courses page for fees." },
  { id: "course-crash", category: "Courses", question: "Are crash courses available?", answer: "Yes, for Class 8, 10, 11 and 12." },
  { id: "course-change", category: "Courses", question: "Can I change my course after admission?", answer: contactUs },
];

export const faqs: FaqEntry[] = [...staticFaqs, ...courseGeneralFaqs, ...courseFaqs];

// A small curated subset shown on the Contact page's Quick Questions block.
export const quickFaqIds = [
  "adm-how",
  "demo-free",
  "course-classes",
  "fee-vary",
  "time-hours",
  "contact-phone",
] as const;

export const quickFaqs = quickFaqIds.map((id) => faqs.find((f) => f.id === id)!).filter(Boolean);
