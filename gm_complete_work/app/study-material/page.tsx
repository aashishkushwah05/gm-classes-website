import type { Metadata } from "next";
import { StudyMaterialExplorer } from "@/components/material/study-material-explorer";

export const metadata: Metadata = {
  title: "Study Material Hub — GM Classes",
  description:
    "Explore class-wise and entrance-exam study material at GM Classes: notes, MCQs, PYQs, booklets, important questions and test-series practice.",
  alternates: { canonical: "/study-material" },
};

export default function StudyMaterialPage() {
  return <StudyMaterialExplorer />;
}
