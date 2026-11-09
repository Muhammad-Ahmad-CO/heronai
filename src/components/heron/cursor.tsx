import { useEffect, useRef } from "react";

/*
 * The reference site's signature cursor: a small red square with a thin
 * orange trail that fades behind it. Fine pointers only; native cursor is
 * hidden through CSS while this is mounted.
 */
export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    document.documentElement.classList.add("heron-cursor");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const pts: Array<{ x: number; y: number; t: number }> = [];
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pts.length > 90) pts.shift();
    };
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const loop = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);
      while (pts.length && now - pts[0]!.t > 550) pts.shift();
      if (pts.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pts[0]!.x, pts[0]!.y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i]!.x, pts[i]!.y);
        ctx.strokeStyle = "rgba(255, 90, 31, 0.55)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      const last = pts[pts.length - 1];
      if (last) {
        ctx.fillStyle = "#ff4d1c";
        ctx.fillRect(last.x - 4, last.y - 4, 8, 8);
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("heron-cursor");
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block"
    />
  );
}
