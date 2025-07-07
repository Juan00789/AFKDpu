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
        <stop offset="0%" stopColor="#E6E6FA" stopOpacity={1} />
        <stop offset="100%" stopColor="#A020F0" stopOpacity={1} />
      </radialGradient>
    </defs>
    <circle cx="150" cy="150" r="140" fill="url(#grad1)" stroke="#ffffff" strokeWidth="4"/>
    <circle cx="150" cy="150" r="100" fill="#00008B" stroke="#FFFFFF" strokeWidth="3"/>
    <text x="150" y="155" fontSize="24" textAnchor="middle" fill="#FFFFFF" fontFamily="Space Grotesk, sans-serif">AFKDpu</text>
    <path d="M50,150 Q90,100 130,150 Q90,200 50,150" fill="#A020F0" opacity="0.7"/>
    <path d="M250,150 Q210,100 170,150 Q210,200 250,150" fill="#00008B" opacity="0.7"/>
    <text x="80" y="270" fontSize="14" textAnchor="middle" fill="#A020F0" fontFamily="Verdana">BROKI</text>
    <text x="220" y="270" fontSize="14" textAnchor="middle" fill="#00008B" fontFamily="Verdana">ONIARA</text>
  </svg>
);
