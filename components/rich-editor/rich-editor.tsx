"use client";

import React, { useEffect, useRef } from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { cn } from "@/lib/utils";
import "../../styles/editor.css";
import { useTheme } from "next-themes";

const MenuButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}> = ({ onClick, isActive, children, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    type="button"
    className={cn(
      "px-2 py-1 rounded-md text-sm focus:outline-none",
      isActive
        ? "bg-header text-header-foreground"
        : "bg-card text-card-foreground hover:bg-muted"
    )}
  >
    {children}
  </button>
);
interface RichEditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
}

const RichEditor: React.FC<RichEditorProps> = ({
  onChange,
  initialContent = "",
}) => {
  const hasSetInitialContent = useRef(false);
  const theme = useTheme();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Typography,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      CodeBlock.configure({
        languageClassPrefix: "language-",
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: "Start writing your post...",
        emptyEditorClass: "text-muted-foreground",
      }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class: "ProseMirror",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });
  useEffect(() => {
    if (editor && initialContent && !hasSetInitialContent.current) {
      editor.commands.setContent(initialContent);
      hasSetInitialContent.current = true;
    }
  }, [editor, initialContent]);

  if (!editor) {
    return null;
  }
  return (
    <div className="editor-container bg-background text-foreground ">
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="bubble-menu flex flex-wrap space-x-2 p-2 rounded bg-card shadow"
      >
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          ariaLabel="Toggle Bold"
        >
          <strong>B</strong>
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          ariaLabel="Toggle Italic"
        >
          <em>I</em>
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          ariaLabel="Toggle Underline"
        >
          <u>U</u>
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          ariaLabel="Toggle Strike-through"
        >
          <s>S</s>
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          ariaLabel="Toggle Highlight"
        >
          <span className="bg-yellow-300">H</span>
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: prompt("Enter URL") || "" })
              .run()
          }
          isActive={editor.isActive("link")}
          ariaLabel="Add/Edit Link"
        >
          🔗
        </MenuButton>
      </BubbleMenu>

      <FloatingMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          offset: [0, -100],
        }}
        className="floating-menu flex flex-col p-2 rounded bg-card shadow z-50 max-h-44 overflow-auto "
      >
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          ariaLabel="Heading 1"
        >
          H1
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          ariaLabel="Heading 2"
        >
          H2
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          ariaLabel="Heading 3"
        >
          H3
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          ariaLabel="Toggle Bullet List"
        >
          • List
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          ariaLabel="Toggle Ordered List"
        >
          1. List
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          ariaLabel="Toggle Code Block"
        >
          {"</>"}
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          ariaLabel="Toggle Blockquote"
        >
          “ ”
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          ariaLabel="Insert Table"
          isActive={editor.isActive("table")}
        >
          📄 Table
        </MenuButton>
      </FloatingMenu>

      <EditorContent
        editor={editor}
        className="focus:outline-none  min-h-[calc(100vh-400px)] md:min-h-[calc(100vh-500px)]"
      />
    </div>
  );
};

export default RichEditor;
