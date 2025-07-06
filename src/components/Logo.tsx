import { Share2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/dashboard" className={cn("flex items-center gap-2 group", className)}>
      <div className="p-2 bg-primary rounded-lg group-hover:bg-primary/90 transition-colors">
        <Share2 className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline text-primary group-hover:text-primary/90 transition-colors">
        Ephemeral Connect
      </span>
    </Link>
  );
}
