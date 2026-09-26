import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("✅ CursorGlow is running");

    const glow = glowRef.current;
    if (!glow) return;

    const moveGlow = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        width: "180px",
        height: "180px",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 2147483647,

        background:
          "radial-gradient(circle, rgba(45,230,210,0.65) 0%, rgba(45,230,210,0.3) 35%, rgba(45,230,210,0.08) 60%, transparent 75%)",

        boxShadow:
          "0 0 50px rgba(45,230,210,0.35), 0 0 100px rgba(45,230,210,0.2)",

        transition: "left 0.08s linear, top 0.08s linear",
      }}
    />
  );
}