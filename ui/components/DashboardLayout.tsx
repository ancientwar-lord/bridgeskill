'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import type { ClientUser } from '@/lib/types';

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: ClientUser;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div>
      {!user && <Navbar />}
      {user && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          user={user}
        />
      )}
      <main
        className={`min-h-screen transition-all duration-300  ${user ? (isSidebarCollapsed ? 'md:pl-20' : 'md:pl-50') : ''}`}
      >
        {children}
      </main>
      {!user && <Footer />}
    </div>
  );
}
