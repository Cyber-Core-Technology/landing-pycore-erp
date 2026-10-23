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
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      className={clsx(
        "rounded-card p-6",
        "transition-shadow duration-300",
        glow && "shadow-card-sm hover:shadow-card-lg dark:shadow-[0_2px_8px_rgba(0,0,0,0.30)] hover:dark:shadow-[0_18px_48px_rgba(0,0,0,0.42)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
