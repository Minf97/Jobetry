'use client';
import { useEffect, useRef, useState } from 'react';
import { EditorStatic } from '@/components/plate-ui/editor-static';
import { editorStaticComponents } from '@/components/editor/use-create-editor';

interface ResumePagesProps {
  editorValue: any;
  editorStatic: any;
}

// 定义页面项类型
interface PageItem {
  content: string;
  height: number;
}

// 递归查找实际内容元素的辅助函数
function findContentElements(element: HTMLElement, maxDepth = 3, currentDepth = 0): HTMLElement[] {
  // 如果达到最大深度，返回当前元素
  if (currentDepth >= maxDepth) {
    return [element];
  }
  
  // 如果元素只有一个div子元素，并且没有其他内容，则深入该div
  const children = Array.from(element.children);
  if (children.length === 1 && children[0].tagName === 'DIV') {
    const childText = element.textContent?.trim() || '';
    const childContent = children[0].textContent?.trim() || '';
    
    // 如果父元素和子元素文本相同，说明没有在此层级添加其他内容，可以进一步深入
    if (childText === childContent) {
      return findContentElements(children[0] as HTMLElement, maxDepth, currentDepth + 1);
    }
  }
  
  // 如果有多个子元素或者不是纯div嵌套，返回当前的子元素集合
  if (children.length > 0) {
    return children.map(child => child as HTMLElement);
  }
  
  // 如果没有子元素，返回当前元素
  return [element];
}

export default function ResumePages({ editorValue, editorStatic }: ResumePagesProps) {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [tempPages, setTempPages] = useState<PageItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const [contentRendered, setContentRendered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.85);
  
  // 页面尺寸设置
  const pageHeight = 1122; // A4纸高度
  const pageWidth = 794;   // A4纸宽度
  const pagePadding = 32;  // 页面内边距
  const availableHeight = pageHeight - (pagePadding * 2); // 可用内容高度
  
  // 计算缩放比例
  useEffect(() => {
    const calculateScale = () => {
      const container = containerRef.current?.parentElement;
      if (!container) return;
      
      // 获取容器可用宽度 (减去内边距)
      const containerWidth = container.clientWidth - 48; // 减去 p-6 的内边距 (6 * 8 = 48)
      // 计算合适的缩放比例，保留一些边距空间
      const maxScaleFactor = Math.min(containerWidth / pageWidth, 1);
      // 设置一个最小缩放值
      const scaleFactor = Math.max(maxScaleFactor * 0.95, 0.5);
      
      setScale(scaleFactor);
    };
    
    calculateScale();
    
    // 添加窗口大小变化监听器
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [pageWidth]);
  
  // 先渲染内容，然后进行分页计算
  useEffect(() => {
    // 不再重置页面状态，保留旧页面直到新页面准备好
    setContentRendered(false);
    
    // 延迟一帧，让DOM先渲染
    const timer = setTimeout(() => {
      setContentRendered(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [editorValue]);
  
  // 在内容渲染后，进行分页计算
  useEffect(() => {
    if (!contentRendered || !contentRef.current) return;

    // 分页逻辑
    const performPagination = () => {
      const contentElement = contentRef.current;
      if (!contentElement) {
        return;
      }
      
      // 获取所有顶级内容元素
      const contentElements = Array.from(contentElement.children);
      
      // 使用递归函数查找实际内容元素
      let actualContentElements: HTMLElement[] = [];
      
      if (contentElements.length === 1) {
        // 可能是嵌套的结构，尝试递归查找
        actualContentElements = findContentElements(contentElements[0] as HTMLElement);
      } else {
        // 多个顶层元素，直接使用
        actualContentElements = contentElements as HTMLElement[];
      }
      
      // 过滤掉空元素
      actualContentElements = actualContentElements.filter(el => {
        const hasText = el.textContent?.trim() !== '';
        const hasImage = el.querySelector('img') !== null;
        return hasText || hasImage;
      });
      
      if (actualContentElements.length === 0) {
        setTempPages([{ content: '', height: 0 }]);
        return;
      }
      
      
      // 正常分页流程
      const newPages: PageItem[] = [];
      let currentPageContent = '';
      let currentPageHeight = 0;
      let previousMarginBottom = 0; // 跟踪上一个元素的底部边距
      
      // 创建临时测量容器
      const measureContainer = measureContainerRef.current;
      if (!measureContainer) {
        return;
      }
      
      // 清空测量容器
      measureContainer.innerHTML = '';
      
      // 获取元素的完整高度，包括margin和考虑边距折叠
      const getElementFullHeight = (element: HTMLElement): {height: number, marginTop: number, marginBottom: number} => {
        // 克隆元素到测量容器
        const clone = element.cloneNode(true) as HTMLElement;
        measureContainer.appendChild(clone);
        
        // 获取盒模型计算样式
        const style = window.getComputedStyle(clone);
        const marginTop = parseInt(style.marginTop, 10) || 0;
        const marginBottom = parseInt(style.marginBottom, 10) || 0;
        
        // 基础高度（包括内容、内边距和边框）
        const baseHeight = clone.offsetHeight;
        
        // 移除克隆的元素
        measureContainer.removeChild(clone);
        
        return {
          height: baseHeight,
          marginTop,
          marginBottom
        };
      };
      
      // 遍历所有内容元素
      for (let i = 0; i < actualContentElements.length; i++) {
        const element = actualContentElements[i] as HTMLElement;
        
        // 跳过空元素
        if (element.textContent?.trim() === '' && !element.querySelector('img')) {
          continue;
        }
        
        // 获取元素完整高度和边距
        const metrics = getElementFullHeight(element);
        const elementHTML = element.outerHTML;
        
        // 考虑边距折叠 - 取当前元素的上边距和前一个元素的下边距中的较大值
        const collapsedMarginTop = Math.max(previousMarginBottom, metrics.marginTop);
        
        // 元素在页面中的实际高度 = 基础高度 + 上边距（考虑折叠）
        const elementTotalHeight = metrics.height + collapsedMarginTop;
        
        // 更新下一个元素的前一个边距
        previousMarginBottom = metrics.marginBottom;
        
        // 元素高度为0，跳过
        if (metrics.height === 0) {
          continue;
        }
        
        // 检查是否需要分页
        // 如果当前页为空，我们总是添加当前元素，即使它可能超过页面高度
        // 如果当前页不为空，且添加当前元素会超过页面高度，我们创建新页面
        if (currentPageHeight === 0 || currentPageHeight + elementTotalHeight <= availableHeight) {
          // 添加到当前页
          currentPageContent += elementHTML;
          currentPageHeight += elementTotalHeight;
        } else {
          // 完成当前页
          newPages.push({
            content: currentPageContent,
            height: currentPageHeight
          });

          // 开始新页面 - 新页面第一个元素无需考虑上一个元素的折叠边距
          currentPageContent = elementHTML;
          currentPageHeight = metrics.height + metrics.marginTop; // 使用完整上边距，不折叠
          previousMarginBottom = metrics.marginBottom; // 更新边距跟踪
        }
      }
      
      // 添加最后一页（如果有内容）
      if (currentPageContent) {
        newPages.push({
          content: currentPageContent,
          height: currentPageHeight
        });
      }
      
      // 如果没有页面，创建一个空页面
      if (newPages.length === 0) {
        newPages.push({ content: '', height: 0 });
      }
      
      // 设置分页结果到临时状态，而不是直接更新显示状态
      if (newPages.length === 0) {
        newPages.push({ content: '', height: 0 });
      }
      
      setTempPages(newPages);
      
      // 当分页计算完成后，更新显示的页面内容
      requestAnimationFrame(() => {
        setPages(newPages);
      });
    };
    
    // 延迟执行，确保DOM已完全渲染
    const timer = setTimeout(performPagination, 500);
    return () => clearTimeout(timer);
  }, [contentRendered, availableHeight]);
  
  return (
    <div ref={containerRef} className="w-full" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      {/* 测量用的隐藏内容 */}
      <div className="sr-only">
        <div 
          ref={contentRef} 
          style={{ 
            width: `${pageWidth - pagePadding * 2}px`,
            position: 'absolute',
            visibility: 'hidden',
            left: '0',
            top: '0',
            zIndex: '-1',
            fontSize: '16px',
            lineHeight: '1.5',
            padding: '0',
            margin: '0'
          }}
        >
          <EditorStatic components={editorStaticComponents} editor={editorStatic} />
        </div>
        
        {/* 测量容器 - 用于准确测量元素尺寸 */}
        <div 
          ref={measureContainerRef}
          style={{ 
            width: `${pageWidth - pagePadding * 2}px`,
            position: 'absolute',
            left: '0',
            top: '100px',
            zIndex: '-1',
            opacity: '0.01', // 几乎透明但仍然可渲染
            fontSize: '16px',
            lineHeight: '1.5',
            padding: '0',
            margin: '0',
            overflow: 'hidden'
          }}
        ></div>
      </div>
      
      {/* 开启强制测试模式 */}
      {/* <div className="mb-4 w-full max-w-[794px] mx-auto flex">
        <button 
          className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md text-sm z-10 cursor-pointer"
          onClick={() => {
            // 强制使用两页测试
            setPages([
              { content: '<p>第一页测试内容</p><p>这是第一页</p>', height: 100 },
              { content: '<p>第二页测试内容</p><p>这是第二页</p>', height: 100 }
            ]);
          }}
          disabled={isCalculating}
        >
          强制测试两页
        </button>
        
        <button 
          className={`ml-2 px-4 py-2 ${isCalculating ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-800'} rounded-md text-sm z-10 cursor-pointer flex items-center`}
          onClick={() => {
            if (!isCalculating) {
              // 手动运行分页
              setContentRendered(true);
            }
          }}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              计算中...
            </>
          ) : '重新计算分页'}
        </button>
        
        <button 
          className="ml-2 px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm z-10 cursor-pointer"
          onClick={() => {
            // 清空调试日志
            setDebugInfo([]);
          }}
          disabled={isCalculating}
        >
          清空日志
        </button>
        
        {isCalculating && (
          <span className="ml-2 text-sm text-gray-500">
            分页计算中，请稍候...这可能需要几秒钟
          </span>
        )}
      </div> */}
      
      {/* 渲染所有页面 */}
      {pages.map((page, pageIndex) => (
        <div 
          key={pageIndex}
          className="relative w-full max-w-[794px] mx-auto mb-8 print:mb-0"
          style={{ height: `${pageHeight}px`, width: `${pageWidth}px` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-editor-paper rounded-sm shadow-lg">
            <div className="absolute top-0 left-0 w-full h-full p-8 overflow-hidden">
              {/* 单页内容 */}
              <div 
                className="h-full w-full resume-content-page" 
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
              
              {/* 调试信息 */}
              <div className="absolute bottom-8 right-4 text-xs text-gray-300">
                内容长度: {page.content.length} 字符 | 高度: {Math.round(page.height)}px
              </div>
              
              <div className="absolute bottom-2 right-4 text-xs text-gray-400">
                第 {pageIndex + 1} 页 / 共 {pages.length} 页
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}