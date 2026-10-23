import React from "react";
import type { Block } from "@/lib/blog";
import { Icon } from "@/components/ui/Icon";

/** Soporta **negritas** dentro del texto de los bloques. */
function inline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((chunk, i) =>
    chunk.startsWith("**") && chunk.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[var(--text)]">
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{chunk}</React.Fragment>
    )
  );
}

export function PostBlocks({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="font-heading text-2xl lg:text-3xl font-bold text-[var(--text)] mt-6 scroll-mt-24"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={i}
                className="font-heading text-lg lg:text-xl font-semibold text-[var(--text)] mt-3 scroll-mt-24"
              >
                {block.text}
              </h3>
            );

          case "p":
            return (
              <p key={i} className="text-[var(--text-muted)] text-base leading-[1.75]">
                {inline(block.text)}
              </p>
            );

          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2.5 list-none">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--text-muted)] text-base leading-[1.7]">
                    <span className="text-[var(--color-primary)] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-2.5 list-none">
                {block.items.map((item, n) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--text-muted)] text-base leading-[1.7]">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: "var(--color-primary)" }}
                    >
                      {n + 1}
                    </span>
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-2 pl-5 py-1 border-l-4"
                style={{ borderColor: "var(--color-primary)" }}
              >
                <p className="text-[var(--text)] text-lg italic leading-relaxed">“{block.text}”</p>
                {block.author && (
                  <footer className="text-[var(--text-muted)] text-sm mt-2">— {block.author}</footer>
                )}
              </blockquote>
            );

          case "callout":
            return (
              <aside
                key={i}
                className="rounded-2xl p-5 my-2 flex items-start gap-4"
                style={{
                  background: "var(--tint)",
                  border:     "1px solid var(--border)",
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                  style={{ background: "var(--card)", color: "var(--accent-ink)" }}
                >
                  <Icon name={block.icon ?? "bulb"} size={18} />
                </span>
                <div>
                  <p className="font-heading font-semibold mb-1" style={{ color: "var(--text)" }}>{block.title}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{inline(block.text)}</p>
                </div>
              </aside>
            );
        }
      })}
    </div>
  );
}
