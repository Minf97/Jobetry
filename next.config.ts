import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { codeInspectorPlugin } from 'code-inspector-plugin';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['antd', '@ant-design/icons'],
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
    return config;
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
