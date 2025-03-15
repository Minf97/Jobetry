'use client';
import { useEffect, useRef, useState } from 'react';
import { EditorStatic } from '@/components/plate-ui/editor-static';
import { editorStaticComponents } from '@/components/editor/use-create-editor';

interface ResumePagesProps {
  editorValue: any;
  editorStatic: any;
}

export default function ResumePages({ editorValue, editorStatic }: ResumePagesProps) {
  const [pages, setPages] = useState<number[]>([0]); // 初始只有一页
  const contentRef = useRef<HTMLDivElement>(null);
  const pageHeight = 1122; // A4纸高度 (约为297mm，按照96dpi转换)
  const pageWidth = 794;   // A4纸宽度 (约为210mm，按照96dpi转换)

  useEffect(() => {
    // 当编辑器内容变化时，检查是否需要分页
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const pageCount = Math.ceil(contentHeight / (pageHeight - 64)); // 减去内边距
      
      if (pageCount !== pages.length) {
        setPages(Array.from({ length: pageCount }, (_, i) => i));
      }
    }
  }, [editorValue, pages.length]);

  return (
    <>
      {pages.map((pageIndex) => (
        <div 
          key={pageIndex}
          className="relative w-full max-w-[794px] mx-auto mb-8"
          style={{ height: `${pageHeight}px`, width: `${pageWidth}px` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-editor-paper rounded-sm shadow-lg p-8 overflow-hidden">
            {pageIndex === 0 ? (
              // 第一页显示完整内容，但通过CSS限制高度
              <div 
                ref={contentRef} 
                className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
                style={{ 
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <EditorStatic components={editorStaticComponents} editor={editorStatic} />
              </div>
            ) : (
              // 后续页面使用CSS显示溢出内容
              <div 
                className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
                style={{ 
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: `-${pageIndex * (pageHeight - 64)}px`, // 减去内边距
                  left: 0,
                  width: '100%'
                }}>
                  <EditorStatic components={editorStaticComponents} editor={editorStatic} />
                </div>
              </div>
            )}
            <div className="absolute bottom-2 right-4 text-xs text-gray-400">
              第 {pageIndex + 1} 页
            </div>
          </div>
        </div>
      ))}
    </>
  );
}