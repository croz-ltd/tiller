/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import React, { useEffect, useRef } from "react";

import { Modal, useModal } from "@tiller-ds/alert";
import { Button, IconButton } from "@tiller-ds/core";
import { Input } from "@tiller-ds/form-elements";
import { DropdownMenu } from "@tiller-ds/menu";
import { useIcon, useTokens } from "@tiller-ds/theme";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { DOMConversionMap, DOMConversionOutput, SerializedTextNode } from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html";

import {
  $isListNode,
  ListNode,
  ListItemNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListType,
} from "@lexical/list";
import { $isLinkNode, TOGGLE_LINK_COMMAND, LinkNode } from "@lexical/link";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import { $createHeadingNode, HeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { INSERT_TABLE_COMMAND, TableNode, TableCellNode, TableRowNode } from "@lexical/table";

import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from "@lexical/utils";

import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  $isRootOrShadowRoot,
  NodeKey,
  RangeSelection,
  TextNode,
  ElementNode,
  ElementFormatType,
  $isElementNode,
  LexicalEditor,
  $getRoot,
  $insertNodes,
} from "lexical";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary.prod";

type TillerListType = ListType | "none";

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

const sanitizeUrl = (url: string): string => {
  /** A pattern that matches safe  URLs. */
  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;

  /** A pattern that matches safe data URLs. */
  const DATA_URL_PATTERN =
    /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  url = String(url).trim();

  if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN)) return url;

  return `https://`;
};

function RichTextEditorToolbar(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = React.useState(editor);
  const [selectedElementKey, setSelectedElementKey] = React.useState<NodeKey | null>(null);
  const [isBold, setIsBold] = React.useState<boolean>(false);
  const [isItalic, setIsItalic] = React.useState<boolean>(false);
  const [isUnderline, setIsUnderline] = React.useState<boolean>(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState<boolean>(false);
  const [isLink, setIsLink] = React.useState<boolean>(false);
  const [linkURL, setLinkURL] = React.useState<string>("");
  const [canUndo, setCanUndo] = React.useState<boolean>(false);
  const [canRedo, setCanRedo] = React.useState<boolean>(false);
  const [blockType, setBlockType] = React.useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [listType, setListType] = React.useState<TillerListType>("none");
  const [elementAlign, setElementAlign] = React.useState<ElementFormatType>("left");
  const [tableRowsInput, setTableRowsInput] = React.useState<string>("3");
  const [tableColsInput, setTableColsInput] = React.useState<string>("3");

  const iconProps = { size: 3 };
  const undoIcon = useIcon("undo", undefined, iconProps);
  const redoIcon = useIcon("redo", undefined, iconProps);
  const listBulletsIcon = useIcon("listBullets", undefined, iconProps);
  const listNumbersIcon = useIcon("listNumbers", undefined, iconProps);
  const textItalicIcon = useIcon("textItalic", undefined, iconProps);
  const textBolderIcon = useIcon("textBolder", undefined, iconProps);
  const textUnderlineIcon = useIcon("textUnderline", undefined, iconProps);
  const textStrikethroughIcon = useIcon("textStrikethrough", undefined, iconProps);
  const textIndentIcon = useIcon("textIndent", undefined, iconProps);
  const textOutdentIcon = useIcon("textOutdent", undefined, iconProps);
  const textAlignLeftIcon = useIcon("textAlignLeft", undefined, iconProps);
  const textAlignCenterIcon = useIcon("textAlignCenter", undefined, iconProps);
  const textAlignRightIcon = useIcon("textAlignRight", undefined, iconProps);
  const textAlignJustifyIcon = useIcon("textAlignJustify", undefined, iconProps);
  const tableIcon = useIcon("table", undefined, iconProps);
  const linkIcon = useIcon("link", undefined, iconProps);
  const linkBreakIcon = useIcon("linkBreak", undefined, iconProps);

  const handleInputRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableRowsInput(event.target.value);
  };

  const handleInputColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableColsInput(event.target.value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkURL(event.target.value);
  };

  const tableModal = useModal();
  const linkModal = useModal();

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent)) {
        setLinkURL(parent.getURL());
        setIsLink(true);
      } else if ($isLinkNode(node)) {
        setLinkURL(node.getURL());
        setIsLink(true);
      } else {
        setLinkURL("");
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);

        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType("paragraph");

          if (type === "bullet") {
            setListType("bullet");
          } else if (type === "number") {
            setListType("number");
          }

          const elementItem = $getNearestNodeOfType<ElementNode>(anchorNode, ElementNode);
          if (elementItem && $isElementNode(element)) {
            setElementAlign(elementItem.getFormatType());
          }
        } else {
          setElementAlign(element.getFormatType());

          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
            setListType("none");
          }
        }
      }
    }
  }, [activeEditor]);

  const updateSelectionToParagraphNode = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (listType === "none") {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      }
    });
  };

  const toggleBullet = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (listType === "bullet") {
          $wrapNodes(selection, () => $createParagraphNode());
        } else {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }
      }
    });
  };

  const toggleOrderedList = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (listType === "number") {
          $wrapNodes(selection, () => $createParagraphNode());
        } else {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }
      }
    });
  };

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateToolbar]);

  React.useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [editor, activeEditor, updateToolbar]);

  const buttonClasses = "text-black px-1 py-1 rounded flex items-center justify-center";
  const buttonClassesDisabled = "text-neutral-400 px-1 py-1 rounded flex items-center justify-center";
  const buttonClassesActive = "bg-neutral-200 text-black px-1 py-1 rounded flex items-center justify-center";

  return (
    <div className="bg-neutral-50 border border-neutral-100 flex flex-wrap items-center gap-2 px-1 py-1">
      <IconButton
        icon={undoIcon}
        label="Undo"
        buttonClassName={canUndo ? buttonClasses : buttonClassesDisabled}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      />
      <IconButton
        icon={redoIcon}
        label="Redo"
        buttonClassName={canRedo ? buttonClasses : buttonClassesDisabled}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
      />

      <DropdownMenu title={blockTypeToBlockName[blockType]} className="bg-transparent border-0" menuType="icon">
        <DropdownMenu.Item onSelect={updateSelectionToParagraphNode}>Normal</DropdownMenu.Item>
        {[...Array(6)].map((e, i) => (
          <DropdownMenu.Item
            onSelect={() => {
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  $wrapNodes(selection, () => $createHeadingNode(`h${i + 1}`));
                }
              });
            }}
          >
            Heading {i + 1}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu>
      <IconButton
        icon={listBulletsIcon}
        label="Unordered list"
        buttonClassName={listType === "bullet" ? buttonClassesActive : buttonClasses}
        onClick={toggleBullet}
      />
      <IconButton
        icon={listNumbersIcon}
        label="Ordered list"
        buttonClassName={listType === "number" ? buttonClassesActive : buttonClasses}
        onClick={toggleOrderedList}
      />
      <IconButton
        icon={textItalicIcon}
        label="Italic"
        buttonClassName={isItalic ? buttonClassesActive : buttonClasses}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      />
      <IconButton
        icon={textBolderIcon}
        label="Bold"
        buttonClassName={isBold ? buttonClassesActive : buttonClasses}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      />
      <IconButton
        icon={textUnderlineIcon}
        label="Underline"
        buttonClassName={isUnderline ? buttonClassesActive : buttonClasses}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      />
      <IconButton
        icon={textStrikethroughIcon}
        label="Strikethrough"
        buttonClassName={isStrikethrough ? buttonClassesActive : buttonClasses}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      />
      <IconButton
        icon={textIndentIcon}
        label="Indent"
        buttonClassName={buttonClasses}
        onClick={() => {
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }}
      />
      <IconButton
        icon={textOutdentIcon}
        label="Outdent"
        buttonClassName={buttonClasses}
        onClick={() => {
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        }}
      />
      <IconButton
        icon={textAlignLeftIcon}
        label="Left align"
        buttonClassName={elementAlign === "left" || elementAlign === "" ? buttonClassesActive : buttonClasses}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
      />
      <IconButton
        icon={textAlignCenterIcon}
        label="Center align"
        buttonClassName={elementAlign === "center" ? buttonClassesActive : buttonClasses}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
      />
      <IconButton
        icon={textAlignRightIcon}
        label="Right align"
        buttonClassName={elementAlign === "right" ? buttonClassesActive : buttonClasses}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
      />
      <IconButton
        icon={textAlignJustifyIcon}
        label="Justify"
        buttonClassName={elementAlign === "justify" ? buttonClassesActive : buttonClasses}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
      />

      <IconButton icon={tableIcon} label="Insert table" buttonClassName={buttonClasses} onClick={tableModal.onOpen} />
      <IconButton
        icon={isLink ? linkBreakIcon : linkIcon}
        label={isLink ? "Edit link" : "Insert link"}
        buttonClassName={isLink ? buttonClassesActive : buttonClasses}
        onClick={linkModal.onOpen}
      />

      <Modal {...tableModal}>
        <Modal.Content title="Insert table">
          <div className="mb-3">
            <Input name="rows" label="Rows" onChange={handleInputRowsChange} value={tableRowsInput} />
          </div>
          <div>
            <Input name="columns" label="Columns" onChange={handleInputColsChange} value={tableColsInput} />
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button
            color="primary"
            onClick={() => {
              editor.dispatchCommand(INSERT_TABLE_COMMAND, {
                rows: tableRowsInput,
                columns: tableColsInput,
                includeHeaders: false,
              });
              tableModal.onClose();
            }}
          >
            Add table
          </Button>
          <Button onClick={tableModal.onClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal {...linkModal}>
        <Modal.Content title="Add link">
          <Input name="link" label="Link URL" onChange={handleLinkChange} value={linkURL} />
        </Modal.Content>

        <Modal.Footer>
          <Button
            color="primary"
            onClick={() => {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(linkURL));
              linkModal.onClose();
            }}
          >
            Add link
          </Button>
          <Button onClick={linkModal.onClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
              linkModal.onClose();
            }}
            color="danger"
            className="sm:mr-auto"
          >
            Remove link
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

type RichTextEditorProps = {
  /**
   * Initial HTML content to be set.
   *
   * When adding styles in `initialHtml` follow these rules:
   * <ul>
   *     <li>Italic - use <code>strong</code> tag</li>
   *     <li>Bold - use <code>strong</code> tag</li>
   *     <li>Underline - use <code>u</code> tag</li>
   *     <li>Strikethrough - use <code>s</code> tag</li>
   *     <li>Headers - use <code>h1-h6</code> tags</li>
   *     <li>Unordered list - use <code>ul</code> and <code>li</code> tags</li>
   *     <li>Ordered list - use <code>ol</code> and <code>li</code> tags</li>
   *     <li>Text align - use <code>style="text-align: left|center|right|justify;"</code> on <code>p</code> tag</li>
   *     <li>Link - use <code>a</code> tag</li>
   *     <li>Text indentation - use <code>style="text-indent: (20|40|60|...)px;"</code> on <code>p</code> tag</li>
   *     <li>Table - use standard table tags: <code>table</code>, <code>thead</code>, <code>tbody</code>, <code>th</code>, <code>td</code></li>
   * </ul>
   */
  initialHtml?: string;

  /**
   * Callback function invoked when the HTML content changes.
   * @param html The updated HTML content.
   */
  onHtmlChange?: (html: string) => void;
};

export default function RichTextEditor({ initialHtml, onHtmlChange }: RichTextEditorProps) {
  const linkTokens = useTokens("Link");
  const typographyTokens = useTokens("Typography");

  const generateHeadingStyles = (headingType) => {
    return Object.values(typographyTokens.variant[headingType]).join(" ");
  };

  const generateLinkStyles = () => {
    return `${linkTokens.color.main} ${linkTokens.base.fontSize} ${linkTokens.base.fontWeight} ${linkTokens.master}`;
  };

  const generateParagraphStyles = () => {
    return `${typographyTokens.variant.text.fontSize} ${typographyTokens.variant.text.color}`;
  };

  const tillerLexicalTheme = {
    ltr: "ltr",
    paragraph: generateParagraphStyles(),
    heading: {
      h1: generateHeadingStyles("h1"),
      h2: generateHeadingStyles("h2"),
      h3: generateHeadingStyles("h3"),
      h4: generateHeadingStyles("h4"),
      h5: generateHeadingStyles("h5"),
      h6: generateHeadingStyles("h6"),
    },
    list: {
      nested: {
        listitem: "list-none",
      },
      ul: "list-disc list-inside pl-5",
      ol: "list-decimal list-inside pl-5",
    },
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
      strikethrough: "line-through",
    },
    link: generateLinkStyles(),
    table: "table-fixed w-full",
    tableCell: "border px-2 py-2",
    tableCellHeader: "bg-gray-100",
  };

  const onError = (e) => {
    console.error(e);
  };

  const initialConfig = {
    namespace: "TillerEditor",
    theme: tillerLexicalTheme,
    nodes: [
      ExtendedTextNode,
      { replace: TextNode, with: (node: TextNode) => new ExtendedTextNode(node.__text) },
      ListNode,
      ListItemNode,
      HeadingNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      LinkNode,
    ],
    onError,
  };

  const richTextEditorClasses = "px-3 py-3 focus:outline-0 bg-white rounded";
  const placeholderClasses = "absolute left-3 top-2 text-neutral-400";

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextEditorToolbar />
      <TablePlugin />
      <LinkPlugin />
      <HistoryPlugin />
      <ListPlugin />
      <div className="relative border border-neutral-100 border-t-0">
        <RichTextPlugin
          contentEditable={<ContentEditable className={richTextEditorClasses} style={{ minHeight: 250 }} />}
          placeholder={<div className={placeholderClasses}>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <InitEditor initialHtml={initialHtml} />
      <OnChange onHtmlChange={onHtmlChange} />
    </LexicalComposer>
  );
}

type OnChangeProps = {
  onHtmlChange?: (html: string) => void;
};

function OnChange({ onHtmlChange }: OnChangeProps) {
  const [editor] = useLexicalComposerContext();
  const lastHtml = useRef<string | undefined>();

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        if (onHtmlChange) {
          const html = getHtmlOfEditor(editor);
          if (lastHtml.current !== html) {
            onHtmlChange(html);
            lastHtml.current = html;
          }
        }
      });
    });
  }, [editor, onHtmlChange]);

  return null;
}

function getHtmlOfEditor(editor: LexicalEditor): string {
  const htmlString = $generateHtmlFromNodes(editor);
  const htmlObject = document.createElement("div");
  htmlObject.innerHTML = htmlString;

  //cleanup
  for (const pElem of htmlObject.getElementsByTagName("p")) {
    pElem.removeAttribute("dir");
  }

  return htmlObject.innerHTML;
}

type InitEditorProps = {
  initialHtml?: string;
};

function InitEditor({ initialHtml }: InitEditorProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    initialHtml &&
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialHtml, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.selectEnd();
        $insertNodes(nodes);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return null;
}

export class ExtendedTextNode extends TextNode {
  static getType(): string {
    return "extended-text";
  }

  static clone(node: ExtendedTextNode): ExtendedTextNode {
    return new ExtendedTextNode(node.__text, node.__key);
  }

  static importDOM(): DOMConversionMap | null {
    const importers = TextNode.importDOM();
    return {
      ...importers,
      p: () => ({
        conversion: convertParagraphElement,
        priority: 1,
      }),
    };
  }

  static importJSON(serializedNode: SerializedTextNode): TextNode {
    return TextNode.importJSON(serializedNode);
  }

  isSimpleText() {
    return (this.__type === "text" || this.__type === "extended-text") && this.__mode === 0;
  }

  exportJSON(): SerializedTextNode {
    return {
      ...super.exportJSON(),
      type: "extended-text",
      version: 1,
    };
  }
}

function convertParagraphElement(element: HTMLElement): DOMConversionOutput {
  const node = $createParagraphNode();
  if (element.style) {
    node.setFormat(element.style.textAlign as ElementFormatType);
    const indent = parseInt(element.style.textIndent, 10) / 20;
    if (indent > 0) {
      node.setIndent(indent);
    }
  }
  return { node };
}
