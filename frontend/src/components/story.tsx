"use client";

import { useState } from "react";

import { cn } from "../lib/utils";
import { useScrollProgress } from "../lib/motion";
import { CountUp, Reveal, Stagger } from "./motion";
import { Badge, Button, Card } from "./ui";

/**
 * The scroll narrative: how one clause in a specification becomes a dated
 * consequence.
 *
 * This exists because the product's central claim is a *chain*, and a dashboard
 * of panels shows the links without showing that they connect. The story is the
 * argument; the dashboard is the evidence.
 *
 * Every figure here is drawn from the seeded synthetic scenario rather than
 * invented for the page, and the panel says so. A narrative built on numbers a
 * reader cannot go and check is a brochure.
 */

const CHAIN = [
  {
    key: "deviation",
    stage: "Specification",
    headline: "A clause is missed",
    body: "The specification requires 65 kAIC interrupting rating. The vendor submittal offers 50 kAIC. Nothing in the document says it is short - the comparison has to be made.",
    metric: { value: 50, unit: " kAIC", label: "Offered", target: "65 kAIC required" },
    tone: "critical" as const,
  },
  {
    key: "vendor",
    stage: "Procurement",
    headline: "It becomes a resubmission",
    body: "A rating that does not meet the requirement is not a paperwork problem. The equipment has to be re-offered, and the clock on the replacement starts from that decision.",
    metric: { value: 1, unit: "", label: "Resubmission", target: "Vendor re-offer required" },
    tone: "serious" as const,
  },
  {
    key: "delivery",
    stage: "Delivery",
    headline: "The delivery date moves",
    body: "The replacement carries its own lead time. The forecast arrival moves out, and the delivery milestone that everything downstream depends on moves with it.",
    metric: { value: 35, unit: " days", label: "Forecast delay", target: "Against a dated milestone" },
    tone: "critical" as const,
  },
  {
    key: "schedule",
    stage: "Schedule",
    headline: "Float absorbs what it can",
    body: "Some of the delay is absorbed by float. What is left propagates along the dependency chain to installation, energization and the integrated systems test.",
    metric: { value: 28, unit: " days", label: "Critical-path exposure", target: "After float is consumed" },
    tone: "critical" as const,
  },
  {
    key: "commissioning",
    stage: "Commissioning",
    headline: "Readiness falls",
    body: "Readiness is not a status somebody types in. It is computed from the procedures that can be completed, and it falls when the equipment they depend on is not there.",
    metric: { value: 45, unit: "", label: "Readiness score", target: "Deterministic, from rules" },
    tone: "warning" as const,
  },
  {
    key: "decision",
    stage: "Decision",
    headline: "A person decides",
    body: "Atlas produces the options and the evidence behind each. It does not approve anything. The approved record is created by a reviewer, and it is marked as theirs.",
    metric: { value: 3, unit: "", label: "Mitigation options", target: "Awaiting human decision" },
    tone: "good" as const,
  },
];

const TONE_RING = {
  critical: "ring-status-critical/30",
  serious: "ring-status-serious/30",
  warning: "ring-status-warning/40",
  good: "ring-status-good/30",
};
const TONE_PIP = {
  critical: "bg-status-critical",
  serious: "bg-status-serious",
  warning: "bg-status-warning",
  good: "bg-status-good",
};
const TONE_BADGE = { critical: "red", serious: "serious", warning: "amber", good: "green" } as const;

/* ── hero ─────────────────────────────────────────────────────────────────── */

export function StoryHero({ onEnter, entering }: { onEnter: () => void; entering?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-bloom text-white">
      {/* Drafting grid, faint, on the navy ground. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(90% 70% at 30% 10%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(90% 70% at 30% 10%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-shell px-6 pb-20 pt-16 sm:pb-24 sm:pt-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-label uppercase text-sky-200 ring-1 ring-inset ring-white/15">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-signal-hi" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-signal-hi" />
            </span>
            EPC project intelligence · synthetic demo data
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl text-display-sm font-semibold text-white sm:text-display lg:text-display-lg">
            A clause in a specification is not a document problem.
            <span className="block text-sky-300/90">It is a date.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-prose text-base leading-7 text-sky-100/80 sm:text-lg">
            Project Atlas follows one technical deviation through procurement, schedule and
            commissioning, and stops at the person who has to decide. Every step carries the
            document, page and clause it came from.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" variant="signal" onClick={onEnter} loading={entering}>
              Open the workspace
              <span aria-hidden="true" className="transition-crisp group-hover:translate-x-0.5">
                →
              </span>
            </Button>
            <a
              href="#chain"
              className="inline-flex h-11 items-center rounded-md px-4 text-[0.95rem] font-medium text-sky-100/90 ring-1 ring-inset ring-white/20 transition-crisp hover:bg-white/10 hover:text-white"
            >
              See how the chain works
            </a>
          </div>
        </Reveal>

        {/* Headline figures from the seeded scenario. */}
        <Stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-4" step={90}>
          {[
            { value: 35, unit: " days", label: "Forecast delivery delay" },
            { value: 28, unit: " days", label: "Critical-path exposure" },
            { value: 45, unit: "", label: "Commissioning readiness" },
            { value: 27, unit: "", label: "Documents in evidence" },
          ].map((item) => (
            <div key={item.label} className="bg-navy/60 px-4 py-5 backdrop-blur-sm">
              <p className="text-figure font-semibold leading-none text-white">
                <CountUp value={item.value} />
                <span className="text-lg font-medium text-sky-300/80">{item.unit}</span>
              </p>
              <p className="mt-2 font-mono text-label uppercase text-sky-200/70">{item.label}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── the chain ────────────────────────────────────────────────────────────── */

/**
 * Sticky-scroll narrative.
 *
 * The rail on the left tracks scroll progress exactly, so the reader always
 * knows where they are in the argument. On narrow screens the sticky column is
 * dropped entirely and the steps simply stack - a sticky element taller than a
 * phone viewport traps the content behind it.
 */
export function StoryChain() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const [open, setOpen] = useState<string | null>(CHAIN[0].key);

  // Which step the rail has reached. Kept slightly ahead of raw progress so the
  // marker arrives as the step becomes readable rather than after it.
  const reached = Math.min(CHAIN.length - 1, Math.floor(progress * CHAIN.length * 1.15));

  return (
    <section id="chain" ref={ref} className="mx-auto max-w-shell scroll-mt-20 px-6 py-20 sm:py-28">
      <Reveal className="max-w-prose">
        <p className="font-mono text-label uppercase text-signal">The impact chain</p>
        <h2 className="mt-2 text-display-sm font-semibold tracking-tight text-ink sm:text-display">
          Six steps, each one cited
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          The figures below come from the seeded SWGR-A scenario in this deployment. They are
          synthetic and deliberately planted, so the chain can be checked end to end rather than
          demonstrated on a slide.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ol className="space-y-3">
          {CHAIN.map((step, index) => {
            const isOpen = open === step.key;
            return (
              <Reveal as="li" key={step.key} delay={index * 40}>
                <Card
                  className={cn(
                    "transition-base ease-settle",
                    isOpen ? cn("ring-2", TONE_RING[step.tone]) : "hover:border-slate-300",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : step.key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 text-left"
                  >
                    <span className="mt-0.5 flex shrink-0 items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={cn("h-2 w-2 rounded-full", TONE_PIP[step.tone])}
                      />
                      <span className="font-mono text-label tabular text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-label uppercase text-signal">{step.stage}</span>
                        <Badge tone={TONE_BADGE[step.tone]} dot>
                          {step.metric.label}
                        </Badge>
                      </span>
                      <span className="mt-1 block text-base font-semibold text-ink">{step.headline}</span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-base ease-settle",
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-2 block max-w-prose text-sm leading-6 text-muted">
                            {step.body}
                          </span>
                        </span>
                      </span>
                    </span>

                    <span className="shrink-0 text-right">
                      <span className="tabular block text-xl font-semibold leading-none text-ink">
                        <CountUp value={step.metric.value} />
                        <span className="text-sm font-medium text-muted">{step.metric.unit}</span>
                      </span>
                      <span className="mt-1 block text-xs text-muted">{step.metric.target}</span>
                    </span>
                  </button>
                </Card>
              </Reveal>
            );
          })}
        </ol>

        {/* Progress rail. Decorative - the list above is the content - so it is
            hidden from assistive technology and from narrow layouts. */}
        <aside aria-hidden="true" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="font-mono text-label uppercase text-muted">Propagation</p>
            <div className="mt-4 flex gap-4">
              <div className="relative w-px bg-slate-200">
                <div
                  className="absolute inset-x-0 top-0 bg-signal transition-[height] duration-base ease-swap"
                  style={{ height: `${((reached + 1) / CHAIN.length) * 100}%` }}
                />
              </div>
              <ul className="flex-1 space-y-6">
                {CHAIN.map((step, index) => (
                  <li
                    key={step.key}
                    className={cn(
                      "transition-base ease-swap",
                      index <= reached ? "text-ink opacity-100" : "text-muted opacity-45",
                    )}
                  >
                    <p className="text-sm font-semibold leading-5">{step.stage}</p>
                    <p className="tabular mt-0.5 text-xs text-muted">
                      {step.metric.value}
                      {step.metric.unit} · {step.metric.label.toLowerCase()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ── what it refuses to do ────────────────────────────────────────────────── */

const GUARDRAILS = [
  {
    title: "Arithmetic is code, not a model",
    body: "Delay days, unit conversions, pass/fail and readiness scores are computed in Python. A language model is asked to understand the question and explain the result, never to do the sums.",
  },
  {
    title: "No evidence, no answer",
    body: "An answer with no supporting document returns INSUFFICIENT_EVIDENCE rather than a confident guess. Generated claims are checked against the retrieved spans before they are shown.",
  },
  {
    title: "Approvals belong to people",
    body: "Every AI output is a suggestion. Reviewer decisions and commissioning records are separate, attributed, and the only things treated as approved.",
  },
  {
    title: "Synthetic data, labelled",
    body: "The corpus is fictional and marked on every document. Nothing here reproduces a real standard, vendor, or project, and simulated figures are never presented as measured.",
  },
];

export function StoryGuardrails() {
  return (
    <section className="border-y border-hairline bg-white">
      <div className="mx-auto max-w-shell px-6 py-20 sm:py-24">
        <Reveal className="max-w-prose">
          <p className="font-mono text-label uppercase text-signal">Guardrails</p>
          <h2 className="mt-2 text-display-sm font-semibold tracking-tight text-ink sm:text-display">
            What it deliberately will not do
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            In engineering, a confident wrong answer is worse than no answer. These are constraints
            in the code, not intentions.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2" step={80}>
          {GUARDRAILS.map((item) => (
            <Card key={item.title} interactive className="group h-full">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-signal-soft text-sm font-bold text-signal transition-base group-hover:bg-signal group-hover:text-white"
                >
                  ✓
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{item.body}</p>
                </div>
              </div>
            </Card>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function StoryClose({ onEnter, entering }: { onEnter: () => void; entering?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-bloom text-white">
      <span aria-hidden="true" className="absolute inset-0 animate-shimmer bg-signal-sheen opacity-40" />
      <div className="relative mx-auto max-w-shell px-6 py-20 text-center sm:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-display-sm font-semibold sm:text-display">
            The chain is inspectable. Go and check it.
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-base leading-7 text-sky-100/80">
            Open the workspace and follow SWGR-A from the clause to the decision. Every figure links
            back to the document, page and section it came from.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="signal" onClick={onEnter} loading={entering}>
              Open the workspace
              <span aria-hidden="true" className="transition-crisp group-hover:translate-x-0.5">
                →
              </span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
