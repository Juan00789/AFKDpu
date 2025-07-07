import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

// Custom icon to represent the swirl from the logo.
// The path is inspired by lucide-react's 'Loader2' icon for a clean, consistent style.
const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
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
        <LogoIcon className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline text-primary group-hover:text-primary/90 transition-colors">
        AFKDpu
      </span>
    </Link>
  );
}
