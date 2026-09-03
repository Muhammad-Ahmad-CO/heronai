import { useRef, useState } from "react";
import heroElevation from "@/assets/hero-elevation.webp.asset.json";
import { ArrowLink, Cross } from "./primitives";

const violations = [
  { x: 33, y: 52, code: "IBC 1015.3", text: "Guardrail required for fall protection" },
  { x: 63, y: 46, code: "IBC 1011.11", text: "Handrails required on both sides of stair" },
];

export function Hero() {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 446, y: 1003 });
  const [active, setActive] = useState<number | null>(null);

  return (
    <div id="top" className="relative min-h-[100svh] overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div
        ref={frame}
        onMouseMove={(e) => {
          const r = frame.current?.getBoundingClientRect();
          if (!r) return;
          setPos({
            x: Math.round(e.clientX - r.left),
            y: Math.round(e.clientY - r.top),
          });
        }}
        className="relative mx-4 mt-4 border border-rule md:mx-6"
      >
        <Cross className="-left-1.5 -top-1.5" />
        <Cross className="-right-1.5 -top-1.5" />
        <Cross className="-bottom-1.5 -left-1.5" />
        <Cross className="-bottom-1.5 -right-1.5" />

        {/* technical readout */}
        <div className="flex items-center justify-between border-b border-rule px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>Welcome to Heron AI</span>
          <span className="hidden sm:inline">
            X: {pos.x} PX &nbsp;/&nbsp; Y: {pos.y} PX
          </span>
          <span className="flex items-center gap-2">
            <span className="signal-dot inline-block h-1.5 w-1.5 bg-signal" /> 100%
          </span>
        </div>

        {/* drawing */}
        <div className="relative">
          <img
            src={heroElevation.url}
            alt="Technical elevation drawing of a concrete building reviewed by Heron AI"
            className="mx-auto w-full max-w-5xl select-none px-6 py-10 md:py-16"
            draggable={false}
          />

          {violations.map((v, i) => (
            <button
              key={v.code}
              onClick={() => setActive(active === i ? null : i)}
              style={{ left: `${v.x}%`, top: `${v.y}%` }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              aria-label={`Violation ${v.code}`}
            >
              <span className="signal-dot block h-2.5 w-2.5 bg-signal" />
              {active === i && (
                <span className="absolute left-5 top-0 w-56 border border-ink bg-card p-3 text-left shadow-[6px_6px_0_0_var(--rule)]">
                  <span className="block font-mono text-[10px] tracking-[0.14em] text-signal">
                    {v.code}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-ink">{v.text}</span>
                </span>
              )}
            </button>
          ))}

          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            [Click on violation]
          </span>
        </div>

        {/* headline row */}
        <div className="grid grid-cols-1 border-t border-rule lg:grid-cols-[1.4fr_1fr]">
          <h1 className="display-xl px-5 py-8">
            An AI agent that works
            <br />
            inside your design tools
          </h1>
          <div className="flex flex-col justify-between gap-6 border-t border-rule px-5 py-8 lg:border-l lg:border-t-0">
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Heron reviews your model, identifies issues, and proposes solutions. Upon approval, it
              edits automatically — inside the software you already use.
            </p>
            <ArrowLink href="#intro">Discover more</ArrowLink>
          </div>
        </div>
      </div>
    </div>
  );
}
