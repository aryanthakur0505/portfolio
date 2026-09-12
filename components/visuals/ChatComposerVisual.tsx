import { motion } from "framer-motion";

/**
 * A WhatsApp-style composed-message preview for MagicPin — an incoming
 * merchant trigger and the deterministic AI-composed reply, with a typing
 * indicator, matching its actual message-composer product.
 *
 * Note: animation is expressed entirely through `animate` (no `initial`
 * prop) so framer-motion renders identically during SSR and on first
 * client paint — an explicit `initial` here causes a hydration mismatch.
 */
export default function ChatComposerVisual() {
  return (
    <div className="chat-composer">
      <motion.div
        className="chat-composer__bubble chat-composer__bubble--in"
        animate={{ opacity: [0, 1], y: [10, 0] }}
        transition={{ duration: 0.5 }}
      >
        Trigger: festival_upcoming
      </motion.div>

      <motion.div
        className="chat-composer__typing"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6 }}
      >
        <span />
        <span />
        <span />
      </motion.div>

      <motion.div
        className="chat-composer__bubble chat-composer__bubble--out"
        animate={{ opacity: [0, 0, 1], y: [10, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.7, 1] }}
      >
        Diwali's near — book your glow-up slot before it fills up ✨
      </motion.div>
    </div>
  );
}
