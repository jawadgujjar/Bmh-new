"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { Button, Tooltip, Upload, message } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  UndoOutlined,
  RedoOutlined,
  CodeOutlined,
  HighlightOutlined,
  TableOutlined,
  ClearOutlined,
} from "@ant-design/icons";

const lowlight = createLowlight(common);

/* ================= IMAGE UPLOAD ================= */

const ImageUploadButton = ({ editor }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        editor
          .chain()
          .focus()
          .setImage({
            src: data.url,
            alt: file.name,
            title: file.name,
          })
          .run();

        message.success("Image uploaded successfully!");
      } else {
        message.error(data.error || "Upload failed");
      }
    } catch (err) {
      message.error("Upload failed");
    } finally {
      setUploading(false);
    }

    return false;
  };

  return (
    <Upload
      accept="image/*"
      beforeUpload={handleUpload}
      showUploadList={false}
    >
      <Button
        type="text"
        loading={uploading}
        icon={<PictureOutlined />}
      >
        Image
      </Button>
    </Upload>
  );
};

/* ================= TOOLBAR ================= */

const TipTapToolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderBottom: "none",
        padding: 10,
        background: "#fafafa",
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
      }}
    >
      <Button.Group>
        <Button
          type={editor.isActive("bold") ? "primary" : "text"}
          icon={<BoldOutlined />}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <Button
          type={editor.isActive("italic") ? "primary" : "text"}
          icon={<ItalicOutlined />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <Button
          type={editor.isActive("underline") ? "primary" : "text"}
          icon={<UnderlineOutlined />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <Button
          icon={<ClearOutlined />}
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        />
      </Button.Group>

      <Button.Group>
        <Button
          icon={<AlignLeftOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <Button
          icon={<AlignCenterOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />
        <Button
          icon={<AlignRightOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />
      </Button.Group>

      <Button.Group>
        <Button
          icon={<UnorderedListOutlined />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <Button
          icon={<OrderedListOutlined />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </Button.Group>

      <Button.Group>
        <Button
          icon={<CodeOutlined />}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <Button
          icon={<HighlightOutlined />}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        />
        <Button
          icon={<TableOutlined />}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        />
      </Button.Group>

      <Button.Group>
        <Button
          icon={<LinkOutlined />}
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              const finalUrl = url.startsWith("http")
                ? url
                : `/${url}`;
              editor.chain().focus().setLink({ href: finalUrl }).run();
            }
          }}
        />
        <ImageUploadButton editor={editor} />
      </Button.Group>

      <Button.Group>
        <Button
          icon={<UndoOutlined />}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <Button
          icon={<RedoOutlined />}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </Button.Group>
    </div>
  );
};

/* ================= MAIN EDITOR ================= */

const TipTapEditor = ({ value = "", onChange }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing here...",
      }),
      Highlight,
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: false,
  });

  /* 🔥 IMPORTANT FOR EDIT MODE */
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!mounted || !editor) {
    return <div style={{ padding: 20 }}>Loading editor...</div>;
  }

  return (
    <div style={{ border: "1px solid #d9d9d9", borderRadius: 8 }}>
      <TipTapToolbar editor={editor} />
      <div style={{ padding: 20, minHeight: 300 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;