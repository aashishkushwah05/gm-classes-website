export type BlogCategory =
  | "Study Guides"
  | "Exam Preparation"
  | "Learning & Habits"
  | "GM Classes"
  | "Admissions";

type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  readTime: string;
  status: "published" | "planned";
  featured?: boolean;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "strong-concepts",
    title: "Why Strong Concepts Matter Before Advanced Topics",
    slug: "strong-concepts-before-advanced-topics",
    category: "Learning & Habits",
    excerpt: "Why understanding the basics first can make difficult topics easier to learn, revise and apply.",
    readTime: "4 min read",
    status: "published",
    featured: true,
    tags: ["concepts", "learning", "study habits"],
    author: "GM Classes Editorial",
    publishedAt: "2026-10-08",
    seoTitle: "Why Strong Concepts Matter Before Advanced Topics | GM Classes",
    seoDescription: "A practical guide to concept-first learning and building a stronger foundation before moving to advanced topics.",
    sections: [
      { heading: "Start with understanding, not memorisation", paragraphs: ["A difficult chapter often becomes easier when its basic ideas are clear. Before trying to remember formulas or advanced steps, spend time understanding what the topic is trying to explain and how its parts connect.", "Concept-first learning does not mean avoiding practice. It means using practice to confirm understanding rather than replacing it."] },
      { heading: "Build the foundation in small steps", paragraphs: ["Break a chapter into definitions, examples, rules and applications. Finish one small idea before moving to the next. When a later question depends on an earlier concept, the connection becomes easier to recognise."], bullets: ["Identify the prerequisite idea.", "Study one concept at a time.", "Solve a few basic questions first.", "Return to the explanation when a mistake reveals a gap."] },
      { heading: "Use mistakes as signals", paragraphs: ["An incorrect answer is useful when you can identify why it happened. Was the concept unclear? Was a step skipped? Was the question misunderstood? Recording that reason is often more useful than simply checking the correct answer."] },
      { heading: "Then move to advanced practice", paragraphs: ["Once the basics are stable, increase difficulty gradually. The goal is not to make every question difficult; it is to become comfortable applying the same concept in different situations."] },
    ],
  },
  {
    id: "class-10-preparation",
    title: "Building a Consistent Class 10 Preparation Routine",
    slug: "class-10-preparation-routine",
    category: "Exam Preparation",
    excerpt: "A practical framework for balancing learning, practice, revision and regular assessment during Class 10 preparation.",
    readTime: "5 min read",
    status: "published",
    tags: ["class 10", "routine", "exam preparation"],
    author: "GM Classes Editorial",
    publishedAt: "2026-10-08",
    seoTitle: "Building a Consistent Class 10 Preparation Routine | GM Classes",
    seoDescription: "A practical Class 10 study routine covering concepts, practice, revision and regular assessment.",
    sections: [
      { heading: "Consistency beats occasional long sessions", paragraphs: ["A study routine becomes useful when it can be repeated. Instead of depending on occasional long sessions, set a realistic daily structure that gives every major subject regular attention."] },
      { heading: "Divide your routine into four jobs", paragraphs: ["A balanced session can include learning a new concept, solving questions, revising older material and checking progress. The exact duration can vary; the important part is that all four activities have a place."], bullets: ["Concept learning", "Question practice", "Revision", "Assessment and error review"] },
      { heading: "Keep an error record", paragraphs: ["Maintain a short list of questions or concepts that caused difficulty. Revisit this list during revision rather than repeatedly starting from the beginning of a chapter."] },
      { heading: "Adjust the plan as exams approach", paragraphs: ["As the exam gets closer, shift more time toward revision, timed practice and mixed-question sets. Keep learning new material only where it is necessary and manageable."] },
    ],
  },
  {
    id: "regular-tests",
    title: "How Regular Tests Help You Find Learning Gaps",
    slug: "regular-tests-learning-gaps",
    category: "Exam Preparation",
    excerpt: "Why assessment is more useful when you analyse the mistakes behind a score instead of looking at the score alone.",
    readTime: "4 min read",
    status: "published",
    tags: ["tests", "assessment", "mistakes"],
    author: "GM Classes Editorial",
    publishedAt: "2026-10-08",
    seoTitle: "How Regular Tests Help You Find Learning Gaps | GM Classes",
    seoDescription: "Learn how regular tests can reveal concept gaps, careless mistakes and revision priorities.",
    sections: [
      { heading: "A test is a diagnostic tool", paragraphs: ["A score tells you what happened in one assessment. The analysis tells you what to do next. That is why a test becomes more valuable when you review every incorrect or uncertain response."] },
      { heading: "Classify the mistake", paragraphs: ["Not every wrong answer has the same cause. Separate conceptual mistakes from calculation errors, incomplete answers, misunderstood questions and time-management issues."], bullets: ["Concept gap", "Practice gap", "Careless error", "Question interpretation", "Time pressure"] },
      { heading: "Turn the review into a plan", paragraphs: ["After a test, choose a small number of priorities. Relearn the weakest concepts, practise similar questions and then test the same area again later."] },
      { heading: "Track patterns, not just marks", paragraphs: ["If the same type of mistake appears repeatedly, it deserves attention even when the overall score looks good. A simple error log can make those patterns visible."] },
    ],
  },
  {
    id: "doubt-solving",
    title: "A Better Way to Handle Doubts While Studying",
    slug: "better-doubt-solving",
    category: "Study Guides",
    excerpt: "A simple system for capturing, attempting and resolving doubts instead of carrying them into the next chapter.",
    readTime: "4 min read",
    status: "published",
    tags: ["doubts", "problem solving", "study"],
    author: "GM Classes Editorial",
    publishedAt: "2026-10-08",
    seoTitle: "A Better Way to Handle Doubts While Studying | GM Classes",
    seoDescription: "A practical system for recording and resolving study doubts before they become larger learning gaps.",
    sections: [
      { heading: "Do not let a doubt disappear", paragraphs: ["When a question feels unclear, write down exactly what you do not understand. A specific doubt is easier to solve than a general feeling that the chapter is difficult."] },
      { heading: "Try before asking", paragraphs: ["If appropriate, spend a few minutes identifying the known information, the required result and the step where your reasoning stops. This makes the eventual explanation more useful."] },
      { heading: "Keep a doubt list", paragraphs: ["A single notebook or digital list can hold unresolved questions. Mark each item when it is solved and revisit older items during revision."] },
      { heading: "Check the concept behind the question", paragraphs: ["Sometimes the immediate problem is only a symptom. If the same type of question remains difficult, go back to the underlying concept and practise it again."] },
    ],
  },
  {
    id: "revision",
    title: "Revision That Supports Long-Term Recall",
    slug: "revision-long-term-recall",
    category: "Learning & Habits",
    excerpt: "How to make revision an ongoing part of learning instead of something saved for the final days before an exam.",
    readTime: "4 min read",
    status: "published",
    tags: ["revision", "recall", "practice"],
    author: "GM Classes Editorial",
    publishedAt: "2026-10-08",
    seoTitle: "Revision That Supports Long-Term Recall | GM Classes",
    seoDescription: "Practical revision habits for students who want to remember concepts beyond the day they first study them.",
    sections: [
      { heading: "Revision should start early", paragraphs: ["Waiting until the end of a syllabus makes revision feel like relearning. Short, repeated reviews help keep older concepts active while new material is being added."] },
      { heading: "Recall before rereading", paragraphs: ["Close the book and try to explain the idea, write the key steps or solve a representative question. Then compare your recall with the material and correct the gaps."] },
      { heading: "Mix old and new material", paragraphs: ["A revision session can combine current topics with selected older topics. This makes it easier to notice what has been forgotten and keeps previous learning in use."], bullets: ["Review key concepts.", "Solve representative questions.", "Check your errors.", "Schedule the topic for another review."] },
      { heading: "Use assessment to choose what comes next", paragraphs: ["Revision is most efficient when it follows evidence. Use test mistakes, difficult questions and forgotten concepts to decide where the next review should focus."] },
    ],
  },
  {
    id: "course-selection",
    title: "Choosing the Right Course for Your Class and Board",
    slug: "choosing-the-right-course",
    category: "Admissions",
    excerpt: "A simple checklist for comparing a course by class, board, subjects, duration, mode and batch information.",
    readTime: "5 min read",
    status: "published",
    tags: ["courses", "admission", "selection"],
    author: "GM Classes Editorial",
    publishedAt: "2026-10-08",
    seoTitle: "Choosing the Right Course for Your Class and Board | GM Classes",
    seoDescription: "A practical checklist for comparing GM Classes courses by class, board, subjects, duration and batch information.",
    sections: [
      { heading: "Start with the student's current requirement", paragraphs: ["The right course depends first on the student's class and academic goal. Begin by identifying the class, board and subjects that need support."] },
      { heading: "Compare the course details", paragraphs: ["When comparing available options, look at the course description, subjects, duration, mode and any published batch information. These details provide a clearer picture than a course name alone."], bullets: ["Class and board", "Subjects covered", "Course duration", "Mode of learning", "Batch timing and status, when published"] },
      { heading: "Ask about anything that is unclear", paragraphs: ["If a current batch, fee, timing or other admission detail is not listed, contact GM Classes directly rather than relying on an old message or assumption."] },
      { heading: "Use the demo opportunity when appropriate", paragraphs: ["GM Classes currently offers a verified 7-day free demo. Students and parents can use the enquiry process to understand the current options before making a decision."] },
    ],
  },
  {
    id: "free-demo",
    title: "What to Expect From the 7-Day Free Demo",
    slug: "7-day-free-demo",
    category: "Admissions",
    excerpt: "A practical checklist for using the verified 7-day free demo to understand the learning experience before admission.",
    readTime: "3 min read",
    status: "published",
    tags: ["free demo", "admission", "students"],
    author: "GM Classes Editorial",
    publishedAt: "2026-10-08",
    seoTitle: "What to Expect From the 7-Day Free Demo | GM Classes",
    seoDescription: "A practical guide to using the verified 7-day free demo at GM Classes to understand course and learning fit.",
    sections: [
      { heading: "Use the demo to understand fit", paragraphs: ["A demo is an opportunity to understand whether the class structure, teaching approach and course choice match the student's needs. Use the time to observe and ask questions."] },
      { heading: "Prepare a few questions", paragraphs: ["Before starting, note the questions that matter to you: course coverage, subjects, batch timing, study support or anything else that is not already clear from the website."] },
      { heading: "Pay attention to learning, not just presentation", paragraphs: ["Focus on whether concepts are explained clearly, whether you can follow the pace and whether the environment helps you concentrate. These observations are more useful than a quick first impression."] },
      { heading: "Confirm current admission details directly", paragraphs: ["The 7-day free demo is verified, but specific batch availability and other admission details can change. Confirm the latest information with GM Classes before making a final decision."] },
    ],
  },
  {
    id: "learning-environment",
    title: "Why a Focused Learning Environment Can Matter",
    slug: "focused-learning-environment",
    category: "GM Classes",
    excerpt: "How the environment around a student can influence concentration, routine and the ability to stay engaged with study.",
    readTime: "4 min read",
    status: "published",
    tags: ["learning environment", "focus", "study"],
    author: "GM Classes Editorial",
    publishedAt: "2026-10-08",
    seoTitle: "Why a Focused Learning Environment Can Matter | GM Classes",
    seoDescription: "Explore how a focused study environment can support concentration, routine and consistent learning.",
    sections: [
      { heading: "Attention needs a supportive setting", paragraphs: ["Concentration is not only about motivation. Noise, interruptions and an inconsistent routine can make it harder to stay with a difficult topic. A focused environment can reduce some of those distractions."] },
      { heading: "Routine makes starting easier", paragraphs: ["A regular place and schedule can become a useful cue for study. Over time, the routine itself can make it easier to begin work without waiting for motivation."] },
      { heading: "Environment is not a substitute for effort", paragraphs: ["A calm space helps, but learning still depends on understanding, practice, revision and feedback. The environment should support these activities rather than replace them."] },
      { heading: "Choose what helps you concentrate", paragraphs: ["Students differ. What matters is finding a setting where you can listen, practise, ask questions and maintain a consistent academic routine."] },
    ],
  },
];

export const blogCategories: Array<"All" | BlogCategory> = [
  "All",
  "Study Guides",
  "Exam Preparation",
  "Learning & Habits",
  "GM Classes",
  "Admissions",
];

export const publishedBlogPosts = blogPosts
  .filter((post) => post.status === "published")
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getFeaturedBlogPost() {
  return publishedBlogPosts.find((post) => post.featured) ?? publishedBlogPosts[0];
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const post = getBlogPost(slug);
  if (!post) return [];

  const sameCategory = publishedBlogPosts.filter(
    (item) => item.slug !== slug && item.category === post.category,
  );
  const fallback = publishedBlogPosts.filter(
    (item) => item.slug !== slug && !sameCategory.some((related) => related.slug === item.slug),
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
