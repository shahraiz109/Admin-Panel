'use client';
import React, { useState } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img from "../../public/ali.png";
import { LogoutModal } from '../modal/logout-modal';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Modal state
  const [loading, setLoading] = useState(false); // Loading state

  const handleToggle = () => {
    toggle();
  };

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLogoutModalOpen(false);
      window.location.href = "/";
    }, 2000);
  };

  return (
    <aside
      className={cn(
        `relative md:block hidden h-screen flex-none border-r bg-card transition-[width] duration-500`,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block rounded-full">
        <Link href="/profile">
          <Image
            height={200}
            width={200}
            alt=""
            src={img}
            className="h-[8vh] w-[8vh] rounded-full border-[1px]"
          />
        </Link>
        <p className="text-sm mt-1">Shahraiz</p>
      </div>

      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />

      {/* Ensure scrolling works */}
      <div className="space-y-4 py-4 overflow-y-auto h-full md:h-screen">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1 overflow-y-auto h-full md:h-screen">
            <DashboardNav
              items={navItems.map((item) =>
                item.title === 'Logout'
                  ? { ...item, onClick: () => setIsLogoutModalOpen(true) }
                  : item
              )}
            />
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        loading={loading}
      />
    </aside>
  );
}
