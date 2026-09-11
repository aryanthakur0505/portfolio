import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Cursor from "../components/Cursor";
import Preloader from "../components/Preloader";
import Navigation from "../components/Navigation";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] as const };

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Locomotive Scroll — smooth/inertial scrolling, desktop only.
  useEffect(() => {
    if (!scrollRef.current || window.innerWidth < 900) return;

    let scroll: any;
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scroll = new LocomotiveScroll({
        el: scrollRef.current as HTMLElement,
        smooth: true,
        multiplier: 0.85,
        lerp: 0.08,
      });
    })();

    return () => scroll?.destroy();
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      <Head>
        <title>Aryan Thakur — Full Stack Developer</title>
        <meta
          name="description"
          content="Aryan Thakur — full stack developer building AI-native products: autonomous agents, RAG pipelines, and payment recovery systems."
        />
        <meta name="theme-color" content="#0b0b12" />
        <link rel="icon" href="/svg/favicon.svg" />
      </Head>

      <Cursor />
      <Preloader />
      <Navigation isOpen={isNavOpen} toggleOpen={() => setIsNavOpen((v) => !v)} />

      <div className="header-wrapper">
        <header className="header">
          <div className="container">
            <div className="header__hero">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { ...transition, delay: 1.3 } }}
                className="header__eyebrow"
              >
                ARYAN THAKUR — FULL STACK DEVELOPER
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { ...transition, delay: 1.4 } }}
                className="header__hero--heading"
              >
                <span>I build software</span>
                <br />
                <span className="header__hero--heading-gradient">
                  that does the thinking,
                </span>
                <br />
                <span>so you don&apos;t have to.</span>
              </motion.h1>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { ...transition, delay: 1.6 } }}
                className="header__hero--cta"
                href="#projects"
              >
                VIEW PROJECTS →
              </motion.a>
            </div>
          </div>
        </header>

        <div className="header__footer">
          <div className="container">
            <div className="header__footer--left">BASED IN INDIA</div>
            <div className="header__footer--right">
              <a href="https://github.com/aryanthakur0505" target="_blank" rel="noopener">
                👾 GITHUB
              </a>
              <a
                href="https://linkedin.com/in/aryan-thakur-3a976b286"
                target="_blank"
                rel="noopener"
              >
                💼 LINKEDIN
              </a>
              <a href="mailto:aryanthakur0505@gmail.com">📧 EMAIL</a>
            </div>
          </div>
        </div>
      </div>

      <main className="container">
        <p className="about-text">
          Hello 👋, I&apos;m Aryan — a full-stack developer who likes turning
          manual, repetitive work into autonomous systems. Think AI agents
          that triage your inbox, chat with your codebase, or decide how to
          recover a failed payment — without ever skipping a guardrail.
        </p>

        <section id="projects" className="section section-projects">
          <h1 className="heading-1">
            <span>Selected work</span> <small>💼</small>
          </h1>
          <p className="paragraph">
            A few things I&apos;ve built recently. More on the way.
          </p>

          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>

        <section id="contact" className="section section-contact">
          <h1 className="heading-1">
            <span>Let&apos;s work together</span> <small>🤝</small>
          </h1>
          <h2>
            I&apos;m currently open to new opportunities and collaborations.
            If something I&apos;ve built resonates with what you&apos;re
            working on, send me an
            <a href="mailto:aryanthakur0505@gmail.com"> email 📧</a>.
          </h2>
        </section>

        <section className="section section-socials">
          <h1 className="heading-1">
            <span>Find me online</span> <small>👋</small>
          </h1>
          <div className="section-socials--links">
            <a href="https://github.com/aryanthakur0505" target="_blank" rel="noopener">
              👾 GitHub
            </a>
            <a
              href="https://linkedin.com/in/aryan-thakur-3a976b286"
              target="_blank"
              rel="noopener"
            >
              💼 LinkedIn
            </a>
            <a href="mailto:aryanthakur0505@gmail.com">📧 Email</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Aryan Thakur</span>
          <span>Designed &amp; built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
