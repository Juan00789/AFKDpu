import { cn } from '@/lib/utils';
import React from 'react';

export const CurrencyIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
    {...props}
  >
    <path d="M3 21h18" />
    <path d="M5 21V9a7 7 0 0 1 7-7h0a7 7 0 0 1 7 7v12" />
    <path d="M9 17h6" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <path
      fill="currentColor"
      stroke="none"
      d="M16.5 2l-.4.8L15 3.2l1.2.4.4.8.4-.8 1.2-.4-1.2-.4-.4-.8z"
    />
    <circle cx="18.5" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
