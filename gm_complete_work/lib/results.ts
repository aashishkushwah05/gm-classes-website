// Verified student result / achievement records for the Results page.
//
// SOURCE: GM_Classes_Top_10_Toppers_Ready_For_Photos.xlsx (+ the client's confirmations).
// RULES
// - Nothing here is inferred. A field that is not confirmed is simply left out.
// - Subject-wise marks stay subject-wise (`kind: "marks"`); they are never turned into a percentage.
// - Selection-based achievements have no class and no percentage.
// - No ranks are stored or shown: ranking criteria were not provided.
// - Each photo is mapped to its student by `id` (photo path = /results/photos/<id>.jpg), never by position.
//   `image: null` means no photo has been supplied yet — the UI shows the branded placeholder.
//
// TO ADD A STUDENT: add one object below (unique `id`), drop the photo at
// public/results/photos/<id>.jpg and set `image`. Groups on the page are built automatically.

export type ResultBase = {
  id: string;
  name: string;
  image: string | null;
};

export type AcademicResult = ResultBase & {
  classLabel: string; // "Class 9" | "Class 10" | "Class 12"
  classSort: number;
} & (
    | { kind: "percentage"; percentage: number }
    | { kind: "marks"; marks: { subject: string; score: string }[] }
  );

export type SelectionResult = ResultBase & {
  kind: "selection";
  exam: string; // e.g. "ADDET", "Navodaya Entrance"
  achievement: string; // e.g. "Selected"
  batch?: string; // only when verified, e.g. "2026 Batch"
};

export type ResultRecord = AcademicResult | SelectionResult;

export const academicResults: AcademicResult[] = [
  {
    id: "pratiya-kag",
    name: "Pratiya Kag",
    classLabel: "Class 9",
    classSort: 9,
    kind: "percentage",
    percentage: 93,
    image: "/results/photos/pratiya-kag.jpg",
  },
  {
    id: "atharv-gupta",
    name: "Atharv Gupta",
    classLabel: "Class 9",
    classSort: 9,
    kind: "percentage",
    percentage: 93,
    image: "/results/photos/atharv-gupta.jpg",
  },
  {
    id: "kanak-kumrawat",
    name: "Kanak Kumrawat",
    classLabel: "Class 8",
    classSort: 8,
    kind: "percentage",
    percentage: 91, // workbook stores this as 0.91 (formatted cell) = 91%
    image: "/results/photos/kanak-kumrawat.jpg",
  },
  {
    id: "radhika-sisodiya",
    name: "Radhika Sisodiya",
    classLabel: "Class 10",
    classSort: 10,
    kind: "percentage",
    percentage: 91,
    image: "/results/photos/radhika-sisodiya.jpg",
  },
  {
    id: "priya-kushwah",
    name: "Priya Kushwah",
    classLabel: "Class 10",
    classSort: 10,
    kind: "percentage",
    percentage: 87,
    image: "/results/photos/priya-kushwah.jpg",
  },
  {
    id: "vaishali-sagore",
    name: "Vaishali Sagore",
    classLabel: "Class 12",
    classSort: 12,
    kind: "marks",
    marks: [
      { subject: "Physics", score: "95/100" },
      { subject: "Biology", score: "94/100" },
      { subject: "Chemistry", score: "85/100" },
    ],
    image: "/results/photos/vaishali-sagore.jpg",
  },
  {
    id: "prince-chouhan",
    name: "Prince Chouhan",
    classLabel: "Class 12",
    classSort: 12,
    kind: "marks",
    marks: [
      { subject: "Physics", score: "95/100" },
      { subject: "Maths", score: "83/100" },
    ],
    image: "/results/photos/prince-chouhan.jpg",
  },
  {
    id: "namrata-sharma",
    name: "Namrata Sharma",
    classLabel: "Class 12",
    classSort: 12,
    kind: "marks",
    marks: [{ subject: "Physics", score: "94/100" }],
    image: "/results/photos/namrata-sharma.jpg",
  },
];

export const selectionResults: SelectionResult[] = [
  {
    id: "sakshi-solanki",
    name: "Sakshi Solanki",
    kind: "selection",
    exam: "ADDET",
    achievement: "Selected",
    image: "/results/photos/sakshi-solanki.jpg",
  },
  {
    id: "ritvi-mandloi",
    name: "Ritvi Mandloi",
    kind: "selection",
    exam: "Navodaya Entrance",
    achievement: "Selected",
    batch: "2026 Batch",
    image: "/results/photos/ritvi-mandloi.jpg",
  },
  {
    id: "ansh-yogi",
    name: "Ansh Yogi",
    kind: "selection",
    exam: "Navodaya Entrance",
    achievement: "Selected",
    batch: "2024 Batch",
    image: "/results/photos/ansh-yogi.jpg",
  },
];

// ---------------------------------------------------------------------------
// Grouping — built from the data above, nothing hardcoded per class.
// ---------------------------------------------------------------------------

export type ResultGroup = {
  id: string;
  title: string; // "Class 9 Toppers" | "Class 12 Achievements"
  items: AcademicResult[];
};

/** One group per class found in the data, lowest class first. */
export function getAcademicGroups(records: AcademicResult[] = academicResults): ResultGroup[] {
  const bySort = new Map<number, AcademicResult[]>();
  for (const r of records) bySort.set(r.classSort, [...(bySort.get(r.classSort) ?? []), r]);
  return [...bySort.entries()]
    .sort(([a], [b]) => a - b)
    .map(([sort, items]) => {
      const allPercentage = items.every((r) => r.kind === "percentage");
      const label = items[0].classLabel;
      return {
        id: `class-${sort}`,
        title: `${label} ${allPercentage ? "Toppers" : "Achievements"}`,
        items,
      };
    });
}
