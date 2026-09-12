import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data/projects";

type CommandAction =
  | { type: "scroll"; target: string }
  | { type: "link"; href: string }
  | { type: "copy"; value: string };

interface Command {
  id: string;
  label: string;
  group: string;
  hint?: string;
  action: CommandAction;
}

const NAV_COMMANDS: Command[] = [
  { id: "top", label: "Go to top", group: "Navigate", action: { type: "scroll", target: "top" } },
  { id: "projects", label: "Go to projects", group: "Navigate", action: { type: "scroll", target: "#sectionProjects" } },
  { id: "contact", label: "Go to contact", group: "Navigate", action: { type: "scroll", target: "#sectionContact" } },
  { id: "socials", label: "Go to socials", group: "Navigate", action: { type: "scroll", target: "#sectionSocials" } },
];

const PROJECT_COMMANDS: Command[] = projects.map((p) => ({
  id: `project-${p.slug}`,
  label: `Open ${p.title}`,
  group: "Projects",
  hint: p.tags.split(",")[0].trim(),
  action: { type: "link", href: p.github ?? p.link },
}));

const SOCIAL_COMMANDS: Command[] = [
  { id: "github", label: "Open GitHub profile", group: "Social", action: { type: "link", href: "https://github.com/aryanthakur0505" } },
  { id: "linkedin", label: "Open LinkedIn", group: "Social", action: { type: "link", href: "https://linkedin.com/in/aryan-thakur-3a976b286" } },
  { id: "email", label: "Copy email address", group: "Social", hint: "aryanthakur0505@gmail.com", action: { type: "copy", value: "aryanthakur0505@gmail.com" } },
];

const ALL_COMMANDS = [...NAV_COMMANDS, ...PROJECT_COMMANDS, ...SOCIAL_COMMANDS];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rendered via a portal into <body> — the page's whole content sits
  // inside locomotive-scroll's [data-scroll-container], which it
  // continuously transforms for smooth scrolling. A CSS transform on an
  // ancestor makes `position: fixed` descendants resolve against THAT
  // ancestor instead of the viewport, so without the portal this trigger
  // (and the overlay) would scroll away with the page instead of staying
  // put on screen.
  useEffect(() => setMounted(true), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_COMMANDS;
    return ALL_COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    );
  }, [query]);

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
    setCopied(false);
  };

  const runCommand = (command: Command) => {
    const { action } = command;
    if (action.type === "scroll") {
      const lscroll = (window as any).__lscroll;
      if (lscroll?.scrollTo) {
        lscroll.scrollTo(action.target === "top" ? "top" : action.target);
      } else {
        document.querySelector(action.target)?.scrollIntoView({ behavior: "smooth" });
      }
      close();
    } else if (action.type === "link") {
      window.open(action.href, "_blank", "noopener");
      close();
    } else if (action.type === "copy") {
      navigator.clipboard
        ?.writeText(action.value)
        .then(() => setCopied(true))
        .catch(() => {
          /* clipboard permission denied — the email is still visible as the hint text */
        });
      setTimeout(close, 700);
    }
  };

  // Global open shortcut (Cmd/Ctrl+K)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // In-palette keyboard navigation, focus management
  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[activeIndex];
        if (cmd) runCommand(cmd);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, filtered, activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // group filtered commands in a stable order for rendering
  const groups = useMemo(() => {
    const order = ["Navigate", "Projects", "Social"];
    return order
      .map((g) => ({ group: g, items: filtered.filter((c) => c.group === g) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  if (!mounted) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="cmdk-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette"
      >
        <span>Quick actions</span>
        <kbd>⌘K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cmdk-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
          >
            <motion.div
              className="cmdk-panel"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cmdk-input-row">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  aria-label="Command search"
                />
                <kbd>esc</kbd>
              </div>

              <div className="cmdk-list">
                {groups.length === 0 && <div className="cmdk-empty">No matching commands</div>}
                {groups.map((g) => (
                  <div className="cmdk-group" key={g.group}>
                    <div className="cmdk-group-label">{g.group}</div>
                    {g.items.map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd);
                      return (
                        <button
                          type="button"
                          key={cmd.id}
                          className={`cmdk-item ${globalIndex === activeIndex ? "cmdk-item--active" : ""}`}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          onClick={() => runCommand(cmd)}
                        >
                          <span>{cmd.label}</span>
                          {cmd.hint && (
                            <span className="cmdk-item__hint">
                              {cmd.id === "email" && copied ? "Copied!" : cmd.hint}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="cmdk-footer">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
