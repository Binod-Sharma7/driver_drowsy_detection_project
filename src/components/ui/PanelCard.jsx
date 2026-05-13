import React from "react";
import { motion } from "framer-motion";

export default function PanelCard({
  title,
  value,
  detail,
  icon,
  status,
  className,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className={`group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(15,23,42,0.12)] transition-all duration-300 ${
        className || ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500">
            {title}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
              {icon}
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{value}</p>
              {detail ? (
                <p className="text-sm text-slate-400">{detail}</p>
              ) : null}
            </div>
          </div>
        </div>

        {status ? (
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] ${
              status === "online"
                ? "bg-emerald-500/15 text-emerald-300"
                : status === "offline"
                ? "bg-rose-500/15 text-rose-300"
                : "bg-slate-500/15 text-slate-300"
            }`}
          >
            {status}
          </span>
        ) : null}
      </div>

      {children}
    </motion.div>
  );
}
