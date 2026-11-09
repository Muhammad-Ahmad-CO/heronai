import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/heron/nav";
import { Hero } from "@/components/heron/hero";
import {
  AgentPanel,
  CTA,
  Clients,
  Footer,
  Introduction,
  Marquee,
  Problems,
  Showcases,
  Statement,
  UseCases,
  Why,
} from "@/components/heron/sections";
import { CursorTrail } from "@/components/heron/cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heron AI — AI agent inside Revit, Rhino & ArchiCAD" },
      {
        name: "description",
        content:
          "Heron AI reviews your BIM model, flags building code violations, and makes edits on your approval — inside Revit, Rhino, ArchiCAD and SketchUp.",
      },
      { property: "og:title", content: "Heron AI — AI agent inside your design tools" },
      {
        property: "og:description",
        content:
          "An AI agent that sees your model, spots code issues, and fixes them on approval without leaving your design software.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <CursorTrail />
      <Nav />
      <Hero />
      <Marquee />
      <Statement />
      <Clients />
      <Problems />
      <Introduction />
      <AgentPanel />
      <Showcases />
      <Why />
      <UseCases />
      <CTA />
      <Footer />
    </main>
  );
}
