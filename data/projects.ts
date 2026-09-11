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
];
