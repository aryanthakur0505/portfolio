import * as React from "react";
import { cubicBezier, motion } from "framer-motion";
import { projects } from "../../data/projects";
import { PROJECT_VISUALS } from "../visuals";

const ease = cubicBezier(0.6, 0.01, -0.05, 0.9);

const openTransition = { duration: 1.1, delay: 1.2, ease };
const openTopTransition = { duration: 1.1, delay: 1.3, ease };
const openBottomTransition = { duration: 1.1, delay: 1.7, ease };
const closedTransition = { duration: 1, ease };

export const MobileNavigation = ({ variants, isOpen }: any) => (
  <motion.div
    data-scroll
    data-scroll-sticky
    data-scroll-target="#menu-target"
    variants={variants}
    className="menu-wrapper"
  >
    <motion.div
      animate={
        isOpen
          ? { opacity: 1, transition: openTransition }
          : { opacity: 0, transition: closedTransition }
      }
    >
      <motion.div
        animate={
          isOpen
            ? { opacity: 1, transition: openTopTransition }
            : { opacity: 0, transition: closedTransition }
        }
        className="navigation-top"
      >
        <div className="navigation-top__left">
          <h4 className="navigation-h4">DON&apos;T BE A STRANGER</h4>
          <div className="navigation-top__left--links">
            <a href="https://github.com/aryanthakur0505" rel="noopener" target="_blank">
              👾 GH
            </a>
            <a href="https://linkedin.com/in/aryan-thakur-3a976b286" rel="noopener" target="_blank">
              💼 LD
            </a>
            <a href="/Aryan-Thakur-Resume.pdf" rel="noopener" target="_blank">
              📄 CV
            </a>
          </div>
        </div>
        <div className="navigation-top__right">
          <h4 className="navigation-h4">HAVE AN IDEA?</h4>
          <a href="mailto:aryanthakur0505@gmail.com" target="_blank" rel="nofollow noopener noreferrer">
            Tell me about it
          </a>
        </div>
      </motion.div>

      <motion.div
        animate={
          isOpen
            ? { opacity: 1, transition: openBottomTransition }
            : { opacity: 0, transition: closedTransition }
        }
        className="navigation-bottom"
      >
        <h4 className="navigation-h4">FEATURED PROJECTS</h4>
        <div className="navigation-bottom__projects">
          {projects.map((project) => {
            const Visual = PROJECT_VISUALS[project.slug];
            return (
              <a
                key={project.slug}
                target="_blank"
                rel="noopener"
                href={project.link}
                className="navigation-bottom__projects-card"
              >
                {Visual ? <Visual /> : <img src={project.image1} alt={project.title} />}
                <h2>{project.title}</h2>
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);
