import createMiddleware from 'next-intl/middleware';
import { locales, routing } from './i18n/routing';
import { NextRequest } from 'next/server';

// 创建中间件
const intlMiddleware = createMiddleware(routing);
// const intlMiddleware = createMiddleware({
//   locales,
//   defaultLocale: 'zh',
//   localePrefix: 'always',
//   // 添加这个配置来处理重定向
//   localeDetection: true,
// })

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 如果路径不是以语言开头，重定向到默认语言
  if (!locales.some(locale => pathname.startsWith(`/${locale}`))) {
    request.nextUrl.pathname = `/zh${pathname}`;
    return Response.redirect(request.nextUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  // 匹配所有路由，除了 api、静态文件等
  matcher: ['/((?!api|_next|.*\\..*).*)', '/(en|zh)/:path*'],
};
