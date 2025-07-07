
import { cn } from '@/lib/utils';
import React from 'react';

export const CurrencyIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={cn(className)}
    {...props}
  >
    <defs>
      <radialGradient id="portalGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#4b0082" stopOpacity="1"/>
      </radialGradient>
    </defs>
    <circle cx="300" cy="300" r="280" stroke="#4b0082" strokeWidth="4" fill="url(#portalGradient)" />
    <circle cx="300" cy="300" r="200" stroke="#8a2be2" strokeWidth="2" strokeDasharray="10,10" />
    <path d="M300 120 Q320 300 300 480 Q280 300 300 120 Z" fill="#ffffff22" stroke="#ffffffaa" strokeWidth="2"/>
    <text x="300" y="310" fontSize="24" textAnchor="middle" fill="#ffffff" fontFamily="serif">
      ENTRA
    </text>
  </svg>
);
