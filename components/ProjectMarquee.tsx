import { ComponentType } from "react";
import { projects } from "../data/projects";
import AuroraCard from "./visuals/AuroraCard";
import MailboxVisual from "./visuals/MailboxVisual";
import CommitsGridVisual from "./visuals/CommitsGridVisual";
import WireframeGlobe from "./visuals/WireframeGlobe";
import PipelineVisual from "./visuals/PipelineVisual";
import ChatComposerVisual from "./visuals/ChatComposerVisual";

// Live component visuals for a few projects, in place of the flat mockup
// image — falls back to project.image1 for anything not listed here.
const VISUALS: Record<string, ComponentType> = {
  razorrecover: AuroraCard,
  mailpilot: MailboxVisual,
  gitpulse: CommitsGridVisual,
  oarfin: WireframeGlobe,
  payeazie: PipelineVisual,
  magicpin: ChatComposerVisual,
};

/**
 * Auto-sliding project gallery (duplicated track for a seamless loop, pauses
 * on hover) — modeled after the horizontal card marquee on 21st.dev's
 * homepage. Each card links straight to the project's source code.
 */
export default function ProjectMarquee() {
  const track = [...projects, ...projects]; // duplicated for the seamless loop

  return (
    <div className="marquee">
      <div className="marquee__track">
        {track.map((project, i) => {
          const Visual = VISUALS[project.slug];
          return (
            <a
              key={`${project.slug}-${i}`}
              className="marquee__card"
              href={project.github ?? project.link}
              target="_blank"
              rel="noopener"
              aria-label={`Open ${project.title} source code`}
            >
              {Visual ? (
                <Visual />
              ) : (
                <img src={project.image1} alt={`${project.title} preview`} />
              )}
              <div className="marquee__card-overlay">
                <span className="marquee__card-tag">{project.tags.split(",")[0]}</span>
                <h3>{project.title}</h3>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
