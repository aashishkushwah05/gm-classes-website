"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { courses } from "@/lib/courses";
import { siteConfig as s } from "@/config/site";

type Errors = Partial<Record<"studentName" | "parentName" | "phone" | "classLabel" | "courseId" | "email", string>>;

const phoneRe = /^[0-9+\-\s]{7,15}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnquiryForm() {
  const formId = useId();
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [classLabel, setClassLabel] = useState("");
  const [courseId, setCourseId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Keep the enquiry form inclusive for every school class, even when a
  // specific course/medium is not currently listed in the course catalogue.
  // These options are derived synchronously from bundled local data; no request,
  // timer, or lazy-loading step is needed before the native select can display them.
  const classOptions = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  const coursesForClass = courses.filter((c) => !classLabel || c.classLabel === classLabel);

  function validate(): Errors {
    const next: Errors = {};
    if (!studentName.trim()) next.studentName = "Student name is required.";
    if (!parentName.trim()) next.parentName = "Parent/guardian name is required.";
    if (!phone.trim()) next.phone = "Phone number is required.";
    else if (!phoneRe.test(phone.trim())) next.phone = "Enter a valid phone number.";
    if (!classLabel) next.classLabel = "Please select a class.";
    if (!courseId) next.courseId = "Please select a course.";
    if (email.trim() && !emailRe.test(email.trim())) next.email = "Enter a valid email address.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      return;
    }

    const course = courses.find((c) => c.id === courseId);
    const lines = [
      "Hello GM Classes, I'd like to enquire about admission.",
      `Student: ${studentName.trim()}`,
      `Parent/Guardian: ${parentName.trim()}`,
      `Phone: ${phone.trim()}`,
      `Class: ${classLabel}`,
      `Course: ${course ? course.name : "General enquiry — course details to be confirmed"}`,
      "Mode: Offline (in-person at GM Classes)",
      email.trim() ? `Email: ${email.trim()}` : "",
      message.trim() ? `Message: ${message.trim()}` : "",
    ].filter(Boolean);

    setSubmitting(true);
    setSubmitMessage("");
    // Open a tab synchronously from the click so browsers do not block it after the async save.
    const whatsappWindow = window.open("about:blank", "_blank");
    const payload = {
      studentName: studentName.trim(),
      parentName: parentName.trim(),
      phone: phone.trim(),
      classLabel,
      course: course ? course.name : "General enquiry — course details to be confirmed",
      email: email.trim(),
      message: message.trim(),
      mode: "Offline (in-person at GM Classes)",
      submittedAt: new Date().toISOString(),
    };

    let savedToSheet = false;
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      savedToSheet = response.ok;
    } catch {
      savedToSheet = false;
    }

    const url = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    if (whatsappWindow) {
      whatsappWindow.opener = null;
      whatsappWindow.location.href = url;
    } else {
      setSubmitMessage("Your browser blocked the WhatsApp tab. Allow pop-ups and submit again.");
    }
    setSent(true);
    setSubmitMessage(savedToSheet
      ? "Enquiry saved successfully. WhatsApp is opening with the same details."
      : "WhatsApp is opening, but the enquiry could not be confirmed as saved to Google Sheets. Check the Google Sheets webhook configuration.");
    setSubmitting(false);
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
      hasError ? "border-error" : "border-border"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-student`} className="mb-1.5 block text-sm font-medium">
            Student Name <span className="text-error">*</span>
          </label>
          <input
            id={`${formId}-student`}
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            aria-invalid={!!errors.studentName}
            aria-describedby={errors.studentName ? `${formId}-student-err` : undefined}
            className={fieldClass(!!errors.studentName)}
            placeholder="Your name"
          />
          {errors.studentName && <p id={`${formId}-student-err`} className="mt-1.5 text-xs text-error">{errors.studentName}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-parent`} className="mb-1.5 block text-sm font-medium">
            Parent/Guardian Name <span className="text-error">*</span>
          </label>
          <input
            id={`${formId}-parent`}
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            aria-invalid={!!errors.parentName}
            aria-describedby={errors.parentName ? `${formId}-parent-err` : undefined}
            className={fieldClass(!!errors.parentName)}
            placeholder="Parent or guardian's name"
          />
          {errors.parentName && <p id={`${formId}-parent-err`} className="mt-1.5 text-xs text-error">{errors.parentName}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-medium">
            Phone Number <span className="text-error">*</span>
          </label>
          <input
            id={`${formId}-phone`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
            className={fieldClass(!!errors.phone)}
            placeholder="10-digit mobile number"
            inputMode="tel"
          />
          {errors.phone && <p id={`${formId}-phone-err`} className="mt-1.5 text-xs text-error">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium">Email (optional)</label>
          <input
            id={`${formId}-email`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
            className={fieldClass(!!errors.email)}
            placeholder="you@example.com"
            type="email"
          />
          {errors.email && <p id={`${formId}-email-err`} className="mt-1.5 text-xs text-error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-class`} className="mb-1.5 block text-sm font-medium">
            Class <span className="text-error">*</span>
          </label>
          <select
            id={`${formId}-class`}
            value={classLabel}
            onChange={(e) => { setClassLabel(e.target.value); setCourseId(""); }}
            aria-invalid={!!errors.classLabel}
            aria-describedby={errors.classLabel ? `${formId}-class-err` : undefined}
            className={fieldClass(!!errors.classLabel)}
          >
            <option value="">Select class</option>
            {classOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.classLabel && <p id={`${formId}-class-err`} className="mt-1.5 text-xs text-error">{errors.classLabel}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-course`} className="mb-1.5 block text-sm font-medium">
            Course / Subject <span className="text-error">*</span>
          </label>
          <select
            id={`${formId}-course`}
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            aria-invalid={!!errors.courseId}
            aria-describedby={errors.courseId ? `${formId}-course-err` : undefined}
            className={fieldClass(!!errors.courseId)}
          >
            <option value="">{classLabel ? "Select course" : "Select a class first"}</option>
            {coursesForClass.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            {classLabel && coursesForClass.length === 0 && (
              <option value="general-enquiry">General enquiry — course details to be confirmed</option>
            )}
          </select>
          {errors.courseId && <p id={`${formId}-course-err`} className="mt-1.5 text-xs text-error">{errors.courseId}</p>}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">
        Preferred mode: <span className="font-medium text-foreground">Offline (in-person at GM Classes)</span> — the only mode currently offered.
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-medium">Message (optional)</label>
        <textarea
          id={`${formId}-message`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={fieldClass(false)}
          placeholder="Anything else you'd like to tell us"
        />
      </div>

      <div>
        {submitMessage && <p role="status" className={`mb-3 rounded-xl border px-4 py-3 text-sm ${submitMessage.startsWith("Enquiry saved") ? "border-primary/30 bg-primary/5 text-foreground" : "border-amber-500/30 bg-amber-50 text-amber-900"}`}>{submitMessage}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(156,114,44,.9)] transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          <MessageCircle className="size-4" /> {submitting ? "Saving enquiry…" : "Send Enquiry via WhatsApp"} <ArrowRight className="size-4" />
        </button>
        <p className="mt-2.5 text-xs text-muted">
          After submission, WhatsApp opens with your details pre-filled. Google Sheets saving requires the webhook URL to be configured.
        </p>
        {sent && (
          <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-success">
            <CheckCircle2 className="size-4" /> WhatsApp opened with your enquiry — review it and hit send there.
          </p>
        )}
      </div>
    </form>
  );
}
