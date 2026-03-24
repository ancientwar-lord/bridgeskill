import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/ui/styles/globals.css';
import { getCurrentSession, getUserDTO } from '@/lib/auth/auth-utils';
import DashboardLayout from '@/ui/components/DashboardLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BridgeSkill',
  description: 'Opportunities For Everyone',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();
  const safeUserData = session ? getUserDTO(session.user) : null;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardLayout user={safeUserData}>{children}</DashboardLayout>
      </body>
    </html>
  );
}
