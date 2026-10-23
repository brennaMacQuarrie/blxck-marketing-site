"use client";

import { useState } from "react";

type Props = {
  labels: string[];
  values: number[];
  /** Upper bound of the y-axis. */
  max: number;
  ticks: number[];
  /** CSS colour for the bars; defaults to the section accent. */
  color?: string;
  /** Indices to label directly above the bar. */
  highlight?: number[];
  /** Pre-built hover text per bar (server-safe: strings, not functions). */
  tooltips?: string[];
  /** Shade every month from `from` to the end and label it (e.g. a campaign going live). */
  band?: { from: number; label: string };
  ariaLabel: string;
};

const W = 560;
const H = 240;
const ML = 40;
const MR = 10;
const MT = 20;
const MB = 26;

/**
 * Minimal responsive bar chart (inline SVG, no library). One scale, thin
 * marks, recessive grid, hover tooltip. Renders fully static on the
 * server; interaction is progressive.
 */
export function MonthlyBars({
  labels,
  values,
  max,
  ticks,
  color = "var(--ac)",
  highlight = [],
  tooltips,
  band,
  ariaLabel,
}: Props) {
  const format = (v: number) => Math.round(v).toLocaleString("en-CA");
  const [hover, setHover] = useState<number | null>(null);
  const pw = W - ML - MR;
  const ph = H - MT - MB;
  const n = values.length;
  const slot = pw / n;
  const y = (v: number) => MT + ph - (v / max) * ph;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={ariaLabel}
        className="block h-auto w-full overflow-visible"
        onMouseLeave={() => setHover(null)}
      >
        {band && band.from < n && (
          <g>
            <rect
              x={ML + band.from * slot}
              y={MT}
              width={pw - band.from * slot}
              height={ph}
              fill={color}
              opacity={0.07}
              rx={3}
            />
            <line
              x1={ML + band.from * slot}
              x2={ML + band.from * slot}
              y1={MT}
              y2={MT + ph}
              stroke={color}
              strokeWidth={1}
              strokeDasharray="3 3"
              opacity={0.6}
            />
            <text
              x={ML + band.from * slot + 5}
              y={MT - 7}
              fontSize={10}
              fontWeight={600}
              letterSpacing={1}
              fill={color}
            >
              {band.label.toUpperCase()}
            </text>
          </g>
        )}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={ML}
              x2={W - MR}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--color-edge)"
              strokeWidth={1}
            />
            <text
              x={ML - 6}
              y={y(t) + 4}
              textAnchor="end"
              fontSize={11}
              fill="var(--color-lo)"
            >
              {t >= 1000 ? `${t / 1000}k` : t}
            </text>
          </g>
        ))}
        {values.map((v, i) => {
          const x = ML + i * slot + 1.5;
          const top = y(v);
          const isHot = hover === i;
          return (
            <g key={i}>
              {/* generous hit target */}
              <rect
                x={ML + i * slot}
                y={MT}
                width={slot}
                height={ph}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
              <rect
                x={x}
                y={top}
                width={slot - 3}
                height={Math.max(y(0) - top, 0)}
                rx={3}
                fill={color}
                opacity={hover === null || isHot ? 1 : 0.45}
                style={{ transition: "opacity .15s" }}
                pointerEvents="none"
              />
            </g>
          );
        })}
        {labels.map((m, i) =>
          i % 3 === 0 ? (
            <text
              key={m}
              x={ML + i * slot + slot / 2}
              y={H - 6}
              textAnchor="middle"
              fontSize={11}
              fill="var(--color-lo)"
            >
              {m}
            </text>
          ) : null,
        )}
        {highlight.map((i) => (
          <text
            key={`h${i}`}
            x={ML + i * slot + slot / 2}
            y={y(values[i]) - 8}
            textAnchor={i < 2 ? "start" : i > n - 3 ? "end" : "middle"}
            fontSize={12}
            fontWeight={700}
            fill="var(--color-gold)"
          >
            {format(values[i])}
          </text>
        ))}
      </svg>

      {hover !== null && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[115%] whitespace-nowrap rounded-md border border-white/[0.1] bg-void px-2.5 py-1.5 text-xs text-hi"
          style={{
            left: `${((ML + hover * slot + slot / 2) / W) * 100}%`,
            top: `${(y(values[hover]) / H) * 100}%`,
          }}
        >
          <span className="font-semibold" style={{ color }}>
            {labels[hover]}
          </span>
          <br />
          {tooltips ? tooltips[hover] : format(values[hover])}
        </div>
      )}
    </div>
  );
}
