import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f6f9",
        ink: "#172235",
        navy: "#0b1f36",
        // Slightly deeper than navy, for hover on navy surfaces.
        "navy-hi": "#14375f",
        signal: "#1f8a70",
        "signal-soft": "#e7f2ef",
        // Muted body text that still holds contrast on canvas.
        muted: "#5a6879",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
      fontSize: {
        // Uppercase micro-labels used on metric cells and table headers.
        label: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.07em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,54,.05), 0 1px 3px rgba(11,31,54,.04)",
        "card-hover": "0 2px 4px rgba(11,31,54,.06), 0 8px 20px rgba(11,31,54,.07)",
        drawer: "-12px 0 40px rgba(11,31,54,.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
