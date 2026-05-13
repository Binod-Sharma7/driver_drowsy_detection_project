import React from "react";

export default function SectionHeader({
  badge,
  title,
  accent,
  description,
}) {
  return (
    <div className="max-w-2xl">
      {badge ? (
        <p className="text-[11px] uppercase tracking-[0.36em] text-cyan-300/80">
          {badge}
        </p>
      ) : null}

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title} <span className="text-cyan-300">{accent}</span>
      </h1>

      {description ? (
        <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
