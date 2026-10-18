// Single source of truth for course data, verified against the master
// spreadsheet (GM_Coaching_All_Details_Single_Sheet.ods). Course ID, Name,
// Duration and Course Type were left to our judgment in the sheet ("apne
// according kr krna") — everything else (fee, batch timing, highlights,
// admission info) is verbatim from the client.
//
// facultyId is left undefined everywhere: the sheet has no faculty-course
// mapping yet, and we don't invent one. When that mapping is supplied, add
// facultyId here and the course detail page will pick it up.

export type Course = {
  id: string;
  name: string;
  classLabel: string; // display grouping, e.g. "Class 10"
  classSort: number; // for ordering only
  classRange?: [number, number]; // shared offering covering a range of classes
  board: "MP Board" | "CBSE" | "—";
  medium: "Hindi" | "English" | "—";
  category: "Regular" | "Entrance Exam" | "Competitive" | "Foundation" | "Crash Course";
  subjects: string;
  fee: number;
  feeUnit?: "/ year"; // only PNST/ADDET/PVFT and JEE/NEET are annual fees
  batchTiming?: string;
  duration: string;
  thumbnail?: string; // path under /public/courses — omitted where none was supplied
  thumbnailFit?: "contain" | "cover"; // preserve full promotional banners when needed
  description: string;
};

export const sharedHighlights = [
  "Strong Concept Building from Basics",
  "Experienced Subject Faculty",
  "Individual Attention to Students",
  "Regular Tests & Performance Assessment",
  "Doubt-Solving Support",
  "Regular Practice & Revision",
  "Peaceful & Focused Learning Environment",
  "Board-Specific Preparation",
];

export const admissionNote = {
  registrationFee: 500,
  installmentsAvailable: true,
  discountNote: "Discounted fee available for early / starting seats",
  mode: "Offline" as const,
  admissionStatus: "Open" as const,
};

const sessionDuration = "Full academic session (April – March, till board exam)";

export const courses: Course[] = [
  // Foundational classes (shared promotional banner for Classes 1–4)
  {
    id: "classes-1-4-mp-board",
    name: "Classes 1–4 — English Medium (MP Board)",
    classLabel: "Classes 1–4",
    classSort: 1,
    classRange: [1, 4],
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "Mathematics, Science, English, Hindi, Social Science, Computer",
    fee: 5000,
    batchTiming: "Flexible Time Available",
    duration: "Flexible Time Available",
    thumbnail: "/courses/classes-1-4-english-medium.png",
    thumbnailFit: "contain",
    description: "English-medium coaching for Classes 1–4, MP Board, covering all six subjects.",
  },
  {
    id: "classes-1-4-cbse",
    name: "Classes 1–4 — English Medium (CBSE)",
    classLabel: "Classes 1–4",
    classSort: 1,
    classRange: [1, 4],
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "Mathematics, Science, English, Hindi, Social Science, Computer",
    fee: 6500,
    batchTiming: "Flexible Time Available",
    duration: "Flexible Time Available",
    thumbnail: "/courses/classes-1-4-english-medium.png",
    thumbnailFit: "contain",
    description: "English-medium coaching for Classes 1–4, CBSE, covering all six subjects.",
  },
  // Class 5
  {
    id: "class-5-mp-board",
    name: "Class 5 — English Medium (MP Board)",
    classLabel: "Class 5",
    classSort: 5,
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "Mathematics, Science, English, Hindi, Social Science, Computer",
    fee: 6500,
    batchTiming: "Flexible Time Available",
    duration: "Flexible Time Available",
    thumbnail: "/courses/class-5-mp-board.png",
    thumbnailFit: "contain",
    description: "English-medium coaching for Class 5, MP Board, covering all six subjects.",
  },
  {
    id: "class-5-cbse",
    name: "Class 5 — English Medium (CBSE)",
    classLabel: "Class 5",
    classSort: 5,
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "Mathematics, Science, English, Hindi, Social Science, Computer",
    fee: 7500,
    batchTiming: "Flexible Time Available",
    duration: "Flexible Time Available",
    thumbnail: "/courses/class-5-cbse.png",
    thumbnailFit: "contain",
    description: "English-medium coaching for Class 5, CBSE, covering all six subjects.",
  },
  // Class 6
  {
    id: "class-6-mp-board",
    name: "Class 6 — English Medium (MP Board)",
    classLabel: "Class 6",
    classSort: 6,
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "Mathematics, Science, English, Hindi, Social Science, Computer",
    fee: 6500,
    batchTiming: "Flexible Time Available",
    duration: "Flexible Time Available",
    thumbnail: "/courses/class-6-mp-board.png",
    thumbnailFit: "contain",
    description: "English-medium coaching for Class 6, MP Board, covering all six subjects.",
  },
  {
    id: "class-6-cbse",
    name: "Class 6 — English Medium (CBSE)",
    classLabel: "Class 6",
    classSort: 6,
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "Mathematics, Science, English, Hindi, Social Science, Computer",
    fee: 7500,
    batchTiming: "Flexible Time Available",
    duration: "Flexible Time Available",
    thumbnail: "/courses/class-6-cbse.png",
    thumbnailFit: "contain",
    description: "English-medium coaching for Class 6, CBSE, covering all six subjects.",
  },
  // Class 7
  {
    id: "class-7-mp-board",
    name: "Class 7 — English Medium (MP Board)",
    classLabel: "Class 7",
    classSort: 7,
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "Mathematics, Science, English, Hindi, Social Science, Computer",
    fee: 6500,
    batchTiming: "Flexible Time Available",
    duration: "Flexible Time Available",
    thumbnail: "/courses/class-7-mp-board.png",
    thumbnailFit: "contain",
    description: "English-medium coaching for Class 7, MP Board, covering all six subjects.",
  },
  {
    id: "class-7-cbse",
    name: "Class 7 — English Medium (CBSE)",
    classLabel: "Class 7",
    classSort: 7,
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "Mathematics, Science, English, Hindi, Social Science, Computer",
    fee: 7500,
    batchTiming: "Flexible Time Available",
    duration: "Flexible Time Available",
    thumbnail: "/courses/class-7-cbse.png",
    thumbnailFit: "contain",
    description: "English-medium coaching for Class 7, CBSE, covering all six subjects.",
  },
  // Class 8
  {
    id: "class-8-hindi",
    name: "Class 8 — Hindi Medium",
    classLabel: "Class 8",
    classSort: 8,
    board: "MP Board",
    medium: "Hindi",
    category: "Regular",
    subjects: "All Subjects",
    fee: 4000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-8-fee-table.jpg",
    description: "Foundational coaching for Class 8 covering all subjects in Hindi medium, with regular tests and doubt support.",
  },
  {
    id: "class-8-english",
    name: "Class 8 — English Medium (MP Board)",
    classLabel: "Class 8",
    classSort: 8,
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "All Subjects",
    fee: 8000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-8-english.jpg",
    description: "Foundational coaching for Class 8 covering all subjects in English medium, MP Board.",
  },
  {
    id: "class-8-cbse",
    name: "Class 8 — English Medium (CBSE)",
    classLabel: "Class 8",
    classSort: 8,
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "All Subjects",
    fee: 10000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-8-cbse.jpg",
    description: "Foundational coaching for Class 8 covering all subjects for CBSE students.",
  },

  // Class 9
  {
    id: "class-9-hindi",
    name: "Class 9 — Hindi Medium",
    classLabel: "Class 9",
    classSort: 9,
    board: "MP Board",
    medium: "Hindi",
    category: "Regular",
    subjects: "All Subjects",
    fee: 4000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-9-fee-table.jpg",
    description: "Class 9 coaching across all subjects in Hindi medium, building toward board-exam readiness.",
  },
  {
    id: "class-9-english",
    name: "Class 9 — English Medium (MP Board)",
    classLabel: "Class 9",
    classSort: 9,
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "All Subjects",
    fee: 8000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-9-english.jpg",
    description: "Class 9 coaching across all subjects in English medium, MP Board.",
  },
  {
    id: "class-9-cbse",
    name: "Class 9 — English Medium (CBSE)",
    classLabel: "Class 9",
    classSort: 9,
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "All Subjects",
    fee: 10000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-9-cbse.jpg",
    description: "Class 9 coaching across all subjects for CBSE students.",
  },

  // Class 10
  {
    id: "class-10-hindi",
    name: "Class 10 — Hindi Medium",
    classLabel: "Class 10",
    classSort: 10,
    board: "MP Board",
    medium: "Hindi",
    category: "Regular",
    subjects: "All Subjects",
    fee: 5000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-10-hindi.jpg",
    description: "Board-focused Class 10 coaching across all subjects in Hindi medium.",
  },
  {
    id: "class-10-english",
    name: "Class 10 — English Medium (MP Board)",
    classLabel: "Class 10",
    classSort: 10,
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "All Subjects",
    fee: 8000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-10-english.jpg",
    description: "Board-focused Class 10 coaching across all subjects in English medium, MP Board.",
  },
  {
    id: "class-10-cbse",
    name: "Class 10 — English Medium (CBSE)",
    classLabel: "Class 10",
    classSort: 10,
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "All Subjects",
    fee: 15000,
    batchTiming: "3:00 PM – 6:30 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-10-cbse.jpg",
    description: "Board-focused Class 10 coaching across all subjects for CBSE students.",
  },

  // Class 11 (PCMB)
  {
    id: "class-11-hindi",
    name: "Class 11 PCMB — Hindi Medium",
    classLabel: "Class 11",
    classSort: 11,
    board: "MP Board",
    medium: "Hindi",
    category: "Regular",
    subjects: "Physics, Chemistry, Maths, Biology",
    fee: 12000,
    batchTiming: "1:00 PM – 3:00 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-11-hindi.jpg",
    description: "Class 11 PCMB coaching in Hindi medium, taught by subject-wise faculty.",
  },
  {
    id: "class-11-english",
    name: "Class 11 PCMB — English Medium (MP Board)",
    classLabel: "Class 11",
    classSort: 11,
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "Physics, Chemistry, Maths, Biology",
    fee: 15000,
    batchTiming: "1:00 PM – 3:00 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-11-english.jpg",
    description: "Class 11 PCMB coaching in English medium, MP Board.",
  },
  {
    id: "class-11-cbse",
    name: "Class 11 PCMB — English Medium (CBSE)",
    classLabel: "Class 11",
    classSort: 11,
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "Physics, Chemistry, Maths, Biology",
    fee: 19000,
    batchTiming: "1:00 PM – 3:00 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-11-cbse.jpg",
    description: "Class 11 PCMB coaching for CBSE students.",
  },

  // Class 12 (PCMB)
  {
    id: "class-12-hindi",
    name: "Class 12 PCMB — Hindi Medium",
    classLabel: "Class 12",
    classSort: 12,
    board: "MP Board",
    medium: "Hindi",
    category: "Regular",
    subjects: "Physics, Chemistry, Maths, Biology",
    fee: 12000,
    batchTiming: "2:00 PM – 5:00 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-12-hindi.jpg",
    description: "Class 12 PCMB board-exam coaching in Hindi medium.",
  },
  {
    id: "class-12-english",
    name: "Class 12 PCMB — English Medium (MP Board)",
    classLabel: "Class 12",
    classSort: 12,
    board: "MP Board",
    medium: "English",
    category: "Regular",
    subjects: "Physics, Chemistry, Maths, Biology",
    fee: 16000,
    batchTiming: "2:00 PM – 5:00 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-12-english.jpg",
    description: "Class 12 PCMB board-exam coaching in English medium, MP Board.",
  },
  {
    id: "class-12-cbse",
    name: "Class 12 PCMB — English Medium (CBSE)",
    classLabel: "Class 12",
    classSort: 12,
    board: "CBSE",
    medium: "English",
    category: "Regular",
    subjects: "Physics, Chemistry, Maths, Biology",
    fee: 21000,
    batchTiming: "2:00 PM – 5:00 PM",
    duration: sessionDuration,
    thumbnail: "/courses/class-12-cbse.jpg",
    description: "Class 12 PCMB board-exam coaching for CBSE students.",
  },

  // Navodaya entrance
  {
    id: "navodaya-5",
    name: "Navodaya Entrance — Class 5",
    classLabel: "Class 5",
    classSort: 5,
    board: "—",
    medium: "—",
    category: "Entrance Exam",
    subjects: "Entrance exam preparation",
    fee: 10000,
    duration: "Till the Navodaya entrance exam",
    description: "Focused preparation for the Jawahar Navodaya Vidyalaya Class 5 entrance exam.",
    thumbnail: "/courses/navodaya-class-5.jpg",
  },
  {
    id: "navodaya-8",
    name: "Navodaya Entrance — Class 8",
    classLabel: "Class 8",
    classSort: 8,
    board: "—",
    medium: "—",
    category: "Entrance Exam",
    subjects: "Entrance exam preparation",
    fee: 12000,
    duration: "Till the Navodaya entrance exam",
    description: "Focused preparation for the Jawahar Navodaya Vidyalaya Class 8 entrance exam.",
    thumbnail: "/courses/navodaya-class-8.jpg",
  },

  // Competitive / foundation
  {
    id: "pnst-addet-pvft",
    name: "PNST / ADDET / PVFT Combined",
    classLabel: "Competitive",
    classSort: 90,
    board: "—",
    medium: "—",
    category: "Competitive",
    subjects: "PNST, ADDET, PVFT",
    fee: 16000,
    feeUnit: "/ year",
    duration: "Full academic year",
    description: "Combined coaching for PNST, ADDET and PVFT competitive entrance exams.",
    thumbnail: "/courses/pnst-addet-pvft.jpg",
  },
  {
    id: "jee-neet-foundation",
    name: "JEE / NEET Foundation",
    classLabel: "Foundation",
    classSort: 91,
    board: "—",
    medium: "—",
    category: "Foundation",
    subjects: "JEE & NEET foundation",
    fee: 50000,
    feeUnit: "/ year",
    duration: "Full academic year",
    description: "Early foundation coaching building toward JEE and NEET preparation.",
    thumbnail: "/courses/jee-neet-foundation.jpg",
  },

  // Crash courses
  {
    id: "crash-8",
    name: "Crash Course — Class 8",
    classLabel: "Class 8",
    classSort: 8,
    board: "—",
    medium: "—",
    category: "Crash Course",
    subjects: "All Subjects",
    fee: 5500,
    duration: "Short-term crash course",
    thumbnail: "/courses/class-8-crash.jpg",
    description: "A short, intensive revision course for Class 8 students.",
  },
  {
    id: "crash-10",
    name: "Crash Course — Class 10",
    classLabel: "Class 10",
    classSort: 10,
    board: "—",
    medium: "—",
    category: "Crash Course",
    subjects: "All Subjects",
    fee: 5500,
    duration: "Short-term crash course",
    thumbnail: "/courses/class-10-crash.jpg",
    description: "A short, intensive revision course for Class 10 board students.",
  },
  {
    id: "crash-11",
    name: "Crash Course — Class 11",
    classLabel: "Class 11",
    classSort: 11,
    board: "—",
    medium: "—",
    category: "Crash Course",
    subjects: "PCMB",
    fee: 10000,
    duration: "Short-term crash course",
    description: "A short, intensive revision course for Class 11 PCMB students.",
    thumbnail: "/courses/class-11-crash.jpg",
  },
  {
    id: "crash-12",
    name: "Crash Course — Class 12",
    classLabel: "Class 12",
    classSort: 12,
    board: "—",
    medium: "—",
    category: "Crash Course",
    subjects: "PCMB",
    fee: 10000,
    duration: "Short-term crash course",
    description: "A short, intensive revision course for Class 12 PCMB board students.",
    thumbnail: "/courses/class-12-crash.jpg",
  },
];

export function getCourse(id: string) {
  return courses.find((c) => c.id === id);
}

export function formatFee(course: Course) {
  return `₹${course.fee.toLocaleString("en-IN")}${course.feeUnit ?? ""}`;
}

// ---------------------------------------------------------------------------
// Class discovery helpers (derived from the catalogue above — no extra data).
// GM Classes coaches Class 1 to 12. Detailed course records exist only for
// some classes; the rest are shown with an enquiry path, never invented data.
// ---------------------------------------------------------------------------

export type ClassSelection = "all" | "competitive" | number;

export const classBands = [
  { id: "foundational", label: "Classes 1–5", stage: "Foundational", classes: [1, 2, 3, 4, 5] },
  { id: "middle", label: "Classes 6–8", stage: "Middle", classes: [6, 7, 8] },
  { id: "secondary", label: "Classes 9–10", stage: "Secondary", classes: [9, 10] },
  { id: "senior", label: "Classes 11–12", stage: "Senior Secondary", classes: [11, 12] },
] as const;

// Competitive / foundation courses (PNST, JEE/NEET…) are not tied to one class.
const NON_CLASS_SORT = 90;

export function courseMatchesClass(course: Course, selection: ClassSelection) {
  if (selection === "all") return true;
  if (selection === "competitive") return course.classSort >= NON_CLASS_SORT;
  return course.classRange ? selection >= course.classRange[0] && selection <= course.classRange[1] : course.classSort === selection;
}

export function countCoursesFor(selection: ClassSelection) {
  return courses.filter((c) => courseMatchesClass(c, selection)).length;
}

export function isClassCourse(course: Course) {
  return course.classSort < NON_CLASS_SORT;
}

export function classSelectionLabel(selection: ClassSelection) {
  if (selection === "all") return "All courses";
  if (selection === "competitive") return "Competitive & Foundation";
  return `Class ${selection}`;
}
