'use client';

import { useTranslations } from 'next-intl';
import { Button } from "./ui/button";
import { LocaleLink } from "./LocaleLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { Menu, X, Github } from "lucide-react";
import { useState } from "react";
import { GITHUB_URL, HOST_NAME } from "@/lib/utils/constant";

export function Header() {
  const t = useTranslations('header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/pricing', label: t('pricing') },
    { href: '/showcases', label: t('showcases') },
    { href: '/comments', label: t('comments') },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 左侧 Logo 和导航 */}
        <div className="flex items-center gap-8">
          <LocaleLink href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-foreground">{HOST_NAME}</span>
          </LocaleLink>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navItems.map(({ href, label }) => (
              <LocaleLink
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                {label}
              </LocaleLink>
            ))}
          </nav>
        </div>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:items-center md:gap-4">
            <a
              href="https://github.com/yourusername/resume-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition hover:text-foreground/60"
              aria-label="GitHub repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <LanguageSwitcher />
            <ThemeToggle />
            <LocaleLink href="/login">
              <Button>{t('login')}</Button>
            </LocaleLink>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="text-muted-foreground transition hover:text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b bg-background px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map(({ href, label }) => (
              <LocaleLink
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </LocaleLink>
            ))}
            <hr className="my-2" />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-foreground/60"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <LocaleLink href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">{t('login')}</Button>
            </LocaleLink>
          </nav>
        </div>
      )}
    </header>
  );
} 