'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // 检查当前路径是否是编辑器页面
  const isEditorPage = pathname.includes('/editor/');
  
  // 如果是编辑器页面，则不显示Footer
  if (isEditorPage) {
    return null;
  }
  
  // 否则渲染Footer
  return <Footer />;
} 