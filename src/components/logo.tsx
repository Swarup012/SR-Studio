import Link from 'next/link';
import { ShankhaIcon } from '@/components/icons/shankha-icon';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-foreground", className)}>
      <ShankhaIcon className="h-8 w-8 text-primary" />
      <span className="font-headline text-xl font-bold">
        Bengali Snaps
      </span>
    </Link>
  );
}
