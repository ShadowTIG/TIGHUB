
import React from 'react';

const TIGLogo: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="blackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1a1a1a' }} />
            <stop offset="100%" style={{ stopColor: '#000000' }} />
          </linearGradient>
          <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#6366f1' }} />
            <stop offset="50%" style={{ stopColor: '#a855f7' }} />
            <stop offset="100%" style={{ stopColor: '#f43f5e' }} />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Outer Hexagon - Solid Black Matte */}
        <path 
          d="M50 5 L92 28 L92 72 L50 95 L8 72 L8 28 Z" 
          fill="url(#blackGrad)" 
          stroke="#333" 
          strokeWidth="1"
        />

        {/* Inner Tech Frame - Thin Neon Line */}
        <path 
          d="M50 12 L85 31 L85 69 L50 88 L15 69 L15 31 Z" 
          fill="none" 
          stroke="url(#neonGrad)" 
          strokeWidth="0.5" 
          strokeDasharray="4 2"
          opacity="0.6"
        />
        
        {/* The Stylized 'T' - Professional & Sharp */}
        <g filter="url(#neonGlow)">
          {/* Top Bar - Gaming D-Pad/V-Shape influence */}
          <path 
            d="M25 32 L50 28 L75 32 L78 40 L22 40 Z" 
            fill="white" 
          />
          {/* Vertical Bar - High-tech Column */}
          <path 
            d="M46 40 L54 40 L54 70 L50 80 L46 70 Z" 
            fill="white" 
          />
          
          {/* Core Energy Point - The IT Node */}
          <circle cx="50" cy="34" r="2.5" fill="black" />
          <circle cx="50" cy="34" r="1" fill="url(#neonGrad)" />
        </g>

        {/* Small corner accents - The "Gaming" LED style */}
        <circle cx="50" cy="8" r="1.5" fill="#6366f1" className="animate-pulse" />
        <circle cx="8" cy="28" r="1" fill="#f43f5e" />
        <circle cx="92" cy="28" r="1" fill="#f43f5e" />
      </svg>
    </div>
  );
};

export default TIGLogo;
