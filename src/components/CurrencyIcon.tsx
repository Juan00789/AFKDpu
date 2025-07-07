import { cn } from '@/lib/utils';
import React from 'react';

export const CurrencyIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
    {...props}
  >
    <defs>
      <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffe29f" stopOpacity={1} />
        <stop offset="100%" stopColor="#ffa99f" stopOpacity={1} />
      </radialGradient>
    </defs>
    <circle cx="150" cy="150" r="140" fill="url(#grad1)" stroke="#ffffff" strokeWidth="4"/>
    <circle cx="150" cy="150" r="100" fill="#1e1e2f" stroke="#ffd700" strokeWidth="3"/>
    <text x="150" y="155" fontSize="24" textAnchor="middle" fill="#ffd700" fontFamily="Georgia">AFKDpu</text>
    <path d="M50,150 Q90,100 130,150 Q90,200 50,150" fill="#00c2ff" opacity="0.6"/>
    <path d="M250,150 Q210,100 170,150 Q210,200 250,150" fill="#ff00aa" opacity="0.6"/>
    <text x="80" y="270" fontSize="14" textAnchor="middle" fill="#00c2ff" fontFamily="Verdana">BROKI</text>
    <text x="220" y="270" fontSize="14" textAnchor="middle" fill="#ff00aa" fontFamily="Verdana">ONIARA</text>
  </svg>
);