"use client";

import type { Value } from "@udecode/plate";

import { withProps } from "@udecode/cn";
import { AIPlugin } from "@udecode/plate-ai/react";
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from "@udecode/plate-code-block/react";
import { CommentsPlugin } from "@udecode/plate-comments/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { EmojiInputPlugin } from "@udecode/plate-emoji/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
  EquationPlugin,
  InlineEquationPlugin,
} from "@udecode/plate-math/react";
import {  
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from "@udecode/plate-media/react";
import {
  MentionInputPlugin,
  MentionPlugin,
} from "@udecode/plate-mention/react";
import { SlashInputPlugin } from "@udecode/plate-slash-command/react";
import { SuggestionPlugin } from "@udecode/plate-suggestion/react";
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
  type CreatePlateEditorOptions,
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from "@udecode/plate/react";

import { copilotPlugins } from "@/components/editor/plugins/copilot-plugins";
import { editorPlugins } from "@/components/editor/plugins/editor-plugins";
import { AILeaf } from "@/components/plate-ui/ai-leaf";
import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { ColumnElement } from "@/components/plate-ui/column-element";
import { ColumnGroupElement } from "@/components/plate-ui/column-group-element";
import { CommentLeaf } from "@/components/plate-ui/comment-leaf";
import { DateElement } from "@/components/plate-ui/date-element";
import { EmojiInputElement } from "@/components/plate-ui/emoji-input-element";
import { EquationElement } from "@/components/plate-ui/equation-element";
import { ExcalidrawElement } from "@/components/plate-ui/excalidraw-element";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { HrElement } from "@/components/plate-ui/hr-element";
import { ImageElement } from "@/components/plate-ui/image-element";
import { InlineEquationElement } from "@/components/plate-ui/inline-equation-element";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { LinkElement } from "@/components/plate-ui/link-element";
import { MediaAudioElement } from "@/components/plate-ui/media-audio-element";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { MediaFileElement } from "@/components/plate-ui/media-file-element";
import { MediaPlaceholderElement } from "@/components/plate-ui/media-placeholder-element";
import { MediaVideoElement } from "@/components/plate-ui/media-video-element";
import { MentionElement } from "@/components/plate-ui/mention-element";
import { MentionInputElement } from "@/components/plate-ui/mention-input-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { SlashInputElement } from "@/components/plate-ui/slash-input-element";
import { SuggestionLeaf } from "@/components/plate-ui/suggestion-leaf";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/plate-ui/table-cell-element";
import { TableElement } from "@/components/plate-ui/table-element";
import { TableRowElement } from "@/components/plate-ui/table-row-element";
import { TocElement } from "@/components/plate-ui/toc-element";
import { ToggleElement } from "@/components/plate-ui/toggle-element";

import Prism from "prismjs";
import {
  BaseParagraphPlugin,
  createSlateEditor,
  SlateLeaf,
} from "@udecode/plate";
import { BaseAlignPlugin } from "@udecode/plate-alignment";
import {
  BaseBoldPlugin,
  BaseCodePlugin,
  BaseItalicPlugin,
  BaseStrikethroughPlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  BaseUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import { BaseBlockquotePlugin } from "@udecode/plate-block-quote";
import {
  BaseCodeBlockPlugin,
  BaseCodeLinePlugin,
  BaseCodeSyntaxPlugin,
} from "@udecode/plate-code-block";
import { BaseCommentsPlugin } from "@udecode/plate-comments";
import { BaseDatePlugin } from "@udecode/plate-date";
import {
  BaseFontBackgroundColorPlugin,
  BaseFontColorPlugin,
  BaseFontSizePlugin,
} from "@udecode/plate-font";
import {
  BaseHeadingPlugin,
  BaseTocPlugin,
  HEADING_LEVELS,
} from "@udecode/plate-heading";
import { BaseHighlightPlugin } from "@udecode/plate-highlight";
import { BaseHorizontalRulePlugin } from "@udecode/plate-horizontal-rule";
import { BaseIndentPlugin } from "@udecode/plate-indent";
import { BaseIndentListPlugin } from "@udecode/plate-indent-list";
import { BaseKbdPlugin } from "@udecode/plate-kbd";
import { BaseColumnItemPlugin, BaseColumnPlugin } from "@udecode/plate-layout";
import { BaseLineHeightPlugin } from "@udecode/plate-line-height";
import { BaseLinkPlugin } from "@udecode/plate-link";
import {
  BaseEquationPlugin,
  BaseInlineEquationPlugin,
} from "@udecode/plate-math";
import {
  BaseAudioPlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMediaEmbedPlugin,
  BaseVideoPlugin,
} from "@udecode/plate-media";
import { BaseMentionPlugin } from "@udecode/plate-mention";
import {
  BaseTableCellHeaderPlugin,
  BaseTableCellPlugin,
  BaseTablePlugin,
  BaseTableRowPlugin,
} from "@udecode/plate-table";
import { BaseTogglePlugin } from "@udecode/plate-toggle";

// import {
//   EditorClient,
//   ExportHtmlButton,
//   HtmlIframe,
// } from '@/components/editor/slate-to-html';
import { BlockquoteElementStatic } from "@/components/plate-ui/blockquote-element-static";
import { CodeBlockElementStatic } from "@/components/plate-ui/code-block-element-static";
import { CodeLeafStatic } from "@/components/plate-ui/code-leaf-static";
import { CodeLineElementStatic } from "@/components/plate-ui/code-line-element-static";
import { CodeSyntaxLeafStatic } from "@/components/plate-ui/code-syntax-leaf-static";
import { ColumnElementStatic } from "@/components/plate-ui/column-element-static";
import { ColumnGroupElementStatic } from "@/components/plate-ui/column-group-element-static";
import { CommentLeafStatic } from "@/components/plate-ui/comment-leaf-static";
import { DateElementStatic } from "@/components/plate-ui/date-element-static";
import { EditorStatic } from "@/components/plate-ui/editor-static";
import { EquationElementStatic } from "@/components/plate-ui/equation-element-static";
import { HeadingElementStatic } from "@/components/plate-ui/heading-element-static";
import { HighlightLeafStatic } from "@/components/plate-ui/highlight-leaf-static";
import { HrElementStatic } from "@/components/plate-ui/hr-element-static";
import { ImageElementStatic } from "@/components/plate-ui/image-element-static";
import {
  FireLiComponent,
  FireMarker,
} from "@/components/plate-ui/indent-fire-marker";
import {
  TodoLiStatic,
  TodoMarkerStatic,
} from "@/components/plate-ui/indent-todo-marker-static";
import { InlineEquationElementStatic } from "@/components/plate-ui/inline-equation-element-static";
import { KbdLeafStatic } from "@/components/plate-ui/kbd-leaf-static";
import { LinkElementStatic } from "@/components/plate-ui/link-element-static";
import { MediaAudioElementStatic } from "@/components/plate-ui/media-audio-element-static";
import { MediaFileElementStatic } from "@/components/plate-ui/media-file-element-static";
import { MediaVideoElementStatic } from "@/components/plate-ui/media-video-element-static";
import { MentionElementStatic } from "@/components/plate-ui/mention-element-static";
import { ParagraphElementStatic } from "@/components/plate-ui/paragraph-element-static";
import {
  TableCellElementStatic,
  TableCellHeaderStaticElement,
} from "@/components/plate-ui/table-cell-element-static";
import { TableElementStatic } from "@/components/plate-ui/table-element-static";
import { TableRowElementStatic } from "@/components/plate-ui/table-row-element-static";
import { TocElementStatic } from "@/components/plate-ui/toc-element-static";
import { ToggleElementStatic } from "@/components/plate-ui/toggle-element-static";

export const viewComponents = {
  [AudioPlugin.key]: MediaAudioElement,
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [ColumnItemPlugin.key]: ColumnElement,
  [ColumnPlugin.key]: ColumnGroupElement,
  [CommentsPlugin.key]: CommentLeaf,
  [DatePlugin.key]: DateElement,
  [EquationPlugin.key]: EquationElement,
  [ExcalidrawPlugin.key]: ExcalidrawElement,
  [FilePlugin.key]: MediaFileElement,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
  [HighlightPlugin.key]: HighlightLeaf,
  [HorizontalRulePlugin.key]: HrElement,
  [ImagePlugin.key]: ImageElement,
  [InlineEquationPlugin.key]: InlineEquationElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [MediaEmbedPlugin.key]: MediaEmbedElement,
  [MentionPlugin.key]: MentionElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [PlaceholderPlugin.key]: MediaPlaceholderElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
  [SuggestionPlugin.key]: SuggestionLeaf,
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
  [TableCellHeaderPlugin.key]: TableCellHeaderElement,
  [TableCellPlugin.key]: TableCellElement,
  [TablePlugin.key]: TableElement,
  [TableRowPlugin.key]: TableRowElement,
  [TocPlugin.key]: TocElement,
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
  [VideoPlugin.key]: MediaVideoElement,
};

export const editorComponents = {
  ...viewComponents,
  [AIPlugin.key]: AILeaf,
  [EmojiInputPlugin.key]: EmojiInputElement,
  [MentionInputPlugin.key]: MentionInputElement,
  [SlashInputPlugin.key]: SlashInputElement,
};

export const editorStaticComponents = {
  [BaseAudioPlugin.key]: MediaAudioElementStatic,
  [BaseBlockquotePlugin.key]: BlockquoteElementStatic,
  [BaseBoldPlugin.key]: withProps(SlateLeaf, { as: "strong" }),
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
  [BaseItalicPlugin.key]: withProps(SlateLeaf, { as: "em" }),
  [BaseKbdPlugin.key]: KbdLeafStatic,
  [BaseLinkPlugin.key]: LinkElementStatic,
  // [BaseMediaEmbedPlugin.key]: MediaEmbedElementStatic,
  [BaseMentionPlugin.key]: MentionElementStatic,
  [BaseParagraphPlugin.key]: ParagraphElementStatic,
  [BaseStrikethroughPlugin.key]: withProps(SlateLeaf, { as: "del" }),
  [BaseSubscriptPlugin.key]: withProps(SlateLeaf, { as: "sub" }),
  [BaseSuperscriptPlugin.key]: withProps(SlateLeaf, { as: "sup" }),
  [BaseTableCellHeaderPlugin.key]: TableCellHeaderStaticElement,
  [BaseTableCellPlugin.key]: TableCellElementStatic,
  [BaseTablePlugin.key]: TableElementStatic,
  [BaseTableRowPlugin.key]: TableRowElementStatic,
  [BaseTocPlugin.key]: TocElementStatic,
  [BaseTogglePlugin.key]: ToggleElementStatic,
  [BaseUnderlinePlugin.key]: withProps(SlateLeaf, { as: "u" }),
  [BaseVideoPlugin.key]: MediaVideoElementStatic,
  [HEADING_KEYS.h1]: withProps(HeadingElementStatic, { variant: "h1" }),
  [HEADING_KEYS.h2]: withProps(HeadingElementStatic, { variant: "h2" }),
  [HEADING_KEYS.h3]: withProps(HeadingElementStatic, { variant: "h3" }),
  [HEADING_KEYS.h4]: withProps(HeadingElementStatic, { variant: "h4" }),
  [HEADING_KEYS.h5]: withProps(HeadingElementStatic, { variant: "h5" }),
  [HEADING_KEYS.h6]: withProps(HeadingElementStatic, { variant: "h6" }),
};

export const useCreateEditor = (
  {
    components,
    override,
    readOnly,
    ...options
  }: {
    components?: Record<string, any>;
    plugins?: any[];
    readOnly?: boolean;
  } & Omit<CreatePlateEditorOptions, "plugins"> = {},
  deps: any[] = []
) => {
  return usePlateEditor<Value>(
    {
      override: {
        components: {
          ...(readOnly ? viewComponents : withPlaceholders(editorComponents)),
          ...components,
        },
        ...override,
      },
      plugins: [...copilotPlugins, ...editorPlugins],
      value: [
        {
          children: [{ text: "Playground" }],
          type: "h1",
        },
        {
          children: [
            { text: "A rich-text editor with AI capabilities. Try the " },
            { bold: true, text: "AI commands" },
            { text: " or use " },
            { kbd: true, text: "Cmd+J" },
            { text: " to open the AI menu." },
          ],
          type: ParagraphPlugin.key,
        },
      ],
      ...options,
    },
    deps
  );
};

export const useCreateEditorStatic = (value) => {
  return createSlateEditor({
    value: value,
    plugins: [
      BaseEquationPlugin,
      BaseInlineEquationPlugin,
      BaseColumnPlugin,
      BaseColumnItemPlugin,
      BaseTocPlugin,
      BaseVideoPlugin,
      BaseAudioPlugin,
      BaseParagraphPlugin,
      BaseHeadingPlugin,
      BaseMediaEmbedPlugin,
      BaseBoldPlugin,
      BaseCodePlugin,
      BaseItalicPlugin,
      BaseStrikethroughPlugin,
      BaseSubscriptPlugin,
      BaseSuperscriptPlugin,
      BaseUnderlinePlugin,
      BaseBlockquotePlugin,
      BaseDatePlugin,
      BaseCodeBlockPlugin.configure({
        options: {
          prism: Prism,
        },
      }),
      BaseIndentPlugin.extend({
        inject: {
          targetPlugins: [
            BaseParagraphPlugin.key,
            BaseBlockquotePlugin.key,
            BaseCodeBlockPlugin.key,
          ],
        },
      }),
      BaseIndentListPlugin.extend({
        inject: {
          targetPlugins: [
            BaseParagraphPlugin.key,
            ...HEADING_LEVELS,
            BaseBlockquotePlugin.key,
            BaseCodeBlockPlugin.key,
            BaseTogglePlugin.key,
          ],
        },
        options: {
          listStyleTypes: {
            fire: {
              liComponent: FireLiComponent,
              markerComponent: FireMarker,
              type: "fire",
            },
            todo: {
              liComponent: TodoLiStatic,
              markerComponent: TodoMarkerStatic,
              type: "todo",
            },
          },
        },
      }),
      BaseLinkPlugin,
      BaseTableRowPlugin,
      BaseTablePlugin,
      BaseTableCellPlugin,
      BaseHorizontalRulePlugin,
      BaseFontColorPlugin,
      BaseFontBackgroundColorPlugin,
      BaseFontSizePlugin,
      BaseKbdPlugin,
      BaseAlignPlugin.extend({
        inject: {
          targetPlugins: [
            BaseParagraphPlugin.key,
            BaseMediaEmbedPlugin.key,
            ...HEADING_LEVELS,
            BaseImagePlugin.key,
          ],
        },
      }),
      BaseLineHeightPlugin,
      BaseHighlightPlugin,
      BaseFilePlugin,
      BaseImagePlugin,
      BaseMentionPlugin,
      BaseCommentsPlugin,
      BaseTogglePlugin,
    ],
  });
};
