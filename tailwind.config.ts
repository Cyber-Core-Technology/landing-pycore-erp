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
        bg:            "var(--bg)",
        card:          "var(--card)",
        "text-base":   "var(--text)",
        "text-muted":  "var(--text-muted)",
        border:        "var(--border)",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card:    "16px",
        "card-lg": "20px",
      },
      boxShadow: {
        "glow-sm": "0 0 16px rgba(14, 124, 102, 0.35)",
        "glow-md": "0 0 32px rgba(14, 124, 102, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
