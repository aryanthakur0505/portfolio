import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Github, Linkedin, Mail, FileText, FolderGit2, MessageCircle } from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}

function scrollToSection(target: string) {
  const lscroll = (window as any).__lscroll;
  if (lscroll?.scrollTo) {
    lscroll.scrollTo(target);
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

function DockIcon({ mouseX, item }: { mouseX: MotionValue<number>; item: DockItem }) {
  const ref = useRef<HTMLButtonElement>(null);

  // Distance between the cursor and this icon's own center — driven purely
  // by mouseX, so every icon re-measures itself on each mouse move.
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - (bounds.x + bounds.width / 2);
  });

  const sizeSync = useTransform(distance, [-140, 0, 140], [40, 68, 40]);
  const size = useSpring(sizeSync, { mass: 0.15, stiffness: 220, damping: 16 });

  return (
    <motion.button
      ref={ref}
      type="button"
      className="dock__icon"
      style={{ width: size, height: size }}
      onClick={item.onClick}
      aria-label={item.label}
    >
      {item.icon}
      <span className="dock__tooltip">{item.label}</span>
    </motion.button>
  );
}

/**
 * A macOS-style magnetic dock — icons magnify based on cursor proximity.
 * Own implementation (21st.dev's "Magnetic Dock" source is locked behind
 * sign-in). Rendered via a portal, same reason as CommandPalette: the page
 * lives inside locomotive-scroll's continuously-transformed container,
 * which breaks plain `position: fixed`.
 */
export default function MagneticDock() {
  const mouseX = useMotionValue(Infinity);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const items: DockItem[] = [
    {
      id: "projects",
      label: "Projects",
      icon: <FolderGit2 size={20} />,
      onClick: () => scrollToSection("#sectionProjects"),
    },
    {
      id: "resume",
      label: "Resume",
      icon: <FileText size={20} />,
      onClick: () => window.open("/Aryan-Thakur-Resume.pdf", "_blank", "noopener"),
    },
    {
      id: "contact",
      label: "Contact",
      icon: <MessageCircle size={20} />,
      onClick: () => scrollToSection("#sectionContact"),
    },
    {
      id: "github",
      label: "GitHub",
      icon: <Github size={20} />,
      onClick: () => window.open("https://github.com/aryanthakur0505", "_blank", "noopener"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <Linkedin size={20} />,
      onClick: () =>
        window.open("https://linkedin.com/in/aryan-thakur-3a976b286", "_blank", "noopener"),
    },
    {
      id: "email",
      label: "Email",
      icon: <Mail size={20} />,
      onClick: () => {
        window.location.href = "mailto:aryanthakur0505@gmail.com";
      },
    },
  ];

  if (!mounted) return null;

  return createPortal(
    <motion.div
      className="dock"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
    >
      {items.map((item) => (
        <DockIcon key={item.id} mouseX={mouseX} item={item} />
      ))}
    </motion.div>,
    document.body
  );
}
