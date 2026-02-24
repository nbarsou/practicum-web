'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Globe,
  LogOut,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const pathname = usePathname();

  // Helper to determine active state
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {/* Logo */}
        <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-orange-600 text-lg font-semibold text-white md:h-8 md:w-8 md:text-base">
          <Globe className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Anáhuac</span>
        </div>

        <div className="bg-border h-px w-full" />

        {/* Navigation Links */}
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-lg transition-colors ${
              isActive('/dashboard')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Dashboard"
          >
            <LayoutDashboard className="size-5" />
          </Button>
        </Link>

        <Link href="/agreements">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-lg transition-colors ${
              isActive('/dashboard/agreements')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Agreements"
          >
            <FileSpreadsheet className="size-5" />
          </Button>
        </Link>

        <Link href="/universities">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-lg transition-colors ${
              isActive('/dashboard/universities')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Universities"
          >
            <Building2 className="size-5" />
          </Button>
        </Link>
      </nav>

      {/* Footer Actions */}
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive rounded-lg transition-colors"
          aria-label="Logout"
        >
          <LogOut className="size-5" />
        </Button>
      </nav>
    </aside>
  );
}
