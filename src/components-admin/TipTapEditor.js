"use client";

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Button, Tooltip, Upload, message } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
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
  InsertRowLeftOutlined,
  ClearOutlined,
} from "@ant-design/icons";

const lowlight = createLowlight(common);

// ImageUploadButton Component
const ImageUploadButton = ({ editor }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        editor.chain().focus().setImage({ 
          src: data.url,
          alt: file.name,
          title: file.name 
        }).run();
        message.success('Image uploaded successfully!');
      } else {
        message.error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      message.error('Upload failed');
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
      maxCount={1}
    >
      <Button 
        type="text" 
        loading={uploading}
        icon={<PictureOutlined />}
      >
        Upload Image
      </Button>
    </Upload>
  );
};

// Toolbar Component WITH CLEAR FORMATTING FIX
const TipTapToolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div style={{
      border: '1px solid #d9d9d9',
      borderBottom: 'none',
      padding: '12px',
      background: '#fafafa',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      alignItems: 'center'
    }}>
      {/* Text Formatting */}
      <Button.Group>
        <Tooltip title="Bold (Ctrl+B)">
          <Button
            type={editor.isActive('bold') ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={<BoldOutlined />}
          />
        </Tooltip>
        <Tooltip title="Italic (Ctrl+I)">
          <Button
            type={editor.isActive('italic') ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={<ItalicOutlined />}
          />
        </Tooltip>
        <Tooltip title="Underline (Ctrl+U)">
          <Button
            type={editor.isActive('underline') ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={<UnderlineOutlined />}
          />
        </Tooltip>
        <Tooltip title="Clear Formatting">
          <Button
            type="text"
            onClick={() => {
              // ✅ FIX: Clear all formatting and return to normal text
              editor.chain().focus().clearNodes().unsetAllMarks().run();
            }}
            icon={<ClearOutlined />}
          />
        </Tooltip>
      </Button.Group>

      <div style={{ width: '1px', height: '20px', background: '#d9d9d9', margin: '0 8px' }} />

      {/* Text Alignment */}
      <Button.Group>
        <Tooltip title="Align Left">
          <Button
            type={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            icon={<AlignLeftOutlined />}
          />
        </Tooltip>
        <Tooltip title="Align Center">
          <Button
            type={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            icon={<AlignCenterOutlined />}
          />
        </Tooltip>
        <Tooltip title="Align Right">
          <Button
            type={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            icon={<AlignRightOutlined />}
          />
        </Tooltip>
      </Button.Group>

      <div style={{ width: '1px', height: '20px', background: '#d9d9d9', margin: '0 8px' }} />

      {/* Headings */}
      <Button.Group>
        <Tooltip title="Heading 1">
          <Button
            type={editor.isActive('heading', { level: 1 }) ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            style={{ fontWeight: 'bold' }}
          >
            H1
          </Button>
        </Tooltip>
        <Tooltip title="Heading 2">
          <Button
            type={editor.isActive('heading', { level: 2 }) ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            style={{ fontWeight: 'bold' }}
          >
            H2
          </Button>
        </Tooltip>
        <Tooltip title="Heading 3">
          <Button
            type={editor.isActive('heading', { level: 3 }) ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            style={{ fontWeight: 'bold' }}
          >
            H3
          </Button>
        </Tooltip>
      </Button.Group>

      <div style={{ width: '1px', height: '20px', background: '#d9d9d9', margin: '0 8px' }} />

      {/* Lists */}
      <Button.Group>
        <Tooltip title="Bullet List">
          <Button
            type={editor.isActive('bulletList') ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={<UnorderedListOutlined />}
          />
        </Tooltip>
        <Tooltip title="Ordered List">
          <Button
            type={editor.isActive('orderedList') ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={<OrderedListOutlined />}
          />
        </Tooltip>
        <Tooltip title="Blockquote">
          <Button
            type={editor.isActive('blockquote') ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            icon={<InsertRowLeftOutlined />}
          />
        </Tooltip>
      </Button.Group>

      <div style={{ width: '1px', height: '20px', background: '#d9d9d9', margin: '0 8px' }} />

      {/* Special Features */}
      <Button.Group>
        <Tooltip title="Code Block">
          <Button
            type={editor.isActive('codeBlock') ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            icon={<CodeOutlined />}
          />
        </Tooltip>
        <Tooltip title="Highlight">
          <Button
            type={editor.isActive('highlight') ? 'primary' : 'text'}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            icon={<HighlightOutlined />}
          />
        </Tooltip>
        <Tooltip title="Insert Table">
          <Button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            icon={<TableOutlined />}
            type="text"
          >
            Table
          </Button>
        </Tooltip>
      </Button.Group>

      <div style={{ width: '1px', height: '20px', background: '#d9d9d9', margin: '0 8px' }} />

      {/* Link and Image */}
      <Button.Group>
        <Tooltip title="Insert Link">
          <Button
            type="text"
            onClick={() => {
              const url = window.prompt('Enter URL');
              if (url) {
                // ✅ FIX: Don't auto-add /blogs/ prefix
                const finalUrl = url.startsWith('http') ? url : `/${url}`;
                editor.chain().focus().setLink({ href: finalUrl }).run();
              }
            }}
            icon={<LinkOutlined />}
          >
            Link
          </Button>
        </Tooltip>
        
        <ImageUploadButton editor={editor} />
      </Button.Group>

      <div style={{ width: '1px', height: '20px', background: '#d9d9d9', margin: '0 8px' }} />

      {/* Undo/Redo */}
      <Button.Group>
        <Tooltip title="Undo (Ctrl+Z)">
          <Button
            type="text"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            icon={<UndoOutlined />}
          />
        </Tooltip>
        <Tooltip title="Redo (Ctrl+Y)">
          <Button
            type="text"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            icon={<RedoOutlined />}
          />
        </Tooltip>
      </Button.Group>
    </div>
  );
};

// Main TipTapEditor Component WITH FIXED FORMATTING
const TipTapEditor = ({ content, onChange }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // ✅ FIX: Disable auto-formatting on backspace/delete
        dropcursor: {
          color: '#3B82F6',
          width: 2,
        },
        gapcursor: false,
      }),
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'blog-image',
          style: 'max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'blog-link',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your amazing blog post here...',
      }),
      Highlight.configure({
        multicolor: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'blog-table',
          style: 'border-collapse: collapse; width: 100%; margin: 16px 0;',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none min-h-[350px]',
        spellcheck: 'false',
      },
      // ✅ FIX: Handle backspace/delete to clear formatting
      handleKeyDown: (view, event) => {
        // If backspace or delete, clear formatting of selected text
        if ((event.key === 'Backspace' || event.key === 'Delete') && !event.shiftKey) {
          const { from, to } = view.state.selection;
          if (from !== to) {
            // Clear formatting when deleting selected text
            editor.chain().focus().unsetAllMarks().run();
          }
        }
        return false;
      },
    },
    immediatelyRender: false,
  });

  // Update content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  if (!mounted || !editor) {
    return (
      <div style={{
        border: '1px solid #d9d9d9',
        borderRadius: '8px',
        minHeight: '400px',
        padding: '20px',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Loading editor...
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <TipTapToolbar editor={editor} />
      
      <div style={{
        border: '1px solid #d9d9d9',
        borderTop: 'none',
        minHeight: '400px',
        maxHeight: '500px',
        overflowY: 'auto',
        padding: '20px',
        background: '#fff',
      }}>
        <EditorContent editor={editor} />
      </div>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 16px', 
        background: '#fafafa',
        borderTop: '1px solid #d9d9d9',
        fontSize: '12px',
        color: '#666'
      }}>
        <div>
          <strong>Tips:</strong> 
          <span style={{ marginLeft: '5px' }}>Select text → Apply formatting</span>
          <span style={{ margin: '0 10px' }}>|</span>
          <span>Clear formatting with Clear button</span>
        </div>
        <div>
          Links: Use full URL (https://...) or /your-slug for internal
        </div>
      </div>
    </div>
  );
};

export default TipTapEditor;