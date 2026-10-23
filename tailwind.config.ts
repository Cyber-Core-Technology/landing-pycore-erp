import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary:       "var(--color-primary)",
        secondary:     "var(--color-secondary)",
        "accent-soft": "var(--color-accent-soft)",
        success:       "var(--color-success)",
        warning:       "var(--color-warning)",
        error:         "var(--color-error)",
        info:          "var(--color-info)",

        brand:         "var(--brand)",
        "brand-fg":    "var(--brand-fg)",
        accent:        "var(--accent)",
        "accent-fg":   "var(--accent-fg)",
        "accent-ink":  "var(--accent-ink)",
        tint:          "var(--tint)",

        warm:              "var(--warm)",
        "warm-fg":         "var(--warm-fg)",
        "warm-ink":        "var(--warm-ink)",
        "warm-strong":     "var(--warm-strong)",
        "warm-tint":       "var(--warm-tint)",
        "warm-tint-border":"var(--warm-tint-border)",

        bg:            "var(--bg)",
        card:          "var(--card)",
        "surface-2":   "var(--surface-2)",
        "text-base":   "var(--text)",
        "text-2":      "var(--text-2)",
        "text-3":      "var(--text-3)",
        "text-muted":  "var(--text-muted)",
        border:        "var(--border)",
        chip:          "var(--chip)",
        "chip-ink":    "var(--chip-ink)",
        btn2:          "var(--btn2)",
        "btn2-border": "var(--btn2-border)",

        band:           "var(--band)",
        "band-ink":     "var(--band-ink)",
        "band-ink-2":   "var(--band-ink-2)",
        "band-border":  "var(--band-border)",
        "band-eyebrow": "var(--band-eyebrow)",
        "band-tile":    "var(--band-tile)",
        "band-btn":     "var(--band-btn)",
        "band-btn-fg":  "var(--band-btn-fg)",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        btn:       "11px",
        card:      "18px",
        "card-lg": "22px",
      },
      boxShadow: {
        // El brochure es plano y aireado: elevación cálida discreta en vez de
        // halos verdes. Los nombres "glow-*" se conservan por compatibilidad.
        "card-sm":  "0 1px 2px rgba(28, 26, 23, 0.05)",
        "card-md":  "0 4px 16px rgba(28, 26, 23, 0.07)",
        "card-lg":  "0 12px 32px rgba(28, 26, 23, 0.09)",
        "glow-sm":  "0 0 16px rgba(14, 124, 102, 0.14)",
        "glow-md":  "0 0 32px rgba(14, 124, 102, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
