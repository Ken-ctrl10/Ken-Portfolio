/**
 * Certificate inventory, transcribed from the certificate images themselves.
 *
 * `issuer` keys into ISSUERS below and is what the filter UI groups by.
 * `hours` is in decimal hours (0.5 = 30 minutes); null where the certificate
 * does not state a duration.
 * `type` is "course" for completions and "award" for recognition.
 */

const ISSUERS = {
  cognizant: {
    id: "cognizant",
    label: "Cognizant",
    full: "Cognizant Learning & Development",
  },
  udemy: {
    id: "udemy",
    label: "Udemy",
    full: "Udemy",
  },
  dict: {
    id: "dict",
    label: "DICT",
    full: "Dept. of Information and Communications Technology (Philippines)",
  },
  cisco: {
    id: "cisco",
    label: "Cisco NetAcad",
    full: "Cisco Networking Academy",
  },
  ibm: {
    id: "ibm",
    label: "IBM SkillsBuild",
    full: "IBM SkillsBuild",
  },
  university: {
    id: "university",
    label: "University",
    full: "Laguna University",
  },
};

const certificates = [
  // --- DICT / ILCDB (Philippine government e-learning) ---
  { id: 1, issuer: "dict", type: "course", title: "Principles of Design", code: "DICT-GD001", date: "2024-02-23", hours: 8 },
  { id: 2, issuer: "dict", type: "course", title: "Introduction to Data Privacy", code: "DICT-ICT006", date: "2024-03-06", hours: 8 },
  { id: 3, issuer: "dict", type: "course", title: "Principles of Web Development and Introduction to HTML", code: "DICT-WD001", date: "2024-03-08", hours: 8 },
  { id: 4, issuer: "dict", type: "course", title: "Using HTML and CSS to Design a Website", code: "DICT-WD002", date: "2024-03-10", hours: 8 },
  { id: 5, issuer: "dict", type: "course", title: "Basic JavaScript for Web Development", code: "DICT-WD003", date: "2024-04-10", hours: 8 },
  { id: 6, issuer: "dict", type: "course", title: "Project 1: Developing a Static Website", code: "WD005", date: "2024-06-09", hours: 8 },
  { id: 7, issuer: "dict", type: "course", title: "Programming for Beginners Using Python", date: "2024-07-04", hours: 4 },

  // --- Cisco Networking Academy ---
  { id: 8, issuer: "cisco", type: "course", title: "Introduction to Cybersecurity", date: "2024-10-19", hours: null, via: "GMD Academy" },
  { id: 9, issuer: "cisco", type: "course", title: "Python Essentials 1", date: "2025-08-09", hours: null, via: "DICT-ITU DTC Initiative" },
  { id: 10, issuer: "cisco", type: "course", title: "Python Essentials 2", date: "2025-09-25", hours: null },

  // --- IBM SkillsBuild ---
  { id: 11, issuer: "ibm", type: "course", title: "Data Fundamentals", date: "2025-09-28", hours: null, verifiable: true },
  { id: 12, issuer: "ibm", type: "course", title: "Big Data 101", code: "BD0101EN", date: "2025-09-28", hours: null, verifiable: true },
  { id: 13, issuer: "ibm", type: "course", title: "Web Development Fundamentals", date: "2025-10-02", hours: null, verifiable: true },

  // --- Academic recognition ---
  {
    id: 14,
    issuer: "university",
    type: "award",
    title: "Best Student Research Paper — FILWA",
    detail:
      "2nd Regional Research Conference, Engineering / IT / Digital Solutions category",
    date: "2025-04-30",
    hours: null,
    featured: true,
  },

  // --- Cognizant Learning & Development ---
  { id: 22, issuer: "cognizant", type: "course", title: "GenAI Awareness [101 - Basics]", date: "2026-01-15", hours: null },
  { id: 15, issuer: "cognizant", type: "course", title: "Understanding Personality Types at Work", date: "2026-01-15", hours: null },
  { id: 16, issuer: "cognizant", type: "course", title: "How to Build your Professional Network", date: "2026-01-16", hours: null },
  { id: 17, issuer: "cognizant", type: "course", title: "HIV-AIDS Awareness Course [101 - Basics]", date: "2026-01-18", hours: null },
  { id: 20, issuer: "cognizant", type: "course", title: "Full Stack React & Backend with ExpressJS — Developer", detail: "PH DE Studio 2026", date: "2026-02-13", hours: null, featured: true },
  { id: 21, issuer: "cognizant", type: "course", title: "Fundamentals of Generative AI [101-Basics]", date: "2026-02-18", hours: null },
  { id: 24, issuer: "cognizant", type: "course", title: "Prompt Engineering Foundation [101-Basics]", date: "2026-03-31", hours: null },
  { id: 18, issuer: "cognizant", type: "course", title: "Claude Awareness Program", date: "2026-04-22", hours: null },
  { id: 23, issuer: "cognizant", type: "course", title: "GitHub Copilot — Code Strategist Developer", date: "2026-05-06", hours: null },
  { id: 19, issuer: "cognizant", type: "course", title: "Context Engineering Foundation", date: "2026-05-08", hours: null },
  { id: 25, issuer: "cognizant", type: "course", title: "Prompt Engineering — Java", date: "2026-05-19", hours: null },

  // --- Udemy ---
  { id: 30, issuer: "udemy", type: "course", title: "Executive Briefing: Artificial Intelligence (AI) + ChatGPT", instructor: "Kirill Eremenko", date: "2026-02-18", hours: 2 },
  { id: 26, issuer: "udemy", type: "course", title: "Azure DevOps Fundamentals for Beginners", instructor: "Brian Culp", date: "2026-02-23", hours: 3.5 },
  { id: 32, issuer: "udemy", type: "course", title: "GIT and Visual Studio with Azure DevOps Repos for Developers", instructor: "Patrick Videos", date: "2026-02-24", hours: 1.5 },
  { id: 27, issuer: "udemy", type: "course", title: "Azure DevOps and Continuous Delivery With Git", instructor: "Trevoir Williams", date: "2026-02-25", hours: 4.5 },
  { id: 34, issuer: "udemy", type: "course", title: "React 18 / 19 — Learn React JS the Fast Way", instructor: "Jannick Leismann, Denis Panjuta", date: "2026-03-10", hours: 13, featured: true },
  { id: 33, issuer: "udemy", type: "course", title: "Quick Start Guide: Node JS for Beginners", instructor: "Laurence Svekis", date: "2026-03-11", hours: 1.5 },
  { id: 31, issuer: "udemy", type: "course", title: "Generative AI for Beginners", instructor: "Aakriti E-Learning Academy", date: "2026-03-17", hours: 4.5 },
  { id: 29, issuer: "udemy", type: "course", title: "ChatGPT: Complete ChatGPT Course For Work (Ethically)", instructor: "Steve Ballinger", date: "2026-03-18", hours: 13.5 },
  { id: 28, issuer: "udemy", type: "course", title: "Basic Git and GitHub — Essentials", instructor: "Catalin Stefan", date: "2026-03-24", hours: 1 },
  { id: 35, issuer: "udemy", type: "course", title: "Node.js API Masterclass With Express & MongoDB", instructor: "Brad Traversy", date: "2026-03-26", hours: 12, featured: true },
  { id: 37, issuer: "udemy", type: "course", title: "Claude AI: The AI Assistant You'll Actually Use", instructor: "Anna Kolenkina", date: "2026-04-23", hours: 8 },
  { id: 39, issuer: "udemy", type: "course", title: "Claude, Claude Code, Claude Cowork, and Claude in MS Office", instructor: "Rapid Reskill", date: "2026-04-24", hours: 3 },
  { id: 40, issuer: "udemy", type: "course", title: "Intro to AI Agents: Build an Army of Digital Workers with AI", instructor: "Yash Thakker", date: "2026-04-28", hours: 7 },
  { id: 36, issuer: "udemy", type: "course", title: "GitHub Copilot Beginner to Pro — AI for Coding & Development", instructor: "Tom Phillips", date: "2026-05-04", hours: 7 },
  { id: 38, issuer: "udemy", type: "course", title: "Machine Learning for Absolute Beginners — Level 1", instructor: "Idan Gabrieli", date: "2026-05-18", hours: 4.5 },
  { id: 41, issuer: "udemy", type: "course", title: "Executive Briefing: Natural Language Processing (NLP)", instructor: "Kirill Eremenko", date: "2026-05-18", hours: 0.53 },
  { id: 42, issuer: "udemy", type: "course", title: "Executive Briefing: Deep Learning (DL)", instructor: "Kirill Eremenko", date: "2026-05-18", hours: 0.57 },
  { id: 43, issuer: "udemy", type: "course", title: "Understanding Agile | Scrum, Kanban & More for Beginners", instructor: "Masha Ostroumova", date: "2026-06-03", hours: 5 },
  { id: 44, issuer: "udemy", type: "course", title: "Quick Introduction to Postman and API Testing for Beginners", instructor: "Valentin Despa", date: "2026-06-05", hours: 3 },
  { id: 45, issuer: "udemy", type: "course", title: "The Complete Full-Stack Web Development Bootcamp", instructor: "Dr. Angela Yu", date: "2026-06-17", hours: 62, featured: true },
  { id: 46, issuer: "udemy", type: "course", title: "Getting Started with React Hooks", instructor: "Boris Paskhaver", date: "2026-06-19", hours: 3.5 },
];

// Image path is derived from the id so it can never drift out of sync with the
// files in public/certificates/.
const withImages = certificates.map((certificate) => ({
  ...certificate,
  image: `/certificates/cert-${certificate.id}.webp`,
}));

/** Issuers that actually have certificates, each with its count, newest first. */
const issuerFilters = Object.values(ISSUERS)
  .map((issuer) => ({
    ...issuer,
    count: withImages.filter((c) => c.issuer === issuer.id).length,
  }))
  .filter((issuer) => issuer.count > 0)
  .sort((a, b) => b.count - a.count);

const totalHours = withImages.reduce((sum, c) => sum + (c.hours ?? 0), 0);

export { withImages as certificates, ISSUERS, issuerFilters, totalHours };
