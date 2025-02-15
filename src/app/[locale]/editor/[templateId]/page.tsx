"use client";
import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import BottomDock from "@/components/editor/BottomDock";

export default function Editor({ params }: { params: { templateId: string } }) {
  console.log(params);
  
  const [markdown, setMarkdown] = useState("# 我的简历\n\n## 个人简介\n\n请在这里编写您的个人简介...");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      <div className="container mx-auto grid grid-cols-2 gap-8 p-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">编辑简历信息</h2>
          <div data-color-mode="light">
            <MDEditor
              value={markdown}
              onChange={(val) => setMarkdown(val || '')}
              height={600}
              preview="edit"
            />
          </div>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h3 className="mb-4 text-xl font-bold">预览</h3>
          <div data-color-mode="light">
            <MDEditor.Markdown source={markdown} />
          </div>
        </div>
      </div>
      
      {/* 底部Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <BottomDock />
      </div>
    </div>
  );
} 