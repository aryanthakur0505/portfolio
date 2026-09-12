/**
 * A frosted-glass "credit card" with an animated aurora glow behind it —
 * own implementation of the pattern (not the locked 21st.dev source),
 * built for RazorRecover's payment-recovery theme.
 */
export default function AuroraCard() {
  return (
    <div className="aurora-card">
      <div className="aurora-card__glow" />
      <div className="aurora-card__chip" />
      <div className="aurora-card__badge">REC 92%</div>
      <div className="aurora-card__number">•••• •••• •••• 4471</div>
    </div>
  );
}
