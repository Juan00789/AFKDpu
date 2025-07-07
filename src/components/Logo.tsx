
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';

const PortalLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
        <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="30" />
        <path d="M300 120 Q320 300 300 480 Q280 300 300 120 Z" fill="currentColor" stroke="currentColor" strokeWidth="15" opacity="0.7"/>
    </svg>
);


interface LogoProps {
  className?: string;
  href?: string;
}

export function Logo({ className, href = '/dashboard' }: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-2 group", className)}>
      <div className="p-2 bg-primary rounded-lg group-hover:bg-primary/90 transition-colors">
        <PortalLogoIcon className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline text-primary group-hover:text-primary/90 transition-colors">
        AFKDpu
      </span>
    </Link>
  );
}
