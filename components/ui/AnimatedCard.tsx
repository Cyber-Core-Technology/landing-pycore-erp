"use client";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  glow?: boolean;
}

export function AnimatedCard({ children, delay = 0, className, glow }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        "bg-[var(--card)] border border-[var(--border)] rounded-[16px] p-6",
        "transition-shadow duration-300",
        glow && "dark:shadow-[0_0_16px_rgba(14,124,102,0.35)] hover:dark:shadow-[0_0_32px_rgba(14,124,102,0.45)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
