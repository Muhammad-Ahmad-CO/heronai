import { useEffect, useRef, useState, type ReactNode } from "react";
import tower from "@/assets/tower-wireframe.avif.asset.json";
import floorplan from "@/assets/floorplan-widget.jpg.asset.json";
import dashboard from "@/assets/dashboard.webp.asset.json";
import collage1 from "@/assets/collage-1.jpg.asset.json";
import collage2 from "@/assets/collage-2.jpg.asset.json";
import collage3 from "@/assets/collage-3.jpg.asset.json";
import collage4 from "@/assets/collage-4.jpg.asset.json";
import { ArrowLink, Label, Section } from "./primitives";
import { FloorPlan, planViolations } from "./plan";

/* ------------------------------------------------------------ scroll hook */

function useProgress(
  ref: React.RefObject<HTMLElement | null>,
  from = 0.85,
  to = 0.3,
) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * (from - to);
      const raw = total > 0 ? (vh * from - r.top) / total : 0;
      setP(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, from, to]);
  return p;
}

/* ---------------------------------------------------------------- marquee */

export function Marquee() {
  const items = ["Faster iterations", "Fewer mistakes", "Less busywork"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-rule py-3">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-[11px] tracking-[0.2em] text-ink uppercase"
          >
            {t}
            <span className="inline-block h-2 w-2 rounded-full border-[1.5px] border-current" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- statement */

function WordReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const p = useProgress(ref, 0.88, 0.42);
  const words = text.split(" ");
  const active = Math.floor(p * (words.length + 2));
  return (
    <p ref={ref} className="display-lg max-w-3xl uppercase">
      {words.map((w, i) => (
        <span key={i} className="word" style={{ color: i < active ? "var(--ink)" : "oklch(0.19 0.005 60 / 0.26)" }}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

export function Statement() {
  return (
    <Section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative min-h-[340px] overflow-hidden border-b border-rule lg:border-r lg:border-b-0">
        <img
          src={tower.url}
          alt="Wireframe perspective of a high-rise concrete tower"
          className="h-full w-full object-cover"
        />
        <span className="absolute top-[6%] right-[10%] h-44 w-44 rounded-full bg-signal mix-blend-multiply md:h-56 md:w-56" />
      </div>
      <div className="flex flex-col justify-center gap-10 px-5 py-14 md:px-10">
        <WordReveal text="The repetitive parts of modelling shouldn't eat your day. Heron handles the fiddly, manual work so you can stay focused on the design, not the software." />
        <div className="flex">
          <ArrowLink href="#product">Learn more</ArrowLink>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- clients */

const clientMarks = [
  { name: "Pinecrest", glyph: "M2 14 L8 4 L14 14 Z M8 8 V14" },
  { name: "Vertex", glyph: "M2 3 L8 15 L14 3" },
  { name: "Verdant", glyph: "M8 15 V6 M8 6 C8 3 5 2 2 2 C2 6 5 7 8 6 M8 6 C8 3 11 2 14 2 C14 6 11 7 8 6" },
  { name: "Northridge", glyph: "M2 13 L6 5 L9 10 L11 6 L14 13" },
  { name: "Alcove", glyph: "M3 14 V8 A5 5 0 0 1 13 8 V14" },
  { name: "Skyline", glyph: "M2 14 V6 H6 V14 M7 14 V3 H11 V14 M12 14 V8 H14 V14" },
];

export function Clients() {
  return (
    <Section>
      <div className="flex items-center justify-between px-5 py-3 md:px-10">
        <Label>Clients</Label>
        <span className="flex gap-2">
          <span className="flex h-8 w-10 items-center justify-center border border-rule">&#8592;</span>
          <span className="flex h-8 w-10 items-center justify-center border border-rule">&#8594;</span>
        </span>
      </div>
      <div className="grid grid-cols-2 border-t border-rule md:grid-cols-3 lg:grid-cols-6">
        {clientMarks.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-center gap-2.5 px-4 py-9 text-muted-foreground transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d={c.glyph} />
            </svg>
            <span className="font-display text-[13px] font-semibold tracking-[0.14em] uppercase">
              {c.name}
            </span>
          </div>
        ))}
      </div>
      <p className="border-t border-rule px-5 py-4 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase md:px-10">
        Works natively inside the tools you already use, including Revit, Rhino, ArchiCAD and
        SketchUp.
      </p>
    </Section>
  );
}

/* --------------------------------------------------------------- problems */

const diagrams = [
  // manual: iso cube with a cylinder on top
  <>
    <ellipse cx="60" cy="12" rx="16" ry="5.5" />
    <path d="M44 12 V24 M76 12 V24 M44 24 A16 5.5 0 0 0 76 24" />
    <path d="M60 30 L86 42 L60 54 L34 42 Z M34 42 L60 54 V78 L34 66 Z M86 42 L60 54 V78 L86 66 Z" />
  </>,
  // disjointed: a sphere floating away from a cube
  <>
    <circle cx="84" cy="22" r="13" />
    <path d="M46 44 L68 54 L46 64 L24 54 Z M24 54 L46 64 V82 L24 72 Z M68 54 L46 64 V82 L68 72 Z" />
    <path d="M58 40 L72 30" strokeDasharray="3 4" />
  </>,
  // blind: a cube sealed inside a circle
  <>
    <circle cx="60" cy="46" r="36" />
    <path d="M60 30 L78 39 L60 48 L42 39 Z M42 39 L60 48 V64 L42 55 Z M78 39 L60 48 V64 L78 55 Z" />
  </>,
  // slow: stacked iso slabs
  <>
    <path d="M60 62 L90 74 L60 86 L30 74 Z M30 74 V80 L60 92 L90 80 V74" />
    <path d="M60 44 L90 56 L60 68 L30 56 Z M30 56 V62 L60 74 L90 62 V56" />
    <path d="M60 26 L90 38 L60 50 L30 38 Z M30 38 V44 L60 56 L90 44 V38" />
  </>,
];

const problems = [
  {
    tag: "Manual",
    n: "[01]",
    title: "Every change is on you",
    body: "You make each edit by hand, one at a time, even the ones you've done a hundred times before.",
  },
  {
    tag: "Disjointed",
    n: "[02]",
    title: "AI help sits outside your model",
    body: "Generic AI tools can't see your project, so you keep copying, pasting, and re-explaining the same context.",
  },
  {
    tag: "Blind",
    n: "[03]",
    title: "Nothing watches for problems",
    body: "Issues sit quietly in your model until you happen to spot them, if you spot them at all.",
  },
  {
    tag: "Slow",
    n: "[04]",
    title: "Small tasks pile up into lost days",
    body: "The fiddly work that fills your week is exactly the work software should be doing for you.",
  },
];

export function Problems() {
  const ref = useRef<HTMLDivElement | null>(null);
  const p = useProgress(ref, 0.8, 0.35);
  return (
    <Section id="problems">
      <div className="grid grid-cols-1 gap-8 px-5 py-14 md:px-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Label>Problems</Label>
          <h2 className="display-lg mt-5 max-w-2xl">
            Your design tools do what you tell them, nothing more
          </h2>
        </div>
        <p className="max-w-md self-end text-sm leading-relaxed text-muted-foreground">
          Design software is powerful but passive. It waits for every instruction, gives no advice,
          and can&rsquo;t act on its own, so all the repetitive work stays on you.
        </p>
      </div>

      <div ref={ref} className="relative">
        {/* travelling signal line */}
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-[31%] z-10 hidden h-16 w-full lg:block"
          aria-hidden
        >
          <path
            d="M0 55 C 200 15, 320 90, 500 50 S 820 20, 1000 55"
            fill="none"
            stroke="var(--signal)"
            strokeWidth="1.4"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100 * (1 - p)}
          />
        </svg>

        <div className="grid grid-cols-1 divide-y divide-rule border-t border-rule md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {problems.map((prob, i) => {
            const lit = p > (i + 0.5) / 4;
            return (
              <article key={prob.n} className="relative flex flex-col p-6 md:border-r md:border-rule">
                <div className="flex items-center justify-between">
                  <span className="label-tech flex items-center gap-2">
                    <span className={`inline-block h-1.5 w-1.5 ${lit ? "bg-signal" : "bg-ink/25"}`} />
                    {prob.tag}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{prob.n}</span>
                </div>
                <div className="relative flex items-center justify-center py-8">
                  <svg
                    viewBox="0 0 120 96"
                    className="h-28 w-auto"
                    fill="none"
                    stroke="var(--ink)"
                    strokeOpacity="0.5"
                    strokeWidth="1.3"
                  >
                    {diagrams[i]}
                  </svg>
                  <span
                    className={`absolute top-1/2 left-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 lg:block ${
                      lit ? "bg-signal" : "bg-paper border border-ink/40"
                    }`}
                  />
                </div>
                <div className="mt-auto border-t border-dashed border-rule pt-5">
                  <h3 className="font-display text-xl leading-tight font-semibold uppercase">
                    {prob.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{prob.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ introduction */

const introTexts = [
  "Architects spend hours on manual modelling, coordination, and cleanup, work that pulls focus away from the actual design.",
  "Most of it is repetitive and rule-based, the kind of task that shouldn't need a person doing it by hand every time.",
  "Heron works inside your design tool as an agent that sees your model, flags issues, and makes edits on your approval, so the busywork stops eating your day.",
];

export function Introduction() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [prog, setProg] = useState(0);
  const [sel, setSel] = useState<number | null>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const raw = total > 0 ? -r.top / total : 0;
      setProg(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const stage = prog < 0.44 ? 0 : prog < 0.56 ? 2 : prog < 0.68 ? 3 : 4;
  const h1o = prog < 0.14 ? 1 : Math.max(0, 1 - (prog - 0.14) / 0.08);
  const h2o =
    prog < 0.2 ? 0 : prog < 0.28 ? (prog - 0.2) / 0.08 : prog < 0.38 ? 1 : Math.max(0, 1 - (prog - 0.38) / 0.08);
  const planO = prog < 0.36 ? 0 : Math.min(1, (prog - 0.36) / 0.1);
  const textIdx = prog < 0.52 ? 0 : prog < 0.66 ? 1 : 2;
  const card = sel !== null ? planViolations[sel]! : null;

  return (
    <div id="intro" ref={wrapRef} className="relative border-t border-rule" style={{ height: "460vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 blueprint opacity-50" />

        {/* stage headlines */}
        <div
          className="absolute inset-0 flex items-center justify-center px-5"
          style={{ opacity: h1o, visibility: h1o < 0.02 ? "hidden" : "visible" }}
        >
          <p className="display-xl text-center">Right there with you</p>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center px-5"
          style={{ opacity: h2o, visibility: h2o < 0.02 ? "hidden" : "visible" }}
        >
          <p className="display-xl max-w-5xl text-center">For the whole design process</p>
        </div>

        {/* the plan drawing itself */}
        <div
          className="absolute inset-0 flex items-center justify-center px-4"
          style={{ opacity: planO }}
        >
          <div className="w-[min(880px,94vw)]">
            <FloorPlan stage={stage} selected={sel} onMarker={stage >= 4 ? setSel : undefined} />
          </div>
          <span className="absolute top-[56%] left-[10%] hidden h-2 w-2 bg-signal md:block" />
        </div>

        {/* introduction card */}
        <div className="absolute bottom-6 left-4 w-[300px] max-w-[86vw] border border-ink bg-card md:left-6">
          <div className="bg-ink px-3 py-2">
            <span className="font-mono text-[10px] tracking-[0.16em] text-primary-foreground uppercase">
              Introduction
            </span>
          </div>
          <div className="p-4">
            {card ? (
              <>
                <span className="font-mono text-[11px] tracking-[0.14em] text-signal">{card.code}</span>
                <p className="mt-1.5 font-display text-[15px] font-semibold uppercase">{card.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{card.body}</p>
              </>
            ) : (
              <p key={textIdx} className="fade-in text-sm leading-relaxed">
                {introTexts[textIdx]}
              </p>
            )}
            <span className="mt-3 block font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              {card ? "[Click another violation]" : stage >= 4 ? "[Click on violation]" : "[Scroll to continue]"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ agent panel */

const agentRows = [
  "Works with Revit, Rhino, ArchiCAD, SketchUp.",
  "Understands your geometry and intent.",
  "Suggests fixes while you work.",
  "Edits automatically after your approval.",
];

export function AgentPanel() {
  return (
    <Section id="agent">
      <div className="grid grid-cols-1 gap-10 px-5 py-14 md:px-10 lg:grid-cols-[1fr_1.6fr]">
        <p className="font-mono text-[11px] leading-loose tracking-[0.16em] text-muted-foreground uppercase">
          Your model.
          <br />
          Your tools.
          <br />
          Connected.
        </p>
        <div>
          <h2 className="display-lg max-w-2xl">Run an agent natively in your model</h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Heron runs inside the design software you already use. It reads your model, understands
            what you&rsquo;re working on, and can make changes directly, with every action shown to
            you first so nothing happens without your say-so.
          </p>
          <ul className="mt-9">
            {agentRows.map((t) => (
              <li
                key={t}
                className="flex items-center justify-between gap-6 border-t border-dashed border-rule py-4"
              >
                <span className="text-[15px]">{t}</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <polygon points="12,2.5 20.5,7.2 20.5,16.8 12,21.5 3.5,16.8 3.5,7.2" />
                  <circle cx="12" cy="12" r="2.4" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- showcases */

const showcases = [
  {
    n: "[01]",
    title: "Heron Chat Widget",
    body: "A chat that floats over your design tool. Ask it about your model or tell it what to change, and it acts inside the software on your approval.",
    img: floorplan.url,
    alt: "Heron chat widget floating over an office floor plan",
  },
  {
    n: "[02]",
    title: "Heron Dashboard",
    body: "Ask code questions about your building and get answers that reflect how the code applies to your layout, occupancy, and conditions, not just what the requirements say in isolation.",
    img: dashboard.url,
    alt: "Heron dashboard showing model health and pending approvals",
  },
];

export function Showcases() {
  return (
    <Section id="product">
      {showcases.map((c) => (
        <article
          key={c.n}
          className="grid grid-cols-1 gap-8 px-5 py-12 md:px-10 lg:grid-cols-[0.85fr_1.35fr_1fr] lg:gap-10 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-rule"
        >
          <div>
            <span className="font-mono text-[11px] text-signal">{c.n}</span>
            <h3 className="display-lg mt-3">{c.title}</h3>
          </div>
          <div className="overflow-hidden border border-rule bg-paper-deep">
            <img
              src={c.img}
              alt={c.alt}
              loading="lazy"
              className="h-full max-h-[380px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-8">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            <a
              href="#contact"
              className="group flex items-center justify-between border-t border-dashed border-rule pt-4 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:text-signal"
            >
              Learn more
              <span className="transition-transform group-hover:translate-x-1">&#8594;</span>
            </a>
          </div>
        </article>
      ))}
    </Section>
  );
}

/* -------------------------------------------------------------------- why */

const pillars = [
  {
    t: "Observe",
    b: "Heron watches your model as you design",
    img: tower.url,
    alt: "Wireframe tower drawing",
    barRight: true,
  },
  {
    t: "Advise",
    b: "It flags issues and suggests fixes in plain language",
    img: floorplan.url,
    alt: "Floor plan with a flagged violation",
    barRight: false,
  },
  {
    t: "Act",
    b: "With your approval, it makes the edit directly in the model",
    img: dashboard.url,
    alt: "Heron dashboard with pending approvals",
    barRight: true,
  },
  {
    t: "Learn",
    b: "It picks up your firm's standards and gets more useful over time",
    img: collage4.url,
    alt: "Architectural illustration",
    barRight: false,
  },
];

export function Why() {
  return (
    <Section id="why">
      <div className="grid grid-cols-1 gap-8 px-5 py-14 md:px-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Label>Why us</Label>
          <h2 className="display-lg mt-5 max-w-2xl">Built to work the way you do</h2>
        </div>
        <div className="max-w-md self-end">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Heron fits into your process instead of replacing it. It watches quietly, speaks up when
            something needs attention, and only acts when you say so, so you stay in control the
            whole way through.
          </p>
          <span className="mt-4 block font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            [Scroll to continue]
          </span>
        </div>
      </div>

      {pillars.map((p) => (
        <div key={p.t} className="grid grid-cols-1 border-t border-rule lg:grid-cols-2">
          <div
            className={`relative min-h-[280px] overflow-hidden ${
              p.barRight ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <img src={p.img} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div
            className={`flex items-center px-5 py-10 md:px-10 ${p.barRight ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="flex w-full items-center justify-between gap-6 bg-ink px-5 py-4 text-primary-foreground">
              <span className="font-display text-2xl font-semibold uppercase">{p.t}</span>
              <span className="hidden max-w-[240px] text-[13px] leading-snug text-primary-foreground/75 sm:block">
                {p.b}
              </span>
              <span className="h-2 w-2 shrink-0 bg-signal" />
            </div>
          </div>
        </div>
      ))}
    </Section>
  );
}

/* -------------------------------------------------------------- use cases */

const cases = [
  { t: "Architects", b: "Hand the repetitive modelling to Heron and keep your focus on design.", img: collage1.url },
  { t: "Interior Designers", b: "Get quick help with layouts, fixtures, and clearances without leaving your model.", img: collage2.url },
  { t: "Landscape Architects", b: "Sort grading, site elements, and layouts without the manual grind.", img: collage3.url },
  { t: "Engineers", b: "Run discipline-specific checks and edits in the model, so coordination issues surface earlier.", img: collage4.url },
  { t: "BIM Managers", b: "Keep models clean and on-standard with an agent that knows your firm's rules.", img: collage2.url },
  { t: "Drafters", b: "Skip the tedious drawing cleanup and let Heron handle the repeatable parts.", img: collage3.url },
  { t: "Design Leads", b: "Keep quality and standards consistent across everyone's work.", img: collage1.url },
  { t: "Small Firms", b: "Get the output of a bigger team without adding headcount.", img: collage4.url },
];

export function UseCases() {
  const [open, setOpen] = useState(3);
  const current = cases[open] ?? cases[0]!;
  return (
    <Section id="use-cases">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[380px] border-b border-rule lg:border-r lg:border-b-0">
          <img
            key={current.img + open}
            src={current.img}
            alt={`Architectural collage representing ${current.t}`}
            className="fade-in absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute right-3 bottom-2 left-3 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>[831, 0]</span>
            <span>[2303, 0]</span>
          </span>
        </div>

        <div>
          <div className="p-6 md:p-10">
            <Label>Use cases</Label>
            <h2 className="display-lg mt-5">
              Made for
              <br />
              the people in
              <br />
              the model
            </h2>
          </div>
          <div className="border-t border-rule">
            {cases.map((c, i) => (
              <button
                key={c.t}
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen(i)}
                className="block w-full border-b border-dashed border-rule px-6 py-4 text-left transition-colors last:border-b-0 hover:bg-paper-deep md:px-10"
              >
                <span className="flex items-start justify-between gap-6">
                  <span className="font-display text-lg font-semibold uppercase">{c.t}</span>
                  <span className="mt-0.5 font-mono text-sm text-signal">{open === i ? "−" : "+"}</span>
                </span>
                {open === i && (
                  <span className="fade-in mt-2 block max-w-md text-sm leading-relaxed text-muted-foreground">
                    {c.b}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------- CTA */

export function CTA() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 blueprint opacity-50" />
      <div className="relative flex flex-col items-center gap-6 px-5 pt-24 pb-16 text-center">
        <h2 className="display-lg max-w-2xl">See what Heron can do in your model</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Book a demo and we&rsquo;ll show Heron working inside one of your own projects.
        </p>
        <ArrowLink href="mailto:hello@heronaiapp.com" variant="solid">
          Contact us
        </ArrowLink>
      </div>
      <div className="relative border-t border-rule">
        <div className="relative mx-auto max-w-3xl px-6 py-12">
          <span className="absolute top-1/2 left-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal mix-blend-multiply" />
          <img
            src={tower.url}
            alt="Line drawing of a concrete building with a red sun"
            loading="lazy"
            className="relative mx-auto h-72 w-full object-contain"
          />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ footer */

function FooterWordmark() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: ((e.clientX - r.left) / r.width) * 1200,
      y: ((e.clientY - r.top) / r.height) * 200,
    });
  };

  const ticks = [70, 210, 350, 470, 610, 740, 880, 990, 1120];
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos(null)}
      className="relative border-t border-rule px-2 pt-4"
      aria-label="Heron AI"
      role="img"
    >
      <svg viewBox="0 0 1200 200" className="w-full">
        <defs>
          <clipPath id="ink-blob">
            <circle cx={pos?.x ?? -300} cy={pos?.y ?? -300} r={pos ? 105 : 0} />
          </clipPath>
        </defs>
        {ticks.map((x) => (
          <g key={x} stroke="var(--ink)" strokeOpacity="0.6" strokeWidth="1">
            <path d={`M${x} 6 V20 M${x} 180 V194`} />
          </g>
        ))}
        <path d="M20 192 H1180" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1" />
        <text
          x="600"
          y="158"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="800"
          fontSize="172"
          letterSpacing="6"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.4"
        >
          HERON AI
        </text>
        <text
          x="600"
          y="158"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="800"
          fontSize="172"
          letterSpacing="6"
          fill="var(--ink)"
          clipPath="url(#ink-blob)"
        >
          HERON AI
        </text>
      </svg>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const cols: Array<{ h: string; l: Array<{ t: string; red?: boolean }> }> = [
    {
      h: "Company",
      l: [{ t: "Home", red: true }, { t: "About us" }, { t: "Contact us" }],
    },
    { h: "Product", l: [{ t: "Heron Chat Widget" }, { t: "Heron Dashboard" }, { t: "Pricing" }] },
    { h: "Resources", l: [{ t: "Insights" }, { t: "AI Practices" }, { t: "Design Workflows" }] },
  ];
  return (
    <footer className="border-t border-rule">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div className="px-6 py-12 md:px-10">
          <p className="font-display max-w-xs text-[26px] leading-[1.02] font-semibold uppercase">
            An AI agent that works inside your design tools
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.h} className="border-t border-rule px-6 py-12 lg:border-t-0 lg:border-l md:px-8">
            <span className="label-tech">{col.h}</span>
            <ul className="mt-5 space-y-2.5">
              {col.l.map((x) => (
                <li key={x.t}>
                  <a
                    href="#top"
                    className={`text-sm transition-colors hover:text-signal ${x.red ? "text-signal" : ""}`}
                  >
                    {x.t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex items-center justify-center border-t border-rule px-6 py-12 lg:border-t-0 lg:border-l">
          <svg viewBox="0 0 32 32" className="h-32 w-32 text-ink" aria-hidden>
            <path
              d="M6 9 L13 5.5 V13 L19 10 V6.5 L26 10 V26.5 L19 23 V15.5 L13 18.5 V26 L6 22.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <path d="M13 13 L19 16 M13 18.5 L19 15.5" fill="none" stroke="currentColor" strokeWidth="0.9" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 border-t border-rule md:grid-cols-2 lg:grid-cols-4">
        <div className="px-6 py-8 md:px-10">
          <span className="label-tech">Subscribe</span>
          <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
            Want to see more cool websites like this? Sign up for occasional updates from Heron.
          </p>
          <form
            className="mt-4 flex max-w-[280px] border border-rule"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSent(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={sent ? "Thanks for signing up" : "Enter your email"}
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" aria-label="Subscribe" className="border-l border-rule px-3.5 transition-colors hover:bg-ink hover:text-primary-foreground">
              &#8594;
            </button>
          </form>
        </div>
        <div className="border-t border-rule px-6 py-8 md:border-t-0 md:border-l md:px-8">
          <span className="label-tech">Address</span>
          <p className="mt-4 text-sm leading-relaxed">
            60 Martin Pl, Sydney,
            <br />
            NSW 2000, Australia
          </p>
          <span className="mt-3 block font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Direction
          </span>
        </div>
        <div className="border-t border-rule px-6 py-8 lg:border-t-0 lg:border-l md:px-8">
          <span className="label-tech">New business</span>
          <p className="mt-4 text-sm">business@heronaiapp.com</p>
          <span className="label-tech mt-6 block">General inquiries</span>
          <p className="mt-3 text-sm">hello@heronaiapp.com</p>
        </div>
        <div className="border-t border-rule px-6 py-8 lg:border-t-0 lg:border-l md:px-8">
          <span className="label-tech">Social</span>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {["Website", "Dribbble", "FWA", "Awwwards", "Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#top" className="transition-colors hover:text-signal">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <FooterWordmark />

      <div className="flex flex-col gap-3 border-t border-rule px-6 py-5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase md:flex-row md:items-center md:justify-between md:px-10">
        <span>&copy;2026 Heron AI. All Rights Reserved.</span>
        <span className="flex gap-7">
          <a href="#top" className="hover:text-ink">Privacy Policy</a>
          <a href="#top" className="hover:text-ink">Terms &amp; Conditions</a>
          <a href="#top" className="hover:text-ink">Cookie Policy</a>
        </span>
      </div>
    </footer>
  );
}
