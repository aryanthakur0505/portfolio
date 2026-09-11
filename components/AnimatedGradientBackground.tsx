/**
 * Ambient animated gradient background — slow-moving blurred color blobs
 * behind the hero, inspired by the "Animated Gradient Background" pattern
 * on 21st.dev (own from-scratch CSS implementation, tuned to this site's
 * teal/violet palette rather than reusing any third-party source).
 */
export default function AnimatedGradientBackground() {
  return (
    <div className="gradient-bg" aria-hidden="true">
      <span className="gradient-bg__blob gradient-bg__blob--one" />
      <span className="gradient-bg__blob gradient-bg__blob--two" />
      <span className="gradient-bg__blob gradient-bg__blob--three" />
    </div>
  );
}
