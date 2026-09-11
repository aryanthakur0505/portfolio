import * as React from "react";
import { cubicBezier, motion } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { MobileNavigation } from "./MobileNavigation";
import Link from "next/link";

const ease = cubicBezier(0.6, 0.01, -0.05, 0.9);

const variants = {
  open: {
    left: 0,
    transition: { duration: 1, ease },
  },
  closed: {
    left: "-100vw",
    transition: { delay: 1, duration: 1, ease },
  },
};

export const Navigation = ({ isOpen, toggleOpen }: any) => {
  return (
    <motion.div initial={false} animate={isOpen ? "open" : "closed"} className="navigation-wrapper">
      <MobileNavigation variants={variants} isOpen={isOpen} />
      <div data-scroll data-scroll-sticky data-scroll-target="#menu-target" className="menu-top">
        <Link href="/" className="brand-logo__wordmark">
          ARYAN THAKUR
        </Link>
        <MenuToggle toggle={toggleOpen} toggleState={isOpen} />
      </div>
    </motion.div>
  );
};
