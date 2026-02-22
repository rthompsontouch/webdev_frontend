import type { ProjectUpdate, ProjectUpdateFeedback } from "@/lib/types/dashboard";

export const mockUpdates: ProjectUpdate[] = [
  {
    id: "upd-1",
    projectId: "proj-1",
    title: "Homepage mockups v1",
    description:
      "Initial homepage design with hero, features section, and CTA. Let me know your thoughts on the color scheme and layout.",
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf0d?w=800",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800",
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "upd-2",
    projectId: "proj-1",
    title: "About page wireframe",
    description:
      "Wireframe for the about page. We can refine the team section layout based on your feedback.",
    images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "upd-3",
    projectId: "proj-3",
    title: "SEO audit results",
    description:
      "Initial SEO audit for Raleigh local search. We've identified key opportunities.",
    images: ["https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800"],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const mockFeedback: ProjectUpdateFeedback[] = [
  {
    id: "fb-1",
    updateId: "upd-1",
    customerId: "cust-1",
    liked: true,
    comment:
      "Love the hero section! Can we try a slightly darker blue for the CTA button?",
    reply: "Sure, I'll send over a few blue variations in the next update.",
    viewedAt: new Date(Date.now() - 43200000).toISOString(),
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "fb-2",
    updateId: "upd-2",
    customerId: "cust-1",
    liked: null,
    comment: "The team section feels a bit cramped. Can we add more spacing?",
    viewedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
