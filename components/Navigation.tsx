import { AnimatePresence, motion } from "framer-motion";

interface NavigationProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const links = [
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "GitHub", href: "https://github.com/aryanthakur0505" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aryan-thakur-3a976b286" },
];

export default function Navigation({ isOpen, toggleOpen }: NavigationProps) {
  return (
    <>
      <div
        className={`nav-toggle ${isOpen ? "nav-toggle--open" : ""}`}
        onClick={toggleOpen}
      >
        <span />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="nav-overlay"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={toggleOpen}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener" : undefined}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
