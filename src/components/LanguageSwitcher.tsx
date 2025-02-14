'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    router.push(`/${newLocale}`);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLocale}
      className='text-foreground'
    >
      {locale === 'en' ? '中文' : 'English'}
    </Button>
  );
} 