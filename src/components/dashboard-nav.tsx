'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight'];
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium',
                      path === item.href ? 'text-main dark:text-blue' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                  >
                    <Icon className="ml-3 size-5 flex-none" />
                    {!isMinimized && <span className="mr-2 truncate">{item.title}</span>}
                  </button>
                ) : (
                  <Link
                    href={item.href || '/'}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium',
                      path === item.href ? 'text-main dark:text-blue' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => setOpen && setOpen(false)}
                  >
                    <Icon className="ml-3 size-5 flex-none" />
                    {!isMinimized && <span className="mr-2 truncate">{item.title}</span>}
                  </Link>
                )}
              </TooltipTrigger>
              {/* <TooltipContent align="center" side="right" sideOffset={8}>
                {item.title}
              </TooltipContent> */}
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
