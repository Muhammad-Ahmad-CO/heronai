import { useState } from "react";
import tower from "@/assets/tower-wireframe.avif.asset.json";
import floorplan from "@/assets/floorplan-widget.jpg.asset.json";
import dashboard from "@/assets/dashboard.webp.asset.json";
import collage1 from "@/assets/collage-1.jpg.asset.json";
import collage2 from "@/assets/collage-2.jpg.asset.json";
import collage3 from "@/assets/collage-3.jpg.asset.json";
import collage4 from "@/assets/collage-4.jpg.asset.json";
import { ArrowLink, Cross, Label, Section } from "./primitives";

/* ---------------------------------------------------------------- marquee */

export function Marquee() {
  const items = ["Faster iterations", "Fewer mistakes", "Less busywork"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-rule bg-ink py-3">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
          >
            {t} <span className="text-signal">&#9632;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- statement */

export function Statement() {
  return (
    <Section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative min-h-[320px] overflow-hidden border-b border-rule lg:border-b-0 lg:border-r">
        <img
          src={tower.url}
          alt="Wireframe perspective of a high-rise concrete tower"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-0 top-0 h-40 w-40 -translate-x-1/3 -translate-y-1/3 rounded-full bg-signal mix-blend-multiply" />
      </div>
      <div className="flex flex-col justify-center gap-8 px-5 py-14 md:px-10">
        <p className="display-lg max-w-xl">
          The repetitive parts of modeling shouldn&rsquo;t eat your day. Heron handles the fiddly,
          manual work so you can stay focused on the design, not the software.
        </p>
        <ArrowLink href="#product">Learn more</ArrowLink>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- clients */

export function Clients() {
  const names = ["Pinecrest", "Vertex", "Halcyon", "Verdant", "Northbridge", "Atlas Works"];
  return (
    <Section>
      <div className="flex items-center gap-6 border-b border-rule px-5 py-3">
        <Label>Clients</Label>
      </div>
      <div className="grid grid-cols-2 divide-x divide-rule border-b border-rule md:grid-cols-6">
        {names.map((n) => (
          <div
            key={n}
            className="flex items-center justify-center px-4 py-10 font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-ink"
          >
            {n}
          </div>
        ))}
      </div>
      <p className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        Works natively inside the tools you already use, including Revit, Rhino, ArchiCAD and
        SketchUp.
      </p>
    </Section>
  );
}

/* --------------------------------------------------------------- problems */

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
      <div className="grid grid-cols-1 divide-y divide-rule border-t border-rule md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {problems.map((p) => (
          <article
            key={p.n}
            className="group relative flex min-h-[260px] flex-col justify-between gap-8 p-6 transition-colors hover:bg-paper-deep md:border-r md:border-rule"
          >
            <div className="flex items-center justify-between">
              <Label>{p.tag}</Label>
              <span className="font-mono text-[10px] text-signal">{p.n}</span>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold uppercase leading-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ introduction */

const introSteps = [
  "Architects spend hours on manual modelling, coordination, and cleanup, work that pulls focus away from the actual design.",
  "Most of it is repetitive and rule-based, the kind of task that shouldn't need a person doing it by hand every time.",
  "Heron works inside your design tool as an agent that sees your model, flags issues, and makes edits on your approval.",
];

export function Introduction() {
  return (
    <Section id="intro" className="overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 blueprint opacity-60" />
        <div className="relative grid grid-cols-1 gap-10 px-5 py-20 md:px-10 lg:grid-cols-[320px_1fr] lg:py-28">
          <div className="space-y-4">
            <div className="border border-ink bg-ink px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground">
                Introduction
              </span>
            </div>
            {introSteps.map((s, i) => (
              <div key={i} className="border border-rule bg-card p-4">
                <p className="text-sm leading-relaxed">{s}</p>
                <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  [{i === introSteps.length - 1 ? "End of sequence" : "Scroll to continue"}]
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <p className="display-xl text-center text-muted-foreground/45">
              For the whole
              <br />
              design
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- violations */

const codeCards = [
  {
    code: "IBC 1017.2",
    title: "Exit access travel distance",
    body: "Assembly occupancies without sprinklers are limited to 75 ft of exit travel distance. This layout exceeds the maximum allowable path length.",
  },
  {
    code: "IBC 1010.1.2.1",
    title: "Door swing direction",
    body: "Egress doors serving an occupant load of 50 or more must swing in the direction of exit travel.",
  },
  {
    code: "ICC A117.1 §604.3.1",
    title: "Accessible toilet clearance",
    body: "Accessible restrooms require a 60\u201d turning radius. This layout does not provide sufficient maneuvering space.",
  },
];

export function Violations() {
  const [i, setI] = useState(0);
  const card = codeCards[i]!;
  return (
    <Section id="violations">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative border-b border-rule lg:border-b-0 lg:border-r">
          <img
            src={floorplan.url}
            alt="Office floor plan with code violations highlighted by Heron"
            className="h-full w-full object-cover"
          />
          {[
            { x: 26, y: 30 },
            { x: 58, y: 62 },
            { x: 78, y: 24 },
          ].map((p, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label={`Show violation ${codeCards[idx]?.code}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 border p-1 transition-colors ${
                i === idx ? "border-signal bg-signal" : "border-ink/40 bg-paper"
              }`}
            >
              <span
                className={`block h-2 w-2 ${i === idx ? "bg-paper" : "bg-signal signal-dot"}`}
              />
            </button>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10">
          <div>
            <Label>Right there with you</Label>
            <h2 className="display-lg mt-5">Click and drag your mouse to see violations</h2>
          </div>
          <div className="relative border border-ink bg-card p-5">
            <Cross className="-left-1.5 -top-1.5" />
            <Cross className="-right-1.5 -bottom-1.5" />
            <span className="font-mono text-[11px] tracking-[0.14em] text-signal">{card.code}</span>
            <h3 className="mt-2 font-display text-lg font-semibold uppercase">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- product */

export function Product() {
  return (
    <Section id="product">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b border-rule p-6 md:p-10 lg:border-b-0 lg:border-r">
          <Label>Run an agent natively in your model</Label>
          <h2 className="display-lg mt-5 max-w-lg">Your model. Your tools. Connected.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Heron runs inside the design software you already use. It reads your model, understands
            what you&rsquo;re working on, and can make changes directly, with every action shown to
            you first so nothing happens without your say-so.
          </p>
          <ul className="mt-8 divide-y divide-rule border-y border-rule">
            {[
              "Works with Revit, Rhino, ArchiCAD, SketchUp.",
              "Understands your geometry and intent.",
              "Suggests fixes while you work.",
              "Edits automatically after your approval.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-4 py-4">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-signal" />
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-rows-2 divide-y divide-rule">
          {[
            {
              n: "[01]",
              title: "Heron Chat widget",
              body: "A chat that floats over your design tool. Ask it about your model or tell it what to change, and it acts inside the software on your approval.",
              img: floorplan.url,
              alt: "Heron chat widget floating over an office floor plan",
            },
            {
              n: "[02]",
              title: "Heron Dashboard",
              body: "Ask code questions about your building and get answers that reflect how the code applies to your layout, occupancy, and conditions.",
              img: dashboard.url,
              alt: "Heron dashboard showing building code answers",
            },
          ].map((c) => (
            <article key={c.n} className="group flex flex-col">
              <div className="overflow-hidden border-b border-rule bg-paper-deep">
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                <div>
                  <span className="font-mono text-[10px] text-signal">{c.n}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold uppercase">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
                <ArrowLink href="#contact">Learn more</ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------- why */

const pillars = [
  { t: "Observe", b: "Heron watches your model as you design." },
  { t: "Advise", b: "It flags issues and suggests fixes in plain language." },
  { t: "Act", b: "With your approval, it makes the edit directly in the model." },
  { t: "Learn", b: "It picks up your firm's standards and gets more useful over time." },
];

export function Why() {
  return (
    <Section id="why">
      <div className="grid grid-cols-1 gap-8 px-5 py-14 md:px-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Label>Why us</Label>
          <h2 className="display-lg mt-5 max-w-2xl">Built to work the way you do</h2>
        </div>
        <p className="max-w-md self-end text-sm leading-relaxed text-muted-foreground">
          Heron fits into your process instead of replacing it. It watches quietly, speaks up when
          something needs attention, and only acts when you say so, so you stay in control the whole
          way through.
        </p>
      </div>
      <div className="grid grid-cols-1 divide-y divide-rule border-t border-rule sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {pillars.map((p, i) => (
          <div key={p.t} className="p-6">
            <span className="font-mono text-[10px] text-signal">[0{i + 1}]</span>
            <h3 className="mt-3 font-display text-2xl font-semibold uppercase">{p.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.b}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- use cases */

const cases = [
  {
    t: "Architects",
    b: "Hand the repetitive modelling to Heron and keep your focus on design.",
    img: collage1.url,
  },
  {
    t: "Interior Designers",
    b: "Get quick help with layouts, fixtures, and clearances without leaving your model.",
    img: collage2.url,
  },
  {
    t: "Landscape Architects",
    b: "Sort grading, site elements, and layouts without the manual grind.",
    img: collage3.url,
  },
  {
    t: "Engineers",
    b: "Run discipline-specific checks and edits in the model, so coordination issues surface earlier.",
    img: collage4.url,
  },
  {
    t: "BIM Managers",
    b: "Keep models clean and on-standard with an agent that knows your firm's rules.",
    img: collage2.url,
  },
  {
    t: "Drafters",
    b: "Skip the tedious drawing cleanup and let Heron handle the repeatable parts.",
    img: collage3.url,
  },
  {
    t: "Design Leads",
    b: "Keep quality and standards consistent across everyone's work.",
    img: collage1.url,
  },
  {
    t: "Small Firms",
    b: "Get the output of a bigger team without adding headcount.",
    img: collage4.url,
  },
];

export function UseCases() {
  const [open, setOpen] = useState(3);
  const current = cases[open] ?? cases[0]!;
  return (
    <Section id="use-cases">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[360px] border-b border-rule lg:border-b-0 lg:border-r">
          <img
            src={current.img}
            alt={`Architectural collage representing ${current.t}`}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-2 left-3 font-mono text-[10px] text-muted-foreground">
            [0,246]
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
          <div className="divide-y divide-rule border-t border-rule">
            {cases.map((c, i) => (
              <button
                key={c.t}
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen(i)}
                className="flex w-full items-start justify-between gap-6 px-6 py-4 text-left transition-colors hover:bg-paper-deep md:px-10"
              >
                <span className="flex-1">
                  <span className="block font-display text-lg font-semibold uppercase">{c.t}</span>
                  {open === i && (
                    <span className="mt-2 block max-w-md text-sm leading-relaxed text-muted-foreground">
                      {c.b}
                    </span>
                  )}
                </span>
                <span className="mt-1 font-mono text-sm text-signal">{open === i ? "−" : "+"}</span>
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
      <div className="relative flex flex-col items-center gap-6 px-5 py-24 text-center">
        <h2 className="display-lg max-w-2xl">See what Heron can do in your model</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Book a demo and we&rsquo;ll show Heron working inside one of your own projects.
        </p>
        <ArrowLink href="mailto:hello@heronaiapp.com" variant="solid">
          Contact us
        </ArrowLink>
      </div>
      <div className="relative border-t border-rule">
        <img
          src={collage3.url}
          alt="Concrete architecture illustration with a red sun"
          loading="lazy"
          className="h-72 w-full object-cover object-top"
        />
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- footer */

export function Footer() {
  return (
    <footer className="border-t border-rule bg-ink text-primary-foreground">
      <div className="grid grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4 md:px-10">
        {[
          { h: "Company", l: ["Home", "About us", "Contact us"] },
          { h: "Product", l: ["Heron Chat Widget", "Heron Dashboard", "Pricing"] },
          { h: "Resources", l: ["Insights", "AI Practices", "Design Workflows"] },
          { h: "Social", l: ["Instagram", "LinkedIn", "Dribbble"] },
        ].map((col) => (
          <div key={col.h}>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground/50">
              {col.h}
            </span>
            <ul className="mt-4 space-y-2">
              {col.l.map((x) => (
                <li key={x}>
                  <a href="#top" className="text-sm transition-colors hover:text-signal">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/15 px-6 py-10 md:px-10">
        <p className="display-lg max-w-3xl text-primary-foreground">
          An AI agent that works inside your design tools
        </p>
      </div>
      <div className="flex flex-col gap-3 border-t border-primary-foreground/15 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-foreground/60 md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 Heron AI. All rights reserved.</span>
        <span>1801 California St. Suite 2400, Denver, CO 80202 — hello@heronaiapp.com</span>
      </div>
    </footer>
  );
}
