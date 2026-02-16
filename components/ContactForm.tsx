"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  interested: z.string().min(1, "Please select an option"),
  project: z.string().min(10, "Project description must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Failed to send message.");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message."
      );
    }
  };

  const interestOptions = [
    "Web Design",
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Consulting",
    "Marketing",
    "SEO Optimization",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-sky-600 dark:text-gray-300 mb-1.5">
          My name is...
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-sky-600 dark:text-gray-300 mb-1.5">
          We work for...
        </label>
        <input
          {...register("company")}
          type="text"
          id="company"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
          placeholder="Company name"
        />
        {errors.company && (
          <p className="text-red-600 text-sm mt-1">{errors.company.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-sky-600 dark:text-gray-300 mb-1.5">
          You can reach me at...
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Interested In - Select */}
      <div>
        <label htmlFor="interested" className="block text-sm font-medium text-sky-600 dark:text-gray-300 mb-1.5">
          I am interested in...
        </label>
        <select
          {...register("interested")}
          id="interested"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
        >
          <option value="">Select an option</option>
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.interested && (
          <p className="text-red-600 text-sm mt-1">{errors.interested.message}</p>
        )}
      </div>

      {/* Project Description */}
      <div>
        <label htmlFor="project" className="block text-sm font-medium text-sky-600 dark:text-gray-300 mb-1.5">
          My project is...
        </label>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1.5">
          (Scope, budget, deadline)
        </p>
        <textarea
          {...register("project")}
          id="project"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none"
          placeholder="Tell us about your project"
        />
        {errors.project && (
          <p className="text-red-600 text-sm mt-1">{errors.project.message}</p>
        )}
      </div>

      {status === "success" && (
        <p className="text-sm text-green-600">Thanks! Your message has been sent.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
