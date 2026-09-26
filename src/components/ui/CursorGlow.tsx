import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;

    if (!glow) return;

    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${e.clientX - 250}px, ${
          e.clientY - 250
        }px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}