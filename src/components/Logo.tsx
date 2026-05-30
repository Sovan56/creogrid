/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function LogoIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer C crescent slice with high-end premium gradient */}
      <path
        d="M 62 21 
           A 35 35 0 1 0 62 79 
           L 54 67 
           A 21 21 0 1 1 54 33 
           Z"
        fill="url(#creogrid-c-grad)"
        stroke="url(#creogrid-c-grad)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* 2x2 Accent dot blocks on the right */}
      {/* Top Left: pink */}
      <rect x="72" y="32" width="10" height="10" rx="2" fill="#FF2D7A" />
      {/* Top Right: orange */}
      <rect x="86" y="32" width="10" height="10" rx="2" fill="#FF9A1F" />
      {/* Bottom Left: deep Indigo */}
      <rect x="72" y="46" width="10" height="10" rx="2" fill="#5B2CFF" />
      {/* Bottom Right: Purple */}
      <rect x="86" y="46" width="10" height="10" rx="2" fill="#A23CFF" />

      <defs>
        <linearGradient id="creogrid-c-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2D7A" />
          <stop offset="50%" stopColor="#A23CFF" />
          <stop offset="100%" stopColor="#5B2CFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({ className = "h-9", iconOnly = false }: LogoProps) {
  if (iconOnly) {
    return <LogoIcon className={className} />;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon className="w-9 h-9" />
      <span className="font-display font-medium text-lg md:text-xl tracking-tight text-white">
        CREO<span className="text-white font-bold">GRID</span>
        <span className="text-[9px] ml-1.5 align-middle text-brand-alt font-semibold px-1.5 py-0.5 rounded bg-brand-alt/10 border border-brand-alt/20 font-mono tracking-wider">
          SPOT
        </span>
      </span>
    </div>
  );
}
