import type { ReactNode } from "react";

export function Cross({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-3 w-3 text-signal ${className}`}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current opacity-60" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current opacity-60" />
    </span>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <span className="label-tech">{children}</span>;
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative border-t border-rule ${className}`}>
      {children}
    </section>
  );
}

export function ArrowLink({
  children,
  href = "#contact",
  variant = "outline",
}: {
  children: ReactNode;
  href?: string;
  variant?: "outline" | "solid";
}) {
  const base =
    "group inline-flex items-center gap-6 border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors";
  const styles =
    variant === "solid"
      ? "border-signal bg-signal text-accent-foreground hover:bg-ink hover:border-ink"
      : "border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-primary-foreground";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
      <span className="transition-transform group-hover:translate-x-1">&#8594;</span>
    </a>
  );
}
