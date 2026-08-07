import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";

export function HowIWork({dict}: {dict: Dictionary["howIWork"]}) {
  return (
    <section id="como-trabajo" className="blueprint-grid border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {dict.eyebrow} 
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-tight text-fg">
            {dict.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {dict.steps.map((step, i) => (
            <Reveal key={step.title} delay={0.06 * i} className="bg-bg p-8">
              <span className="font-mono text-xs text-fg-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-medium text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
