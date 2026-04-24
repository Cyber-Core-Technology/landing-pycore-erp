"use client";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  text: string;
  delay?: number;
}

export function ChatBubble({ text, delay = 0 }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-[#1BAE91]/30 flex items-center justify-center text-sm flex-shrink-0">
        👤
      </div>
      <div
        style={{
          background: "rgba(26,58,51,0.6)",
          border: "1px solid rgba(30,74,64,0.8)",
          borderRadius: "4px 16px 16px 16px",
          padding: "10px 14px",
          color: "#E6F2EE",
          fontSize: "14px",
          lineHeight: 1.5,
          maxWidth: "280px",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}
