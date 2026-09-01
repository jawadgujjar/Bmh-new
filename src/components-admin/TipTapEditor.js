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
import {
  TextStyle,
  Color,
  BackgroundColor,
  FontSize,
  FontFamily,
} from "@tiptap/extension-text-style";
import { Button, Upload, message, Modal, Input, Slider, Space, Dropdown } from "antd";
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
  MobileOutlined,
  DesktopOutlined,
} from "@ant-design/icons";

const lowlight = createLowlight(common);

// Custom Image extension with responsive attributes
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        parseHTML: element => element.getAttribute("width") || element.style.width,
        renderHTML: attributes => ({
          width: attributes.width,
        }),
      },
      height: {
        default: "auto",
        parseHTML: element => element.getAttribute("height") || element.style.height,
        renderHTML: attributes => ({
          height: "auto",
        }),
      },
      class: {
        default: "responsive-image",
        parseHTML: element => element.getAttribute("class"),
        renderHTML: attributes => ({
          class: `responsive-image ${attributes.class || ""}`,
        }),
      },
      style: {
        default: "width: 100%; height: auto; object-fit: cover; border-radius: 8px;",
        parseHTML: element => element.getAttribute("style"),
        renderHTML: attributes => ({
          style: attributes.style || "width: 100%; height: auto; object-fit: cover; border-radius: 8px;",
        }),
      },
      'data-desktop-width': {
        default: "1000",
        parseHTML: element => element.getAttribute("data-desktop-width"),
        renderHTML: attributes => ({
          'data-desktop-width': attributes['data-desktop-width'],
        }),
      },
    };
  },
});

// ===== Keep pasted table-cell colors / alignment / borders =====
const cellStyleAttributes = {
  backgroundColor: {
    default: null,
    parseHTML: (element) =>
      element.style.backgroundColor ||
      element.getAttribute("bgcolor") ||
      null,
    renderHTML: (attributes) =>
      attributes.backgroundColor
        ? { style: `background-color: ${attributes.backgroundColor}` }
        : {},
  },
  textAlign: {
    default: null,
    parseHTML: (element) => element.style.textAlign || null,
    renderHTML: (attributes) =>
      attributes.textAlign ? { style: `text-align: ${attributes.textAlign}` } : {},
  },
  verticalAlign: {
    default: null,
    parseHTML: (element) => element.style.verticalAlign || null,
    renderHTML: (attributes) =>
      attributes.verticalAlign
        ? { style: `vertical-align: ${attributes.verticalAlign}` }
        : {},
  },
};

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return { ...this.parent?.(), ...cellStyleAttributes };
  },
});

const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return { ...this.parent?.(), ...cellStyleAttributes };
  },
});

// Image Size Modal Component
const ImageSizeModal = ({ visible, imageUrl, onConfirm, onCancel }) => {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(600);
  const [responsiveMode, setResponsiveMode] = useState(true);

  const presets = {
    small: { width: 400, height: 240 },
    medium: { width: 700, height: 420 },
    large: { width: 1000, height: 600 },
    full: { width: "100%", height: "auto" },
  };

  return (
    <Modal
      title="Insert Image"
      open={visible}
      onOk={() => onConfirm(width, height, responsiveMode)}
      onCancel={onCancel}
      okText="Insert Image"
      cancelText="Cancel"
      width={550}
    >
      <div style={{ marginBottom: 20 }}>
        <img 
          src={imageUrl} 
          alt="Preview" 
          style={{ 
            width: "100%", 
            maxHeight: 250, 
            objectFit: "contain",
            borderRadius: 8,
            marginBottom: 16,
            border: "1px solid #f0f0f0"
          }} 
        />
        
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontWeight: "bold" }}>Preset Sizes:</div>
          <Space wrap>
            <Button 
              size="small"
              onClick={() => {
                setWidth(400);
                setHeight(240);
              }}
            >
              400x240px
            </Button>
            <Button 
              size="small"
              onClick={() => {
                setWidth(700);
                setHeight(420);
              }}
            >
              700x420px
            </Button>
            <Button 
              size="small"
              type="primary"
              onClick={() => {
                setWidth(1000);
                setHeight(600);
              }}
            >
              1000x600px (Desktop)
            </Button>
            <Button 
              size="small"
              onClick={() => {
                setWidth("100%");
                setHeight("auto");
              }}
            >
              Full Width
            </Button>
          </Space>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontWeight: "bold" }}>Custom Size:</div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label>Width:</label>
              <Input
                type="number"
                value={width === "100%" ? 1200 : width}
                onChange={(e) => {
                  const val = e.target.value;
                  setWidth(parseInt(val) || 0);
                }}
                addonAfter="px"
                style={{ marginTop: 4 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Height:</label>
              <Input
                type="number"
                value={height === "auto" ? 600 : height}
                onChange={(e) => {
                  const val = e.target.value;
                  setHeight(parseInt(val) || 0);
                }}
                addonAfter="px"
                style={{ marginTop: 4 }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8, fontWeight: "bold" }}>Responsive Behavior:</div>
          <Space>
            <Button 
              size="small"
              type={responsiveMode ? "primary" : "default"}
              icon={<MobileOutlined />}
              onClick={() => setResponsiveMode(true)}
            >
              Responsive (Auto scale on mobile)
            </Button>
            <Button 
              size="small"
              type={!responsiveMode ? "primary" : "default"}
              icon={<DesktopOutlined />}
              onClick={() => setResponsiveMode(false)}
            >
              Fixed Size (No scaling)
            </Button>
          </Space>
        </div>

        <div style={{ 
          background: responsiveMode ? "#e6f7ff" : "#f6ffed", 
          padding: 8, 
          borderRadius: 4, 
          fontSize: 12,
          textAlign: "center"
        }}>
          {responsiveMode ? 
            "✅ Image will automatically resize on mobile devices" : 
            "📱 Image will maintain fixed size on all devices"}
        </div>
      </div>
    </Modal>
  );
};

/* ================= IMAGE UPLOAD ================= */
const ImageUploadButton = ({ editor }) => {
  const [uploading, setUploading] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [tempImageFile, setTempImageFile] = useState(null);

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
        setUploadedImageUrl(data.url);
        setTempImageFile(file);
        setImageModalVisible(true);
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

  const insertImageWithSize = (width, height, responsiveMode) => {
    let widthValue, heightValue, styleValue;
    
    if (responsiveMode) {
      // Responsive mode: use CSS classes
      widthValue = "100%";
      heightValue = "auto";
      styleValue = `width: 100%; height: auto; object-fit: cover; border-radius: 8px; --desktop-width: ${width}px;`;
    } else {
      // Fixed mode
      widthValue = width === "100%" ? "100%" : `${width}px`;
      heightValue = height === "auto" ? "auto" : `${height}px`;
      styleValue = `width: ${widthValue}; height: ${heightValue}; object-fit: cover; border-radius: 8px;`;
    }
    
    editor
      .chain()
      .focus()
      .setImage({
        src: uploadedImageUrl,
        alt: tempImageFile?.name || "Uploaded image",
        title: tempImageFile?.name || "Uploaded image",
        width: widthValue,
        height: heightValue,
        class: responsiveMode ? "responsive-image" : "fixed-image",
        "data-desktop-width": responsiveMode ? width : null,
        style: styleValue,
      })
      .run();

    setImageModalVisible(false);
    setUploadedImageUrl("");
    setTempImageFile(null);
    message.success(responsiveMode ? "Image inserted with responsive sizing!" : "Image inserted with fixed sizing!");
  };

  return (
    <>
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
      
      <ImageSizeModal
        visible={imageModalVisible}
        imageUrl={uploadedImageUrl}
        onConfirm={insertImageWithSize}
        onCancel={() => {
          setImageModalVisible(false);
          setUploadedImageUrl("");
          setTempImageFile(null);
        }}
      />
    </>
  );
};

// Image Resize Handler Component
const ImageResizeHandler = ({ editor }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResizer, setShowResizer] = useState(false);
  const [tempWidth, setTempWidth] = useState(1000);
  const [responsiveMode, setResponsiveMode] = useState(true);

  useEffect(() => {
    if (!editor) return;

    const handleClick = (event) => {
      const target = event.target;
      if (target.tagName === "IMG" && target.closest(".ProseMirror")) {
        setSelectedImage(target);
        setShowResizer(true);
        
        // Check if responsive
        const isResponsive = target.classList.contains("responsive-image");
        setResponsiveMode(isResponsive);
        
        // Get current desktop width if responsive
        const desktopWidth = target.getAttribute("data-desktop-width");
        if (desktopWidth) {
          setTempWidth(parseInt(desktopWidth));
        } else {
          const currentWidth = target.style.width || target.getAttribute("width") || "1000px";
          const widthNum = parseInt(currentWidth);
          setTempWidth(isNaN(widthNum) ? 1000 : widthNum);
        }
      } else {
        setShowResizer(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [editor]);

  const resizeImage = (newWidth, newHeight = 600, makeResponsive = true) => {
    if (!selectedImage) return;
    
    if (makeResponsive) {
      // Set as responsive
      selectedImage.className = "responsive-image";
      selectedImage.style.width = "100%";
      selectedImage.style.height = "auto";
      selectedImage.setAttribute("width", "100%");
      selectedImage.setAttribute("height", "auto");
      selectedImage.setAttribute("data-desktop-width", newWidth);
      selectedImage.style.setProperty("--desktop-width", `${newWidth}px`);
      
      if (editor) {
        editor.commands.updateAttributes("image", {
          class: "responsive-image",
          width: "100%",
          height: "auto",
          "data-desktop-width": newWidth,
          style: `width: 100%; height: auto; object-fit: cover; border-radius: 8px; --desktop-width: ${newWidth}px;`,
        });
      }
      message.success(`Image set to responsive mode (${newWidth}px on desktop)`);
    } else {
      // Set as fixed size
      const widthValue = newWidth === "100%" ? "100%" : `${newWidth}px`;
      const heightValue = `${newHeight}px`;
      
      selectedImage.className = "fixed-image";
      selectedImage.style.width = widthValue;
      selectedImage.style.height = heightValue;
      selectedImage.setAttribute("width", widthValue);
      selectedImage.setAttribute("height", heightValue);
      selectedImage.removeAttribute("data-desktop-width");
      
      if (editor) {
        editor.commands.updateAttributes("image", {
          class: "fixed-image",
          width: widthValue,
          height: heightValue,
          "data-desktop-width": null,
          style: `width: ${widthValue}; height: ${heightValue}; object-fit: cover; border-radius: 8px;`,
        });
      }
      message.success(`Image resized to ${widthValue} × ${heightValue}`);
    }
  };

  if (!showResizer || !selectedImage) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "white",
        padding: "12px 16px",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 1000,
        border: "1px solid #d9d9d9",
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: "90%",
      }}
    >
      <span style={{ fontSize: 12, color: "#666", fontWeight: "bold" }}>
        {responsiveMode ? "📱 Responsive Mode" : "📷 Fixed Mode"}:
      </span>
      <Space size="small" wrap>
        <Button size="small" onClick={() => resizeImage(500, 300, true)}>
          📱 500px (Resp)
        </Button>
        <Button size="small" onClick={() => resizeImage(800, 480, true)}>
          📱 800px (Resp)
        </Button>
        <Button size="small" type="primary" onClick={() => resizeImage(1000, 600, true)}>
          📱 1000px (Resp)
        </Button>
        <Button size="small" onClick={() => resizeImage(500, 300, false)}>
          📷 500x300
        </Button>
        <Button size="small" onClick={() => resizeImage(800, 480, false)}>
          📷 800x480
        </Button>
        <Button size="small" onClick={() => resizeImage(1000, 600, false)}>
          📷 1000x600
        </Button>
        <div style={{ width: 150 }}>
          <Slider
            min={200}
            max={1400}
            step={10}
            value={tempWidth}
            onChange={(val) => {
              setTempWidth(val);
              resizeImage(val, 600, responsiveMode);
            }}
          />
        </div>
      </Space>
      <Button size="small" type="text" danger onClick={() => setShowResizer(false)}>
        Close
      </Button>
    </div>
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

      <Space size={4} style={{ alignItems: "center" }}>
        <label
          title="Text color"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          A
          <input
            type="color"
            style={{ width: 28, height: 24, padding: 0, border: "none", background: "none" }}
            value={editor.getAttributes("textStyle").color || "#000000"}
            onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </label>
        <label
          title="Highlight color"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          <HighlightOutlined />
          <input
            type="color"
            style={{ width: 28, height: 24, padding: 0, border: "none", background: "none" }}
            value={editor.getAttributes("highlight").color || "#ffff00"}
            onInput={(e) =>
              editor.chain().focus().toggleHighlight({ color: e.target.value }).run()
            }
          />
        </label>
        <Button
          size="small"
          onClick={() =>
            editor.chain().focus().unsetColor().unsetHighlight().run()
          }
        >
          Clear color
        </Button>
      </Space>

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
      StarterKit.configure({ codeBlock: false, underline: false }),
      Underline,
      CustomImage,
      TextStyle,
      Color,
      BackgroundColor,
      FontSize,
      FontFamily,
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
      Highlight.configure({ multicolor: true }),
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({ resizable: true }),
      TableRow,
      CustomTableHeader,
      CustomTableCell,
    ],
    content: value || "",
    editorProps: {
      // keep original markup when pasting from Word / Google Docs / websites
      transformPastedHTML: (html) => html,
    },
    parseOptions: { preserveWhitespace: "full" },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!mounted || !editor) {
    return <div style={{ padding: 20 }}>Loading editor...</div>;
  }

  return (
    <>
      <div style={{ border: "1px solid #d9d9d9", borderRadius: 8 }}>
        <TipTapToolbar editor={editor} />
        <div style={{ padding: 20, minHeight: 300 }}>
          <EditorContent editor={editor} />
        </div>
      </div>
      <ImageResizeHandler editor={editor} />
      
      <style jsx global>{`
        /* Base image styles */
        .ProseMirror img {
          display: block;
          border-radius: 8px;
          margin: 20px auto;
          cursor: pointer;
          transition: all 0.3s ease;
          max-width: 100%;
          height: auto;
        }
        
        .ProseMirror img:hover {
          box-shadow: 0 0 0 2px #1890ff;
        }
        
        /* Responsive images - scale on mobile */
        .ProseMirror img.responsive-image {
          width: 100%;
          height: auto;
          max-width: 100%;
        }
        
        /* Fixed images - maintain aspect ratio but scale down if needed */
        .ProseMirror img.fixed-image {
          max-width: 100%;
          height: auto;
        }
        
        /* Desktop styles for responsive images */
        @media (min-width: 768px) {
          .ProseMirror img.responsive-image {
            width: var(--desktop-width, 1000px);
            max-width: 100%;
            height: auto;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 767px) {
          .ProseMirror img {
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
          }
          
          .ProseMirror img.responsive-image,
          .ProseMirror img.fixed-image {
            width: 100% !important;
            height: auto !important;
          }
        }
        
        /* Tablet styles */
        @media (min-width: 768px) and (max-width: 1024px) {
          .ProseMirror img.responsive-image {
            width: 90% !important;
            max-width: 90% !important;
          }
        }
        
        /* Center images by default */
        .ProseMirror .image-wrapper {
          text-align: center;
        }

        /* Tables - show borders + pasted cell colors in the editor */
        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 16px 0;
          table-layout: fixed;
          overflow: hidden;
        }
        .ProseMirror table td,
        .ProseMirror table th {
          border: 1px solid #d0d0d0;
          padding: 8px 10px;
          vertical-align: top;
          position: relative;
        }
        .ProseMirror table th {
          background: #f5f5f5;
          font-weight: 600;
          text-align: left;
        }
        .ProseMirror table .selectedCell:after {
          background: rgba(24, 144, 255, 0.15);
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .ProseMirror table .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #1890ff;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default TipTapEditor;