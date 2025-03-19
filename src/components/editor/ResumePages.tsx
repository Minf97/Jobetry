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
  const contentRef = useRef<HTMLDivElement>(null);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const [contentRendered, setContentRendered] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // 页面尺寸设置
  const pageHeight = 1122; // A4纸高度
  const pageWidth = 794;   // A4纸宽度
  const pagePadding = 32;  // 页面内边距
  const availableHeight = pageHeight - (pagePadding * 2); // 可用内容高度
  
  // 添加调试日志
  const addDebugLog = (message: string) => {
    console.log(message);
    setDebugInfo(prev => [...prev.slice(-100), message]); // 保留最新的100条日志
  };
  
  // 先渲染内容，然后进行分页计算
  useEffect(() => {
    // 重置页面状态
    setPages([]);
    setDebugInfo([]);
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
    
    addDebugLog("开始分页计算...");
    setIsCalculating(true);
    
    // 分页逻辑
    const performPagination = () => {
      const contentElement = contentRef.current;
      if (!contentElement) {
        addDebugLog("错误：无法获取内容元素引用");
        setIsCalculating(false);
        return;
      }
      
      // 获取所有顶级内容元素
      const contentElements = Array.from(contentElement.children);
      addDebugLog(`顶层元素数量：${contentElements.length}`);
      
      // 使用递归函数查找实际内容元素
      let actualContentElements: HTMLElement[] = [];
      
      if (contentElements.length === 1) {
        // 可能是嵌套的结构，尝试递归查找
        actualContentElements = findContentElements(contentElements[0] as HTMLElement);
        addDebugLog(`使用递归查找，找到实际内容元素数量：${actualContentElements.length}`);
      } else {
        // 多个顶层元素，直接使用
        actualContentElements = contentElements as HTMLElement[];
        addDebugLog(`使用顶层元素作为内容元素，数量：${actualContentElements.length}`);
      }
      
      // 过滤掉空元素
      actualContentElements = actualContentElements.filter(el => {
        const hasText = el.textContent?.trim() !== '';
        const hasImage = el.querySelector('img') !== null;
        return hasText || hasImage;
      });
      
      addDebugLog(`过滤后的内容元素数量：${actualContentElements.length}`);
      
      // 打印实际内容元素信息
      actualContentElements.forEach((el, i) => {
        const textPreview = el.textContent?.trim().substring(0, 20) || '';
        const ellipsis = el.textContent?.trim().length > 20 ? '...' : '';
        addDebugLog(`内容元素 ${i}: 类型=${el.tagName}, 文本="${textPreview}${ellipsis}"`);
      });
      
      if (actualContentElements.length === 0) {
        addDebugLog("内容为空，创建空白页面");
        setPages([{ content: '', height: 0 }]);
        setIsCalculating(false);
        return;
      }
      
      // 测试强制分页 - 创建两个页面，确认渲染机制正常
      // 这是一个调试辅助，我们手动将内容分为两页
      const forceTwoPages = false;
      
      if (forceTwoPages) {
        addDebugLog("强制测试两页模式");
        // 将内容分为两半
        const halfwayPoint = Math.ceil(actualContentElements.length / 2);
        const firstHalfContent = actualContentElements.slice(0, halfwayPoint).map(el => el.outerHTML).join('');
        const secondHalfContent = actualContentElements.slice(halfwayPoint).map(el => el.outerHTML).join('');
        
        setPages([
          { content: firstHalfContent, height: availableHeight * 0.8 },
          { content: secondHalfContent, height: availableHeight * 0.5 }
        ]);
        
        addDebugLog(`强制分页测试：创建了 2 页`);
        setIsCalculating(false);
        return;
      }
      
      // 正常分页流程
      const newPages: PageItem[] = [];
      let currentPageContent = '';
      let currentPageHeight = 0;
      let previousMarginBottom = 0; // 跟踪上一个元素的底部边距
      
      addDebugLog(`页面可用高度：${availableHeight}px`);
      
      // 创建临时测量容器
      const measureContainer = measureContainerRef.current;
      if (!measureContainer) {
        addDebugLog("错误：无法获取测量容器引用");
        setIsCalculating(false);
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
          addDebugLog(`跳过空元素 ${i}`);
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
        
        addDebugLog(`元素 ${i}: 类型=${element.tagName}, 高度=${metrics.height}px, 上边距=${metrics.marginTop}px, 下边距=${metrics.marginBottom}px, 折叠后总高度=${elementTotalHeight}px`);
        
        // 元素高度为0，跳过
        if (metrics.height === 0) {
          addDebugLog(`元素 ${i} 高度为0，跳过`);
          continue;
        }
        
        // 检查是否需要分页
        // 如果当前页为空，我们总是添加当前元素，即使它可能超过页面高度
        // 如果当前页不为空，且添加当前元素会超过页面高度，我们创建新页面
        if (currentPageHeight === 0 || currentPageHeight + elementTotalHeight <= availableHeight) {
          // 添加到当前页
          currentPageContent += elementHTML;
          currentPageHeight += elementTotalHeight;
          addDebugLog(`元素 ${i} 添加到当前页 ${newPages.length + 1}, 当前页高度=${currentPageHeight}px/${availableHeight}px`);
        } else {
          // 完成当前页
          newPages.push({
            content: currentPageContent,
            height: currentPageHeight
          });
          addDebugLog(`完成页面 ${newPages.length}, 内容长度=${currentPageContent.length}, 高度=${currentPageHeight}px`);
          
          // 开始新页面 - 新页面第一个元素无需考虑上一个元素的折叠边距
          currentPageContent = elementHTML;
          currentPageHeight = metrics.height + metrics.marginTop; // 使用完整上边距，不折叠
          previousMarginBottom = metrics.marginBottom; // 更新边距跟踪
          addDebugLog(`元素 ${i} 开始新页面 ${newPages.length + 1}, 高度=${currentPageHeight}px`);
        }
      }
      
      // 添加最后一页（如果有内容）
      if (currentPageContent) {
        newPages.push({
          content: currentPageContent,
          height: currentPageHeight
        });
        addDebugLog(`添加最后一页 ${newPages.length}, 内容长度=${currentPageContent.length}, 高度=${currentPageHeight}px`);
      }
      
      // 打印页面摘要
      newPages.forEach((page, index) => {
        addDebugLog(`页面 ${index + 1}: 高度=${page.height}px, 内容长度=${page.content.length}字符`);
      });
      
      // 如果没有页面，创建一个空页面
      if (newPages.length === 0) {
        addDebugLog("没有创建页面，添加一个空页面");
        newPages.push({ content: '', height: 0 });
      }
      
      // 设置分页结果
      addDebugLog(`分页完成，总页数：${newPages.length}`);
      setPages(newPages);
      setIsCalculating(false);
    };
    
    // 延迟执行，确保DOM已完全渲染
    const timer = setTimeout(performPagination, 500);
    return () => clearTimeout(timer);
  }, [contentRendered, availableHeight]);
  
  return (
    <>
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
      
      {/* 调试日志显示 */}
      <div className="mt-8 w-full max-w-[794px] mx-auto mb-16 p-4 bg-gray-100 dark:bg-gray-900 rounded-md">
        <h3 className="text-sm font-bold mb-2">调试日志:</h3>
        <div className="text-xs font-mono overflow-auto max-h-[300px]">
          {debugInfo.map((log, index) => (
            <div key={index} className="py-0.5">{log}</div>
          ))}
        </div>
      </div>
    </>
  );
}