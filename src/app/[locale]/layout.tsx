import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@ant-design/v5-patch-for-react-19';
import './globals.css';
import { Providers } from '@/components/providers';
import { notFound } from 'next/navigation';
import { locales, routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { ConditionalFooter } from '@/components/ConditionalFooter';
import { getMessages } from 'next-intl/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '简历生成器',
  description: '帮助你快速制作专业简历',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Providers locale={locale} messages={messages}>
          <Header />
          <main className="relative flex-grow bg-background pt-16">{children}</main>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
