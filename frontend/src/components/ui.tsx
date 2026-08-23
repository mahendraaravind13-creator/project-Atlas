import type { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "../lib/utils";

const field =
  "h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-ink shadow-[inset_0_1px_0_rgba(11,31,54,.03)] " +
  "outline-none transition placeholder:text-slate-400 hover:border-slate-400 " +
  "focus:border-signal focus:ring-2 focus:ring-signal/25 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={cn("rounded-xl border border-slate-200/90 bg-white p-4 shadow-card", className)}>
      {children}
    </section>
  );
}

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" }) {
  const styles = {
    primary: "bg-navy text-white shadow-card hover:bg-navy-hi active:bg-navy",
    secondary: "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 active:bg-slate-100",
    danger: "bg-rose-700 text-white shadow-card hover:bg-rose-800 active:bg-rose-900",
  };
  return (
    <button
      className={cn(
        "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3.5 text-sm font-medium",
        "transition disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(field, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(field, "min-h-20 h-auto py-2 leading-6", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(field, "cursor-pointer pr-8", className)} {...props} />;
}

export function Badge({ children, tone = "slate" }: PropsWithChildren<{ tone?: "slate" | "green" | "amber" | "red" | "blue" }>) {
  const styles = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    green: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    amber: "bg-amber-50 text-amber-900 ring-amber-200",
    red: "bg-rose-50 text-rose-800 ring-rose-200",
    blue: "bg-sky-50 text-sky-800 ring-sky-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
        styles[tone],
      )}
    >
      {children}
    </span>
  );
}
