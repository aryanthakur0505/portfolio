import React, { useState } from "react";
import Head from "next/head";
import { cubicBezier, motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import AnimatedGradientBackground from "../components/AnimatedGradientBackground";
import { projects } from "../data/projects";

const locomotiveScroll =
  typeof window !== "undefined" ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== "undefined" ? require("hover-effect").default : null;

const transition = {
  duration: 1.4,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
};

const Home: React.FC = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const refScroll = React.useRef(null);

  React.useEffect(() => {
    if (!refScroll.current) return;
    // @ts-ignore
    const lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    window.addEventListener("load", () => {
      lscroll.update();
    });

    // WebGL image-hover distortion on each project card
    // (guarded against React 18 dev-mode double-invoking effects)
    Array.from(document.querySelectorAll(".project-card__middle")).forEach((el: any) => {
      if (el.querySelector("canvas")) return;
      const imgs: any = Array.from(el.querySelectorAll("img"));
      if (imgs.length < 2) return;
      new hoverEffect({
        parent: el,
        intensity: 0.2,
        image1: imgs[0].getAttribute("src"),
        image2: imgs[1].getAttribute("src"),
        displacementImage: el.dataset.displacement,
      });
    });

    // custom cursor
    const cursor = document.querySelector(".cursor");
    window.onmousemove = (e: any) => {
      cursor?.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
    };

    console.clear();
    console.log.apply(console, [
      "%c Designed and Developed by Aryan Thakur %c %c🚀 %c\n",
      "color: #fff; background: #00d9c0; padding:5px 0; color: #0b0b12;",
      "color: #fff; background: #242424; padding:5px 0 5px 5px;",
      "background: #242424; padding:5px 0",
      "background: #242424; padding:5px 5px 5px 0",
    ]);
    console.log.apply(console, [
      "%c Thanks for stopping by — I'm currently open to new opportunities and collaborations.\n",
      "color: #fff; background: #00d9c0; padding:5px 0;",
    ]);

    return () => lscroll?.destroy();
  }, []);

  function toggleBodyScroll(isOpen: boolean) {
    setIsToggleOpen(!isOpen);
  }

  return (
    <div id="menu-target" data-scroll-container ref={refScroll}>
      <Head>
        <title>Aryan Thakur 🚀 — Full Stack Developer</title>
        <meta
          name="description"
          content="Aryan Thakur — full stack developer building AI-native products: autonomous agents, RAG pipelines, and payment recovery systems."
        />
        <meta name="theme-color" content="#0b0b12" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Aryan Thakur 🚀 — Full Stack Developer" />
        <meta
          property="og:description"
          content="Aryan Thakur — full stack developer building AI-native products: autonomous agents, RAG pipelines, and payment recovery systems."
        />
        <link rel="icon" href="/svg/favicon.svg" />
      </Head>

      <motion.div
        data-scroll
        data-scroll-sticky
        data-scroll-target="#menu-target"
        animate={{ top: "-100vh", transition: { ...transition, delay: 2 } }}
        className="preloader"
      >
        <div className="preloader__wrapper">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition }}
            className="preloader__left"
          >
            AT
          </motion.div>
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition }}
            className="preloader__right"
          >
            <p className="preloader__text">NEXT JS</p>
            <p className="preloader__text">TYPESCRIPT</p>
            <p className="preloader__text">NODE JS</p>
            <p className="preloader__text">POSTGRESQL</p>
            <p className="preloader__text">REACT JS</p>
            <p className="preloader__text">FRAMER MOTION</p>
            <p className="preloader__text">AI / RAG</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="cursor" />

      <Navigation isOpen={isToggleOpen} toggleOpen={() => toggleBodyScroll(isToggleOpen)} />

      <div className="header-wrapper">
        <AnimatedGradientBackground />
        <header className="header">
          <span className="header__eyebrow">ARYAN THAKUR — FULL STACK DEVELOPER</span>
          <div className="header__hero">
            <div className="header__hero--heading">
              <span>I build software</span>
              <br />
              <span className="header__hero--heading-gradient">that does the thinking,</span>
              <br />
              <span>so you don&apos;t have to.</span>
            </div>
            <a data-scroll-to className="header__hero--cta" href="#sectionProjects">
              VIEW PROJECTS
            </a>
          </div>
        </header>
        <div className="header__footer">
          <div className="header__footer--left">BASED IN INDIA</div>
          <div className="header__footer--right">
            <a href="https://github.com/aryanthakur0505" rel="noopener" target="_blank">
              👾 GH
            </a>
            <a href="https://linkedin.com/in/aryan-thakur-3a976b286" rel="noopener" target="_blank">
              💼 LD
            </a>
            <a href="mailto:aryanthakur0505@gmail.com">📧 EMAIL</a>
          </div>
        </div>
      </div>

      <main className="container">
        <p className="about-text">
          Hello 👋, I&apos;m Aryan and I am a full-stack developer, passionate <br /> about
          building autonomous systems that quietly do the manual work for you.
        </p>

        <section id="sectionProjects" className="section-projects">
          <h1 className="heading-1">
            <span>Yeah, I work hard </span> <small>💼</small>
          </h1>
          <p className="paragraph">Each project is unique. Here are some of my works.</p>

          {projects.map((project) => (
            <div className="project-card" key={project.slug}>
              <div className="project-card__left">
                <h4 className="heading-4">{project.tags}</h4>
              </div>
              <div className="project-card__middle" data-displacement="/img/displacement.png">
                <img src={project.image1} alt={`${project.title} preview`} />
                <img src={project.image2} alt={`${project.title} preview alternate`} />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class={`${project.slug}-anim`}
                  className="heading-2"
                >
                  {project.title}
                </h2>
                <p>{project.description}</p>
                <a
                  rel="noopener"
                  target="_blank"
                  href={project.link}
                  className="project-card__link"
                >
                  {project.linkLabel}
                </a>
                {project.github && (
                  <div className="project-card__socials">
                    <a rel="noopener" target="_blank" href={project.github}>
                      <img src="/svg/github.svg" alt="github icon" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="section-contact">
          <h1 className="heading-1">
            <span>Sold Yet? </span> <small>🤙</small>
          </h1>
          <h2 className="section-contact__h2">
            Thanks for stopping by, I&apos;m currently looking to join a new team of creative
            engineers. If you think we might be a good fit for one another, send me an
            <a href="mailto:aryanthakur0505@gmail.com" rel="noopener" target="_blank">
              &nbsp;email 📧
            </a>
            .
          </h2>
        </section>

        <section className="section-socials">
          <h1 className="heading-1">
            <span>Dont be a stranger!</span> <small>👋</small>
          </h1>
          <p className="paragraph">Connect with me online</p>
          <div className="section-socials--links">
            <a href="https://github.com/aryanthakur0505" rel="noopener" target="_blank">
              👾 GitHub
            </a>
            <a href="https://linkedin.com/in/aryan-thakur-3a976b286" rel="noopener" target="_blank">
              💼 LinkedIn
            </a>
            <a href="mailto:aryanthakur0505@gmail.com">📧 Email</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Aryan Thakur</span>
        <div className="footer__socials">
          <a href="https://github.com/aryanthakur0505" target="_blank" rel="noopener">
            <img src="/svg/github.svg" alt="github logo" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
