export interface Project {
  slug: string;
  title: string;
  tags: string;
  description: string;
  link: string;
  linkLabel: string;
  github?: string;
  /** Two images for the WebGL hover-distortion effect — swap for real screenshots when you have them. */
  image1: string;
  image2: string;
}

export const projects: Project[] = [
  {
    slug: "razorrecover",
    title: "RazorRecover",
    tags: "NEXT.JS, TYPESCRIPT, POSTGRESQL, GROQ AI",
    description:
      "An AI-assisted revenue recovery engine for Razorpay. Classifies failed payments, scores recoverability, and escalates only the genuinely ambiguous cases to an AI reasoning layer — every decision still passes through a deterministic policy engine.",
    link: "https://github.com/aryanthakur0505/RazorRecover",
    linkLabel: "VIEW SOURCE CODE",
    github: "https://github.com/aryanthakur0505/RazorRecover",
    image1: "/img/razorrecover-1.png",
    image2: "/img/razorrecover-2.png",
  },
  {
    slug: "mailpilot",
    title: "MailPilot",
    tags: "NEXT.JS, GEMINI AI, BULLMQ, PGVECTOR",
    description:
      "An AI-powered email client that categorizes, summarizes, and drafts replies for your inbox in the background — with RAG-powered semantic search so you can chat with your own email history.",
    link: "https://github.com/aryanthakur0505/MailPilot",
    linkLabel: "VIEW SOURCE CODE",
    github: "https://github.com/aryanthakur0505/MailPilot",
    image1: "/img/mailpilot-1.png",
    image2: "/img/mailpilot-2.png",
  },
  {
    slug: "gitpulse",
    title: "GitPulse",
    tags: "NEXT.JS, EXPRESS, PINECONE, RAG",
    description:
      "Chat with any public GitHub repository using AI. Ask questions about architecture or a specific function and get answers grounded in the actual source, with file and line citations.",
    link: "https://gitpulse-web-beta.vercel.app",
    linkLabel: "VISIT THE WEBSITE",
    github: "https://github.com/aryanthakur0505/Gitpulse",
    image1: "/img/gitpulse-1.png",
    image2: "/img/gitpulse-2.png",
  },
  {
    slug: "payeazie",
    title: "Payeazie",
    tags: "NODE.JS, FASTIFY, REACT, POSTGRESQL, REDIS/BULLMQ",
    description:
      "A full-stack payment operations platform modeling a real payment lifecycle — async charge processing through Redis/BullMQ workers, state-machine transitions with audit logging, refunds, stuck-payment recovery, and an internal ops dashboard for manual intervention.",
    link: "https://github.com/aryanthakur0505/payeazie",
    linkLabel: "VIEW SOURCE CODE",
    github: "https://github.com/aryanthakur0505/payeazie",
    image1: "/img/payeazie-1.png",
    image2: "/img/payeazie-2.png",
  },
  {
    slug: "magicpin",
    title: "MagicPin",
    tags: "PYTHON, FASTAPI, RULE-BASED NLG",
    description:
      "A deterministic, anti-hallucination message composer built for an AI messaging challenge — generates merchant/customer engagement messages from per-trigger templates instead of an LLM, plus a state-machine handler for multi-turn replies, so nothing is ever fabricated.",
    link: "https://github.com/aryanthakur0505/magicpin",
    linkLabel: "VIEW SOURCE CODE",
    github: "https://github.com/aryanthakur0505/magicpin",
    image1: "/img/magicpin-1.png",
    image2: "/img/magicpin-2.png",
  },
  {
    slug: "oarfin",
    title: "Oarfin",
    tags: "REACT, FLUTTER, NODE.JS, LEAFLET.JS",
    description:
      "A real-time disaster alert and management platform — runner-up at HackCrux. A live map lets authorities track disasters and mark safe zones, a Flutter app alerts people in danger zones and guides them out, and a scraping-driven news pipeline feeds an AI chatbot for emergency guidance.",
    link: "https://oarfin-website-nine.vercel.app",
    linkLabel: "VISIT THE WEBSITE",
    github: "https://github.com/aryanthakur0505/Oarfin",
    image1: "/img/oarfin-1.png",
    image2: "/img/oarfin-2.png",
  },
];
