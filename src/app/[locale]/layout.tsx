import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import { Providers } from "@/components/providers";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "简历生成器",
  description: "帮助你快速制作专业简历",
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(error, "RootLayout error");
    notFound();
  }

  // 验证语言是否支持
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers locale={locale} messages={messages}>
          <Header />
          <main className="relative min-h-screen bg-background pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
} 