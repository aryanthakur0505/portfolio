import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project, projects } from "../data/projects";

/**
 * Auto-sliding project gallery (duplicated track for a seamless loop, pauses
 * on hover) with a click-to-zoom lightbox — modeled after the horizontal
 * card marquee on 21st.dev's homepage.
 */
export default function ProjectMarquee() {
  const [active, setActive] = useState<Project | null>(null);
  const track = [...projects, ...projects]; // duplicated for the seamless loop

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="marquee">
        <div className="marquee__track">
          {track.map((project, i) => (
            <button
              key={`${project.slug}-${i}`}
              type="button"
              className="marquee__card"
              onClick={() => setActive(project)}
              aria-label={`Open ${project.title} preview`}
            >
              <img src={project.image1} alt={`${project.title} preview`} />
              <div className="marquee__card-overlay">
                <span className="marquee__card-tag">{project.tags.split(",")[0]}</span>
                <h3>{project.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="lightbox__panel"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox__close"
                onClick={() => setActive(null)}
                aria-label="Close preview"
              >
                ✕
              </button>
              <img src={active.image1} alt={`${active.title} preview`} />
              <div className="lightbox__info">
                <h3>{active.title}</h3>
                <p>{active.description}</p>
                <div className="lightbox__links">
                  <a href={active.link} target="_blank" rel="noopener">
                    {active.linkLabel}
                  </a>
                  {active.github && (
                    <a href={active.github} target="_blank" rel="noopener">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
