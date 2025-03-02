/**
 * https://next-intl.dev/blog/next-intl-3-22#define-routing
 */

import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'zh'] as const;

export const routing = defineRouting({
  locales,
  defaultLocale: 'zh',
  localePrefix: {
    mode: 'always',
    prefixes: {
      en: '/en',
      zh: '/zh',
    },
  },
});
