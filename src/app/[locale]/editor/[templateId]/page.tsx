'use client';
import BottomDock from '@/components/editor/BottomDock';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';
import { cn } from '@/lib/utils';
import { SettingsDialog, SettingsProvider } from '@/components/editor/settings';
import { useState } from 'react';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { Plate } from '@udecode/plate/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  editorStaticComponents,
  useCreateEditor,
  useCreateEditorStatic,
} from '@/components/editor/use-create-editor';
import { EditorStatic } from '@/components/plate-ui/editor-static';
import { useDebounceFn } from 'ahooks';
import { RESUME_TEMPLATE } from '@/lib/constant';
import ResumePages from '@/components/editor/ResumePages';

export default function Page() {
  const [editorValue, setEditorValue] = useState(RESUME_TEMPLATE);
  const editor = useCreateEditor({initialValue:RESUME_TEMPLATE});
  const editorStatic = useCreateEditorStatic(editorValue);
  const { run: debounceSet } = useDebounceFn(setEditorValue, { wait: 300 });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* 左侧编辑区 */}
          <div className="bg-editor-paper p-4 shadow-sm h-screen w-full" data-registry="plate">
            <Plate
              editor={editor}
              onValueChange={e => {
                debounceSet(e.value);
              }}
            >
              <SettingsProvider>
                <EditorContainer>
                  <Editor
                    variant="demo"
                    onChange={e => {
                      console.log(e);
                    }}
                    placeholder="Type..."
                  />
                </EditorContainer>
                <SettingsDialog />
              </SettingsProvider>
            </Plate>
          </div>

          {/* 右侧预览区 */}
          <div className="bg-editor-preview p-6 shadow-sm overflow-auto relative">
            <InteractiveGridPattern
              squares={[50, 50]}
              className={cn(
                'lg:[mask-image:radial-gradient(calc(50vw_*_0.6)_circle_at_center,white,transparent)]',
                'max-lg:[mask-image:radial-gradient(calc(100vw_*_0.6)_circle_at_center,white,transparent)]',
                'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
              )}
            />
            <div className="flex justify-center flex-col items-center gap-8">
              {/* 使用动态分页显示内容 */}
              <ResumePages editorValue={editorValue} editorStatic={editorStatic} />
            </div>
          </div>
        </div>

        {/* 底部工具栏 */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <BottomDock />
        </div>
      </div>
    </DndProvider>
  );
}
