import { motion } from "framer-motion";

const transition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

/** Full-screen intro overlay that slides away once the page has settled. */
export default function Preloader() {
  return (
    <motion.div
      animate={{ y: "-100vh", transition: { ...transition, delay: 1.2 } }}
      className="preloader"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition }}
        className="preloader__wordmark"
      >
        ARYAN THAKUR
      </motion.p>
    </motion.div>
  );
}
