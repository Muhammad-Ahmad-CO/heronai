import { useEffect, useState } from "react";

const links = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#why" },
  { label: "About", href: "#intro" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-rule transition-colors ${
        scrolled ? "bg-paper/92 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-stretch justify-between">
        <a href="#top" className="flex items-center gap-3 px-5 py-4">
          <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
            <path
              d="M6 9 L13 5.5 V13 L19 10 V6.5 L26 10 V26.5 L19 23 V15.5 L13 18.5 V26 L6 22.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M13 13 L19 16 M13 18.5 L19 15.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight uppercase">
            Heron AI
          </span>
        </a>

        <nav className="hidden items-stretch md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="flex items-center border-l border-rule px-7 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-ink hover:text-primary-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="flex items-center gap-3 border-l border-rule px-7 font-mono text-[11px] uppercase tracking-[0.16em] text-signal transition-colors hover:bg-signal hover:text-accent-foreground"
          >
            Contact us <span>&#8594;</span>
          </a>
        </nav>

        <a
          href="#contact"
          className="flex items-center px-5 font-mono text-[11px] uppercase tracking-[0.16em] text-signal md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
