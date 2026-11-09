import { useState } from "react";
import heroElevation from "@/assets/hero-elevation.webp.asset.json";
import { Cross } from "./primitives";

const violations = [
  { x: 33, y: 52, code: "IBC 1015.3", text: "Guardrail required for fall protection" },
  { x: 63, y: 46, code: "IBC 1011.11", text: "Handrails required on both sides of stair" },
];

export function Hero() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div id="top" className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative mx-4 mt-4 border border-rule md:mx-6">
        <Cross className="-top-1.5 -left-1.5" />
        <Cross className="-top-1.5 -right-1.5" />
        <Cross className="-bottom-1.5 -left-1.5" />
        <Cross className="-right-1.5 -bottom-1.5" />

        {/* drawing */}
        <div className="group relative">
          <img
            src={heroElevation.url}
            alt="Technical elevation drawing of a concrete building reviewed by Heron AI"
            className="mx-auto w-full max-w-5xl px-6 py-10 select-none md:py-14"
            draggable={false}
          />

          <span className="absolute top-[30%] right-[16%] hidden max-w-[180px] bg-ink px-2.5 py-2 font-mono text-[9px] leading-relaxed tracking-[0.12em] text-primary-foreground uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
            Click and drag your mouse to see violations
          </span>

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
                <span className="absolute top-0 left-5 w-56 border border-ink bg-card p-3 text-left shadow-[6px_6px_0_0_var(--rule)]">
                  <span className="block font-mono text-[10px] tracking-[0.14em] text-signal">
                    {v.code}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-ink">{v.text}</span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* headline row */}
        <div className="grid grid-cols-1 border-t border-rule lg:grid-cols-[1.4fr_1fr]">
          <h1 className="display-xl px-5 py-8">
            An AI agent that works
            <br />
            inside your design tools
          </h1>
          <div className="flex flex-col justify-between gap-6 border-t border-rule px-5 py-8 lg:border-t-0 lg:border-l">
            <div className="flex items-start justify-between gap-6">
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Heron reviews your model, identifies issues, and proposes solutions. Upon approval,
                it edits automatically.
              </p>
              <a
                href="#intro"
                className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-signal uppercase transition-colors hover:text-ink"
              >
                Discover more
              </a>
            </div>
            <div className="flex justify-end">
              <span aria-hidden className="text-xl text-muted-foreground">
                &#8594;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
