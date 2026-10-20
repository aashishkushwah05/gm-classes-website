import type { MetadataRoute } from "next";
import { courses } from "@/lib/courses";
import { blogPosts } from "@/lib/blog";

// Only include lastModified when a reliable content date exists.
// Using new Date() here would claim every page changed on each deployment.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gm-classes-website.vercel.app";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/courses`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/study-material`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faculty`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/results`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/admissions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...blogPosts.filter((post) => post.status === "published").map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(post.updatedAt ?? post.publishedAt), changeFrequency: "monthly" as const, priority: 0.5 })),
    ...courses.map((c) => ({ url: `${base}/courses/${c.id}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
