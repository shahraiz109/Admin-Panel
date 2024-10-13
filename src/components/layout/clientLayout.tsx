"use client";

import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import Header from './header';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current route is login, hide sidebar and header on the login page
  const isLoginPage = pathname === '/';

  return (
    <>
      {!isLoginPage ? (
        <div className="flex">
          <Sidebar />
          <main className="w-full flex-1 overflow-hidden mt-10">
            <Header />
            {children}
          </main>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
