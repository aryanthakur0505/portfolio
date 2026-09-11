import { useEffect, useRef } from "react";

/** A minimal custom cursor that follows the pointer. Disabled on touch/tablet in CSS. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.top = `${e.clientY}px`;
      ref.current.style.left = `${e.clientX}px`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div ref={ref} className="cursor" />;
}
