import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
  iconOnly?: boolean;
  iconSize?: string;
}

export default function Logo({ 
  className = '', 
  showText = true, 
  textSize = 'text-xl', 
  iconOnly = false,
  iconSize = 'w-9 h-9'
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG C-Logo with gradient and 2x2 square elements */}
      <svg 
        viewBox="0 0 100 100" 
        className={`${iconSize} select-none filter drop-shadow-[0_2px_8px_rgba(162,60,255,0.15)] transition-transform duration-300 hover:scale-105`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="creogrid-c-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2D7A" />
            <stop offset="60%" stopColor="#A23CFF" />
            <stop offset="100%" stopColor="#5B2CFF" />
          </linearGradient>
        </defs>

        {/* The 'C' Arc */}
        <path 
          d="M 64 29.6 A 30 30 0 1 0 64 70.4" 
          stroke="url(#creogrid-c-grad)" 
          strokeWidth="14" 
          strokeLinecap="round" 
        />

        {/* 2x2 Rounded Squares Grid in the opening */}
        {/* Top-Left: Pink */}
        <rect x="63" y="35" width="11" height="11" rx="3.5" fill="#FF2D7A" />
        {/* Top-Right: Orange */}
        <rect x="77" y="35" width="11" height="11" rx="3.5" fill="#FF9A1F" />
        {/* Bottom-Left: Purple */}
        <rect x="63" y="49" width="11" height="11" rx="3.5" fill="#A23CFF" />
        {/* Bottom-Right: Indigo/Blue */}
        <rect x="77" y="49" width="11" height="11" rx="3.5" fill="#5B2CFF" />
      </svg>

      {showText && !iconOnly && (
        <div className="flex flex-col text-left leading-none">
          <span className={`font-display font-extrabold tracking-wider text-slate-900 dark:text-[#F5F6FA] transition-colors duration-200 ${textSize}`}>
            CREOGRID
          </span>
          <span className="text-[7.5px] font-sans font-bold tracking-[0.24em] text-slate-500 dark:text-[#8E8EA0] uppercase mt-1.5 transition-colors duration-200">
            Where Brands Meet Creators
          </span>
        </div>
      )}
    </div>
  );
}
