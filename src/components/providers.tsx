'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { App } from "antd";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: any;
};

export function Providers({ children, locale, messages }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <App>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProgressBar
            height="4px"
            color="#7c3aed"
            options={{ showSpinner: false }}
            shallowRouting
          />
          {children}
        </NextIntlClientProvider>
      </App>
    </ThemeProvider>
  );
} 