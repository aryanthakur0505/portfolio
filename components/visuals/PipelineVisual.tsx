import { motion } from "framer-motion";

/**
 * An ops/worker-status visual for Payeazie — pulsing worker health rows
 * plus a scrolling audit-log ticker, matching its "internal ops dashboard"
 * and audit-logged worker pipeline.
 */
const WORKERS = [
  { name: "Charge Worker", status: "healthy" as const },
  { name: "Reconcile Worker", status: "healthy" as const },
  { name: "Gateway (mock)", status: "watch" as const },
];

const LOG_LINES = [
  "payment.charged · pay_8f21 · $42.00",
  "payment.retry_scheduled · pay_7ac3",
  "refund.issued · pay_5d90 · operator:ops",
  "payment.reconciled · pay_2b14",
];

export default function PipelineVisual() {
  return (
    <div className="pipeline-visual">
      <div className="pipeline-visual__workers">
        {WORKERS.map((w) => (
          <div className="pipeline-visual__row" key={w.name}>
            <motion.span
              className={`pipeline-visual__dot pipeline-visual__dot--${w.status}`}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span>{w.name}</span>
          </div>
        ))}
      </div>
      <div className="pipeline-visual__log">
        <div className="pipeline-visual__log-track">
          {[...LOG_LINES, ...LOG_LINES].map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
