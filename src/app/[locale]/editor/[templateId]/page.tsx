"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import BottomDock from "@/components/editor/BottomDock";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

export default function Editor() {
  const t = useTranslations("editor");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Image,
      TaskList,
      TaskItem,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: t("placeholder"),
      }),
    ],
    content: `# 我的简历

## 个人简介

请在这里编写您的个人简介...`,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert",
          "focus:outline-none max-w-full min-h-[500px]",
          "prose-headings:text-primary dark:prose-headings:text-primary-foreground",
          "prose-p:text-muted-foreground dark:prose-p:text-muted-foreground",
          "prose-strong:text-foreground dark:prose-strong:text-foreground",
          "prose-a:text-primary hover:prose-a:text-primary/80",
          "prose-ul:list-disc prose-ol:list-decimal",
          "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
          "prose-hr:border-border"
        ),
      },
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* 左侧编辑区 */}
        <div className="bg-editor-paper p-4 shadow-sm">
          <EditorContent
            editor={editor}
            className="min-h-[600px] focus-within:outline-none"
          />
        </div>

        {/* 右侧预览区 */}
        <div className="bg-editor-preview p-6 shadow-sm overflow-auto relative">
          <InteractiveGridPattern
            squares={[50, 50]}
            className={cn(
              "lg:[mask-image:radial-gradient(calc(50vw_*_0.6)_circle_at_center,white,transparent)]",
              "max-lg:[mask-image:radial-gradient(calc(100vw_*_0.6)_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
          <div className="flex justify-center">
            {/* A4 纸张容器 */}
            <div className="relative w-full max-w-[794px] mx-auto">
              <div
                className="absolute top-0 left-0 w-full"
                style={{ paddingTop: "141.42%" }} // A4 比例 (297/210 * 100)
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-editor-paper rounded-sm shadow-lg p-8">
                  <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: editor?.getHTML() || "",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部工具栏 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <BottomDock />
      </div>
    </div>
  );
}
