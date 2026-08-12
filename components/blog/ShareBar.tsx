"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  /** Ruta relativa del artículo, p. ej. /blog/mi-post */
  path:  string;
  title: string;
}

export function ShareBar({ path, title }: Props) {
  const [copied, setCopied] = useState(false);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pycore.app";
  const url     = `${siteUrl}${path}`;

  const targets = [
    {
      label: "WhatsApp",
      icon:  "💬",
      href:  `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      label: "LinkedIn",
      icon:  "💼",
      href:  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      icon:  "𝕏",
      href:  `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Facebook",
      icon:  "📘",
      href:  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles: no hacemos nada, quedan los otros botones.
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[var(--text-muted)] text-sm font-medium mr-1">Compartir:</span>

      {targets.map((t) => (
        <a
          key={t.label}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartir en ${t.label}`}
          title={`Compartir en ${t.label}`}
          className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-colors hover:border-[var(--color-primary)]"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <span aria-hidden="true">{t.icon}</span>
        </a>
      ))}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={copyLink}
        aria-label="Copiar enlace del artículo"
        className="h-10 rounded-full px-4 text-sm font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {copied ? "✓ Copiado" : "🔗 Copiar enlace"}
      </motion.button>
    </div>
  );
}
