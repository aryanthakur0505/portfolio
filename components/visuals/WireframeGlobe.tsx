import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";

/**
 * A slowly rotating wireframe/dotted globe, canvas-rendered with d3-geo —
 * own implementation (the 21st.dev "Wireframe Dotted Globe" source is
 * locked behind sign-in). A few pulsing markers stand in for "active
 * disaster alerts", tying it to Oarfin.
 */
const MARKERS: [number, number][] = [
  [-99, 39], // North America
  [15, 50], // Europe
  [103, 1], // SE Asia
  [-60, -15], // South America
];

export default function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const projection = geoOrthographic()
      .scale(size / 2.2)
      .translate([size / 2, size / 2])
      .clipAngle(90);
    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();

    let lambda = 0;
    let raf: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      projection.rotate([lambda, -18]);

      // sphere outline
      ctx.beginPath();
      path({ type: "Sphere" } as any);
      ctx.strokeStyle = "rgba(0, 217, 192, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // graticule (lat/lon wireframe)
      ctx.beginPath();
      path(graticule as any);
      ctx.strokeStyle = "rgba(242, 242, 242, 0.12)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // marker dots
      MARKERS.forEach(([lon, lat], i) => {
        const p = projection([lon, lat]);
        if (!p) return;
        const pulse = (Math.sin(Date.now() / 500 + i) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 2.5 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 138, 76, ${0.5 + pulse * 0.4})`;
        ctx.fill();
      });

      lambda += 0.25;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="wireframe-globe">
      <canvas ref={canvasRef} className="wireframe-globe__canvas" />
    </div>
  );
}
