'use client';

import { type Value } from '@udecode/plate';
import { deserializeMd } from '@udecode/plate-markdown';
import { ColumnPlugin, ColumnItemPlugin } from '@udecode/plate-layout/react';

/**
 * 用于识别并解析自定义的左右列布局语法
 * 格式为:
 * :::left
 * 左侧内容
 * :::
 * 
 * :::right
 * 右侧内容
 * :::
 */
export const customDeserializeMd = (editor: any, markdown: string): Value => {
  // 首先检查是否有匹配的列模式
  const columnPairs: { left: string; right: string }[] = [];
  
  // 使用正则表达式一次性匹配所有的左右块对
  const pattern = /:::left\s*([\s\S]*?):::\s*\n*\s*:::right\s*([\s\S]*?):::/g;
  let match;
  let processedMarkdown = markdown;
  
  // 收集所有匹配的左右块对
  while ((match = pattern.exec(markdown)) !== null) {
    const leftContent = match[1].trim();
    const rightContent = match[2].trim();
    const fullMatch = match[0]; // 完整匹配
    
    columnPairs.push({ left: leftContent, right: rightContent });
    
    // 创建唯一的占位符标记
    const placeholder = `COLUMN_PLACEHOLDER_${columnPairs.length - 1}`;
    
    // 在原始字符串中直接替换整个匹配为占位符
    processedMarkdown = processedMarkdown.replace(fullMatch, placeholder);
  }
  
  // 使用标准deserializer解析修改后的markdown
  const value = deserializeMd(editor, processedMarkdown);
  
  // 处理替换的列块
  for (let i = 0; i < value.length; i++) {
    const node = value[i];
    if (node.type === 'p' && typeof node.children[0]?.text === 'string') {
      const text = node.children[0].text;
      const match = text.match(/COLUMN_PLACEHOLDER_(\d+)/);
      
      if (match) {
        const index = parseInt(match[1], 10);
        const pair = columnPairs[index];
        
        if (pair) {
          // 创建两列布局
          const leftColumn = {
            type: ColumnItemPlugin.key,
            width: '50%',
            children: deserializeMd(editor, pair.left),
          };
          
          const rightColumn = {
            type: ColumnItemPlugin.key,
            width: '50%',
            children: deserializeMd(editor, pair.right),
          };
          
          // 替换当前段落为列组
          value[i] = {
            type: ColumnPlugin.key,
            children: [leftColumn, rightColumn],
          };
        }
      }
    }
  }
  
  return value;
};