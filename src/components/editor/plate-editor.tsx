"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Plate } from "@udecode/plate/react";

import { useCreateEditor } from "@/components/editor/use-create-editor";
import { SettingsDialog } from "@/components/editor/settings";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { serializeHtml } from "@udecode/plate";

export function PlateEditor() {
  const editor = useCreateEditor();
  const html = serializeHtml(editor, {
    nodes: editor.children,
  });

  console.log(html,"html");
  

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="demo" onChange={(e) => {
            console.log(e);
            
          }} placeholder="Type..." />
        </EditorContainer>
        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}

PlateEditor.displayName = "PlateEditor";
