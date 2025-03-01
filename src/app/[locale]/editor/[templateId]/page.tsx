"use client";
import BottomDock from "@/components/editor/BottomDock";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SettingsDialog, SettingsProvider } from "@/components/editor/settings";
import { useState } from "react";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { Plate, useEditorString } from "@udecode/plate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  editorStaticComponents,
  useCreateEditor,
  useCreateEditorStatic,
} from "@/components/editor/use-create-editor";
import { EditorStatic } from "@/components/plate-ui/editor-static";

export default function Page() {
  const t = useTranslations("editor");
  const [editorValue, setEditorValue] = useState("");
  const editor = useCreateEditor();
  const editorStatic = useCreateEditorStatic(editorValue);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onValueChange={(e) => {
          setEditorValue(e?.value as any);
        }}
      >
        <div className="min-h-screen bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 左侧编辑区 */}
            <div
              className="bg-editor-paper p-4 shadow-sm h-screen w-full"
              data-registry="plate"
            >
              <SettingsProvider>
                <EditorContainer>
                  <Editor
                    variant="demo"
                    onChange={(e) => {
                      console.log(e);
                    }}
                    placeholder="Type..."
                  />
                </EditorContainer>
                <SettingsDialog />
              </SettingsProvider>
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
                        <EditorStatic
                          components={editorStaticComponents}
                          editor={editorStatic}
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
      </Plate>
    </DndProvider>
  );
}
