"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="p-2.5 rounded-lg transition-colors hover:opacity-70"
      style={{
        border: "1px solid var(--btn2-border)",
        background: "var(--btn2)",
        color: "var(--text)",
      }}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}
