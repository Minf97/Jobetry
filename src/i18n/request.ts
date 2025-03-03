/**
 * https://next-intl.dev/blog/next-intl-3-22#i18n-request
 */

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, routing } from './routing';

export type Locale = (typeof locales)[number];

// https://next-intl.dev/blog/next-intl-3-22#await-request-locale
export default getRequestConfig(async ({ requestLocale }) => {
  // 验证语言是否支持
  let locale = await requestLocale;
  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
