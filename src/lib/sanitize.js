import DOMPurify from "isomorphic-dompurify";

// Clean HTML that comes from the admin panel / DB before rendering it with
// dangerouslySetInnerHTML. Keeps normal formatting (headings, lists, links,
// images, tables) but strips <script>, inline event handlers (onerror=...),
// javascript: URLs, iframes, etc. Works on both server and client.
export function sanitizeHtml(html) {
  if (!html || typeof html !== "string") return "";
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}
