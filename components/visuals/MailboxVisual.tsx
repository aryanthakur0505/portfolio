import { motion } from "framer-motion";
import { Mail } from "lucide-react";

/**
 * An animated mailbox/inbox visual for MailPilot — own implementation
 * inspired by the "empty state" pattern (Kavi Katiyar's MailboxFullState
 * on 21st.dev), whose source is locked behind sign-in. Uses lucide-react's
 * Mail glyph rather than a traced icon.
 */
export default function MailboxVisual() {
  return (
    <div className="mailbox-visual">
      <motion.div
        className="mailbox-visual__icon"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mail size={56} strokeWidth={1.5} />
        <motion.span
          className="mailbox-visual__badge"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          AI
        </motion.span>
      </motion.div>
      <h3>Your inbox, triaged</h3>
      <p>Categorized, summarized, and drafted — before you open the app.</p>
    </div>
  );
}
