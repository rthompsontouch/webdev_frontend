"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  interested: z.string().min(1, "Please select an option"),
  project: z.string().min(10, "Project description must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const inputStyles = {
  dark: "border border-black/50 bg-black/60 text-white placeholder:text-gray-400",
  light: "border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500",
};

const labelStyles = {
  dark: "text-white",
  light: "text-gray-700",
};

const helperStyles = {
  dark: "text-gray-300",
  light: "text-gray-500",
};

export default function ContactForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const inputCls = inputStyles[variant];
  const labelCls = labelStyles[variant];
  const helperCls = helperStyles[variant];
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
      {/* Name & Phone - same row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
            My name is...
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${inputCls}`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
            Phone
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="phone"
            className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${inputCls}`}
            placeholder="(919) 555-0123"
          />
        </div>
      </div>

      {/* Company & Email - same row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
            We work for...
          </label>
          <input
            {...register("company")}
            type="text"
            id="company"
            className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${inputCls}`}
            placeholder="Company name"
          />
          {errors.company && (
            <p className="text-red-600 text-sm mt-1">{errors.company.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
            You can reach me at...
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${inputCls}`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Interested In - Select */}
      <div>
        <label htmlFor="interested" className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
          I am interested in...
        </label>
        <select
          {...register("interested")}
          id="interested"
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition ${inputCls}`}
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
        <label htmlFor="project" className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
          My project is...
        </label>
        <p className={`text-xs mb-1.5 ${helperCls}`}>
          (Scope, budget, deadline)
        </p>
        <textarea
          {...register("project")}
          id="project"
          rows={4}
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none ${inputCls}`}
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
