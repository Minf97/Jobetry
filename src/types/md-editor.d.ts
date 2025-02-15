declare module '@uiw/react-md-editor' {
  import React from 'react';
  
  export interface MDEditorProps {
    value?: string;
    onChange?: (value?: string) => void;
    height?: number;
    preview?: 'live' | 'edit' | 'preview';
    [key: string]: any;
  }
  
  const MDEditor: React.FC<MDEditorProps> & {
    Markdown: React.FC<{ source: string }>;
  };
  
  export default MDEditor;
} 