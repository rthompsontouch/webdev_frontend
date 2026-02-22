/**
 * Seed the database with sample data.
 * Run: npm run db:seed
 */
import "./load-env";
import mongoose from "mongoose";
import { Lead, Customer, Project, ProjectUpdate, ProjectUpdateFeedback } from "../lib/db";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set");
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await Lead.deleteMany({});
  await Customer.deleteMany({});
  await Project.deleteMany({});
  await ProjectUpdate.deleteMany({});
  await ProjectUpdateFeedback.deleteMany({});

  const lead1 = await Lead.create({
    name: "Jane Smith",
    email: "jane@acme.com",
    phone: "(919) 555-0123",
    company: "Acme Corp",
    interested: "Web Design",
    project: "Looking for a full website redesign with modern UI.",
    status: "new",
  });
  const lead2 = await Lead.create({
    name: "Bob Wilson",
    email: "bob@startup.io",
    phone: "(919) 555-0456",
    company: "Startup.io",
    interested: "SEO Optimization",
    project: "Need help ranking for local search in Raleigh.",
    status: "contacted",
  });
  const lead3 = await Lead.create({
    name: "Sarah Chen",
    email: "sarah@techflow.co",
    phone: "(919) 555-0789",
    company: "TechFlow",
    interested: "New Website",
    project: "Startup needs a marketing site and landing pages for our SaaS product.",
    status: "new",
  });

  const cust1 = await Customer.create({
    name: "Jane Smith",
    email: "jane@acme.com",
    company: "Acme Corp",
    phone: "(919) 555-0123",
    notes: "Long-term client, prefers email.",
    inviteStatus: "invited",
  });
  const cust2 = await Customer.create({
    name: "Bob Wilson",
    email: "bob@startup.io",
    company: "Startup.io",
    phone: "(919) 555-0456",
    notes: "Interested in SEO for Raleigh market.",
    inviteStatus: "not_invited",
  });
  const cust3 = await Customer.create({
    name: "Sarah Chen",
    email: "sarah@techflow.co",
    company: "TechFlow",
    phone: "(919) 555-0789",
    notes: "SaaS marketing site.",
    inviteStatus: "signed_up",
  });

  const proj1 = await Project.create({
    customerId: cust1._id,
    type: "website_redesign",
    name: "Acme Website Redesign",
    status: "design",
  });
  await Project.create({
    customerId: cust1._id,
    type: "seo",
    name: "Acme SEO Touch-up",
    status: "complete",
  });
  const proj3 = await Project.create({
    customerId: cust2._id,
    type: "seo",
    name: "Raleigh Local SEO",
    status: "discovery",
  });

  const upd1 = await ProjectUpdate.create({
    projectId: proj1._id,
    title: "Homepage mockups v1",
    description: "Initial homepage design with hero, features section, and CTA. Let me know your thoughts on the color scheme and layout.",
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf0d?w=800",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800",
    ],
  });
  const upd2 = await ProjectUpdate.create({
    projectId: proj1._id,
    title: "About page wireframe",
    description: "Wireframe for the about page. We can refine the team section layout based on your feedback.",
    images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"],
  });
  await ProjectUpdate.create({
    projectId: proj3._id,
    title: "SEO audit results",
    description: "Initial SEO audit for Raleigh local search. We've identified key opportunities.",
    images: ["https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800"],
  });

  await ProjectUpdateFeedback.create({
    updateId: upd1._id,
    customerId: String(cust1._id),
    liked: true,
    comment: "Love the hero section! Can we try a slightly darker blue for the CTA button?",
    reply: "Sure, I'll send over a few blue variations in the next update.",
    viewedAt: new Date(),
  });
  await ProjectUpdateFeedback.create({
    updateId: upd2._id,
    customerId: String(cust1._id),
    liked: null,
    comment: "The team section feels a bit cramped. Can we add more spacing?",
    viewedAt: new Date(),
  });

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
