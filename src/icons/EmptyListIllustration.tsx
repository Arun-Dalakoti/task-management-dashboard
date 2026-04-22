import { useId } from "react";
import type { IconProps } from "./types";

/**
 * Layered “empty list” art: soft glow, fanned blank cards, floating sheet —
 * no numeric “0”, clearly reads as “nothing here yet.”
 */
export function EmptyListIllustration({
  className = "",
  ...props
}: IconProps) {
  const id = useId().replace(/:/g, "");
  const glowId = `empty-hero-glow-${id}`;
  const cardSoftId = `empty-card-soft-${id}`;

  return (
    <svg
      className={className}
      viewBox="0 0 400 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient
          id={glowId}
          x1="80"
          y1="0"
          x2="320"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--ds-brand)" stopOpacity="0.2" offset="0%" />
          <stop stopColor="var(--ds-brand)" stopOpacity="0.05" offset="100%" />
        </linearGradient>
        <filter
          id={cardSoftId}
          x="-8"
          y="-4"
          width="160"
          height="130"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="5"
            floodColor="var(--ds-brand)"
            floodOpacity="0.12"
          />
        </filter>
      </defs>
      <ellipse
        cx="200"
        cy="200"
        rx="150"
        ry="28"
        className="fill-brand/10"
      />
      <rect
        x="40"
        y="0"
        width="320"
        height="200"
        rx="100"
        fill={`url(#${glowId})`}
      />
      <g
        className="stroke-brand/30"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      >
        <path
          d="M320 32c8 4 12 12 8 20l-8 20"
          strokeWidth="1.2"
        />
        <circle cx="334" cy="24" r="2" className="fill-brand/40" />
        <circle cx="88" cy="40" r="1.5" className="fill-brand/40" />
        <path
          d="M70 100c-6-2-8-8-2-12"
          strokeWidth="1"
        />
      </g>
      <g filter={`url(#${cardSoftId})`} transform="translate(100 32)">
        <g transform="translate(0 20) rotate(-7 100 50)">
          <rect
            x="0"
            y="0"
            width="200"
            height="112"
            rx="12"
            className="fill-elevated/90 stroke-brand/40"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity="0.85"
          />
        </g>
        <g transform="translate(8 6) rotate(2 100 50)">
          <rect
            x="0"
            y="0"
            width="200"
            height="112"
            rx="12"
            className="fill-elevated stroke-brand/35"
            strokeWidth="1.2"
          />
        </g>
        <g transform="translate(18 0)">
          <rect
            x="0"
            y="0"
            width="200"
            height="112"
            rx="12"
            className="fill-brand-soft/90 stroke-brand/70"
            strokeWidth="1.5"
          />
          <line
            x1="36"
            y1="40"
            x2="64"
            y2="40"
            className="stroke-brand/55"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="64"
            x2="60"
            y2="64"
            className="stroke-brand/55"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
          <g className="stroke-brand/50" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeWidth="1.3">
            <rect x="28" y="28" width="14" height="14" rx="2.5" />
            <line x1="50" y1="32" x2="90" y2="32" opacity="0.5" />
            <line x1="50" y1="35" x2="76" y2="35" opacity="0.4" />
            <rect x="28" y="50" width="14" height="14" rx="2.5" />
            <line x1="50" y1="54" x2="98" y2="54" opacity="0.5" />
            <line x1="50" y1="57" x2="84" y2="57" opacity="0.4" />
            <rect x="28" y="72" width="14" height="14" rx="2.5" />
            <line x1="50" y1="76" x2="94" y2="76" opacity="0.5" />
            <line x1="50" y1="79" x2="70" y2="79" opacity="0.4" />
          </g>
        </g>
      </g>
      <g transform="translate(258 8)">
        <path
          d="M16 0 L54 0 L62 8 L100 8 L100 64 L0 64 L0 8 Z"
          className="fill-brand-soft/80 stroke-brand/45"
          strokeWidth="1"
        />
        <path
          d="M10 8 L78 8 L84 4 L10 4 Z"
          className="fill-brand-soft/50"
        />
        <line
          x1="14"
          y1="20"
          x2="40"
          y2="20"
          className="stroke-brand/30"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="28"
          x2="32"
          y2="28"
          className="stroke-brand/30"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
