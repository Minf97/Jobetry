"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plate, PlateContent, usePlateEditor } from "@udecode/plate/react";
import { editorComponents, useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { editorPlugins } from "@/components/editor/plugins/editor-plugins";



import Prism from 'prismjs';
import { withProps } from '@udecode/cn';
import {
  type Value,
  BaseParagraphPlugin,
  createSlateEditor,
  serializeHtml,
  SlateLeaf,
} from '@udecode/plate';
import { BaseAlignPlugin } from '@udecode/plate-alignment';
import {
  BaseBoldPlugin,
  BaseCodePlugin,
  BaseItalicPlugin,
  BaseStrikethroughPlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  BaseUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { BaseBlockquotePlugin } from '@udecode/plate-block-quote';
import {
  BaseCodeBlockPlugin,
  BaseCodeLinePlugin,
  BaseCodeSyntaxPlugin,
} from '@udecode/plate-code-block';
import { BaseCommentsPlugin } from '@udecode/plate-comments';
import { BaseDatePlugin } from '@udecode/plate-date';
import {
  BaseFontBackgroundColorPlugin,
  BaseFontColorPlugin,
  BaseFontSizePlugin,
} from '@udecode/plate-font';
import {
  BaseHeadingPlugin,
  BaseTocPlugin,
  HEADING_KEYS,
  HEADING_LEVELS,
} from '@udecode/plate-heading';
import { BaseHighlightPlugin } from '@udecode/plate-highlight';
import { BaseHorizontalRulePlugin } from '@udecode/plate-horizontal-rule';
import { BaseIndentPlugin } from '@udecode/plate-indent';
import { BaseIndentListPlugin } from '@udecode/plate-indent-list';
import { BaseKbdPlugin } from '@udecode/plate-kbd';
import { BaseColumnItemPlugin, BaseColumnPlugin } from '@udecode/plate-layout';
import { BaseLineHeightPlugin } from '@udecode/plate-line-height';
import { BaseLinkPlugin } from '@udecode/plate-link';
import {
  BaseEquationPlugin,
  BaseInlineEquationPlugin,
} from '@udecode/plate-math';
import {
  BaseAudioPlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMediaEmbedPlugin,
  BaseVideoPlugin,
} from '@udecode/plate-media';
import { BaseMentionPlugin } from '@udecode/plate-mention';
import {
  BaseTableCellHeaderPlugin,
  BaseTableCellPlugin,
  BaseTablePlugin,
  BaseTableRowPlugin,
} from '@udecode/plate-table';
import { BaseTogglePlugin } from '@udecode/plate-toggle';

// import {
//   EditorClient,
//   ExportHtmlButton,
//   HtmlIframe,
// } from '@/components/editor/slate-to-html';
import { BlockquoteElementStatic } from '@/components/plate-ui/blockquote-element-static';
import { CodeBlockElementStatic } from '@/components/plate-ui/code-block-element-static';
import { CodeLeafStatic } from '@/components/plate-ui/code-leaf-static';
import { CodeLineElementStatic } from '@/components/plate-ui/code-line-element-static';
import { CodeSyntaxLeafStatic } from '@/components/plate-ui/code-syntax-leaf-static';
import { ColumnElementStatic } from '@/components/plate-ui/column-element-static';
import { ColumnGroupElementStatic } from '@/components/plate-ui/column-group-element-static';
import { CommentLeafStatic } from '@/components/plate-ui/comment-leaf-static';
import { DateElementStatic } from '@/components/plate-ui/date-element-static';
import { EditorStatic } from '@/components/plate-ui/editor-static';
import { EquationElementStatic } from '@/components/plate-ui/equation-element-static';
import { HeadingElementStatic } from '@/components/plate-ui/heading-element-static';
import { HighlightLeafStatic } from '@/components/plate-ui/highlight-leaf-static';
import { HrElementStatic } from '@/components/plate-ui/hr-element-static';
import { ImageElementStatic } from '@/components/plate-ui/image-element-static';
import {
  FireLiComponent,
  FireMarker,
} from '@/components/plate-ui/indent-fire-marker';
import {
  TodoLiStatic,
  TodoMarkerStatic,
} from '@/components/plate-ui/indent-todo-marker-static';
import { InlineEquationElementStatic } from '@/components/plate-ui/inline-equation-element-static';
import { KbdLeafStatic } from '@/components/plate-ui/kbd-leaf-static';
import { LinkElementStatic } from '@/components/plate-ui/link-element-static';
import { MediaAudioElementStatic } from '@/components/plate-ui/media-audio-element-static';
import { MediaFileElementStatic } from '@/components/plate-ui/media-file-element-static';
import { MediaVideoElementStatic } from '@/components/plate-ui/media-video-element-static';
import { MentionElementStatic } from '@/components/plate-ui/mention-element-static';
import { ParagraphElementStatic } from '@/components/plate-ui/paragraph-element-static';
import {
  TableCellElementStatic,
  TableCellHeaderStaticElement,
} from '@/components/plate-ui/table-cell-element-static';
import { TableElementStatic } from '@/components/plate-ui/table-element-static';
import { TableRowElementStatic } from '@/components/plate-ui/table-row-element-static';
import { TocElementStatic } from '@/components/plate-ui/toc-element-static';
import { ToggleElementStatic } from '@/components/plate-ui/toggle-element-static';

export default function TestPage() {
  const components = {
    [BaseAudioPlugin.key]: MediaAudioElementStatic,
    [BaseBlockquotePlugin.key]: BlockquoteElementStatic,
    [BaseBoldPlugin.key]: withProps(SlateLeaf, { as: 'strong' }),
    [BaseCodeBlockPlugin.key]: CodeBlockElementStatic,
    [BaseCodeLinePlugin.key]: CodeLineElementStatic,
    [BaseCodePlugin.key]: CodeLeafStatic,
    [BaseCodeSyntaxPlugin.key]: CodeSyntaxLeafStatic,
    [BaseColumnItemPlugin.key]: ColumnElementStatic,
    [BaseColumnPlugin.key]: ColumnGroupElementStatic,
    [BaseCommentsPlugin.key]: CommentLeafStatic,
    [BaseDatePlugin.key]: DateElementStatic,
    [BaseEquationPlugin.key]: EquationElementStatic,
    [BaseFilePlugin.key]: MediaFileElementStatic,
    [BaseHighlightPlugin.key]: HighlightLeafStatic,
    [BaseHorizontalRulePlugin.key]: HrElementStatic,
    [BaseImagePlugin.key]: ImageElementStatic,
    [BaseInlineEquationPlugin.key]: InlineEquationElementStatic,
    [BaseItalicPlugin.key]: withProps(SlateLeaf, { as: 'em' }),
    [BaseKbdPlugin.key]: KbdLeafStatic,
    [BaseLinkPlugin.key]: LinkElementStatic,
    // [BaseMediaEmbedPlugin.key]: MediaEmbedElementStatic,
    [BaseMentionPlugin.key]: MentionElementStatic,
    [BaseParagraphPlugin.key]: ParagraphElementStatic,
    [BaseStrikethroughPlugin.key]: withProps(SlateLeaf, { as: 'del' }),
    [BaseSubscriptPlugin.key]: withProps(SlateLeaf, { as: 'sub' }),
    [BaseSuperscriptPlugin.key]: withProps(SlateLeaf, { as: 'sup' }),
    [BaseTableCellHeaderPlugin.key]: TableCellHeaderStaticElement,
    [BaseTableCellPlugin.key]: TableCellElementStatic,
    [BaseTablePlugin.key]: TableElementStatic,
    [BaseTableRowPlugin.key]: TableRowElementStatic,
    [BaseTocPlugin.key]: TocElementStatic,
    [BaseTogglePlugin.key]: ToggleElementStatic,
    [BaseUnderlinePlugin.key]: withProps(SlateLeaf, { as: 'u' }),
    [BaseVideoPlugin.key]: MediaVideoElementStatic,
    [HEADING_KEYS.h1]: withProps(HeadingElementStatic, { variant: 'h1' }),
    [HEADING_KEYS.h2]: withProps(HeadingElementStatic, { variant: 'h2' }),
    [HEADING_KEYS.h3]: withProps(HeadingElementStatic, { variant: 'h3' }),
    [HEADING_KEYS.h4]: withProps(HeadingElementStatic, { variant: 'h4' }),
    [HEADING_KEYS.h5]: withProps(HeadingElementStatic, { variant: 'h5' }),
    [HEADING_KEYS.h6]: withProps(HeadingElementStatic, { variant: 'h6' }),
  };
  // const editorTxt = usePlateEditor();
  const editorTxt = useCreateEditor();

  const [editorTxtValue, setEditorTxtValue] = useState('');

  // const editor = createSlateEditor({
  //   plugins: [
  //     BaseEquationPlugin,
  //     BaseInlineEquationPlugin,
  //     BaseColumnPlugin,
  //     BaseColumnItemPlugin,
  //     BaseTocPlugin,
  //     BaseVideoPlugin,
  //     BaseAudioPlugin,
  //     BaseParagraphPlugin,
  //     BaseHeadingPlugin,
  //     BaseMediaEmbedPlugin,
  //     BaseBoldPlugin,
  //     BaseCodePlugin,
  //     BaseItalicPlugin,
  //     BaseStrikethroughPlugin,
  //     BaseSubscriptPlugin,
  //     BaseSuperscriptPlugin,
  //     BaseUnderlinePlugin,
  //     BaseBlockquotePlugin,
  //     BaseDatePlugin,
  //     BaseCodeBlockPlugin.configure({
  //       options: {
  //         prism: Prism,
  //       },
  //     }),
  //     BaseIndentPlugin.extend({
  //       inject: {
  //         targetPlugins: [
  //           BaseParagraphPlugin.key,
  //           BaseBlockquotePlugin.key,
  //           BaseCodeBlockPlugin.key,
  //         ],
  //       },
  //     }),
  //     BaseIndentListPlugin.extend({
  //       inject: {
  //         targetPlugins: [
  //           BaseParagraphPlugin.key,
  //           ...HEADING_LEVELS,
  //           BaseBlockquotePlugin.key,
  //           BaseCodeBlockPlugin.key,
  //           BaseTogglePlugin.key,
  //         ],
  //       },
  //       options: {
  //         listStyleTypes: {
  //           fire: {
  //             liComponent: FireLiComponent,
  //             markerComponent: FireMarker,
  //             type: 'fire',
  //           },
  //           todo: {
  //             liComponent: TodoLiStatic,
  //             markerComponent: TodoMarkerStatic,
  //             type: 'todo',
  //           },
  //         },
  //       },
  //     }),
  //     BaseLinkPlugin,
  //     BaseTableRowPlugin,
  //     BaseTablePlugin,
  //     BaseTableCellPlugin,
  //     BaseHorizontalRulePlugin,
  //     BaseFontColorPlugin,
  //     BaseFontBackgroundColorPlugin,
  //     BaseFontSizePlugin,
  //     BaseKbdPlugin,
  //     BaseAlignPlugin.extend({
  //       inject: {
  //         targetPlugins: [
  //           BaseParagraphPlugin.key,
  //           BaseMediaEmbedPlugin.key,
  //           ...HEADING_LEVELS,
  //           BaseImagePlugin.key,
  //         ],
  //       },
  //     }),
  //     BaseLineHeightPlugin,
  //     BaseHighlightPlugin,
  //     BaseFilePlugin,
  //     BaseImagePlugin,
  //     BaseMentionPlugin,
  //     BaseCommentsPlugin,
  //     BaseTogglePlugin,
  //   ],
  //   value:editorTxtValue
  // });

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* 左侧编辑区 */}
      <div className="border rounded-lg p-4">
        <DndProvider backend={HTML5Backend}>
          <Plate editor={editorTxt} onChange={(e)=>{
            setEditorTxtValue(e.value)
          }}>
          {/* <PlateContent placeholder="Type..." /> */}
            <EditorContainer>
              <Editor 
                variant="default"
                placeholder="开始编辑..." 
                // onChange={updateHtml}
              />
            </EditorContainer>
          </Plate>
        </DndProvider>
      </div>

      {/* 右侧预览区 */}
      <div className="border rounded-lg p-4">
        {/* <div 
          className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: html }}
        /> */}
        {/* <EditorStatic components={components} editor={editor} /> */}
      </div>
    </div>
  );
}
