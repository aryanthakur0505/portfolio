import { ComponentType } from "react";
import AuroraCard from "./AuroraCard";
import MailboxVisual from "./MailboxVisual";
import CommitsGridVisual from "./CommitsGridVisual";
import WireframeGlobe from "./WireframeGlobe";
import PipelineVisual from "./PipelineVisual";
import ChatComposerVisual from "./ChatComposerVisual";

// Live component visuals per project slug, shared between ProjectMarquee
// and the nav overlay's "Featured Projects" grid — falls back to a
// project's image1 for anything not listed here.
export const PROJECT_VISUALS: Record<string, ComponentType> = {
  razorrecover: AuroraCard,
  mailpilot: MailboxVisual,
  gitpulse: CommitsGridVisual,
  oarfin: WireframeGlobe,
  payeazie: PipelineVisual,
  magicpin: ChatComposerVisual,
};
