import { motion } from "framer-motion";
import { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-card__left">
        <h4 className="heading-4">{project.tags}</h4>
      </div>

      <motion.div
        className="project-card__middle"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        <span className="project-card__middle--placeholder">
          {project.title}
        </span>
      </motion.div>

      <div className="project-card__right">
        <h2 className="heading-2">{project.title}</h2>
        <p>{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener"
          className="project-card__link"
        >
          {project.linkLabel}
        </a>
        {project.github && (
          <div className="project-card__socials">
            <a href={project.github} target="_blank" rel="noopener">
              GitHub ↗
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
