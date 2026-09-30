"use client";

import { useEffect, useRef } from "react";

// Google reCAPTCHA v2 ("I'm not a robot" + image challenge) widget.
// Renders nothing when NEXT_PUBLIC_RECAPTCHA_SITE_KEY isn't set, so the site
// keeps working before keys are configured (server skips the check too).
// Tokens are single-use: bump `resetSignal` after each submit to get a new one.

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const ONLOAD_CALLBACK = "__onRecaptchaLoad";
let scriptPromise = null;

function loadScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.render) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      window[ONLOAD_CALLBACK] = resolve;
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?onload=${ONLOAD_CALLBACK}&render=explicit`;
      s.async = true;
      s.defer = true;
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("Failed to load captcha"));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function Captcha({ onToken, resetSignal = 0, theme = "dark" }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme,
          callback: (token) => onTokenRef.current?.(token),
          "expired-callback": () => onTokenRef.current?.(""),
          "error-callback": () => onTokenRef.current?.(""),
        });
      })
      .catch((err) => console.error("[captcha]", err.message));

    const container = containerRef.current;
    return () => {
      cancelled = true;
      widgetIdRef.current = null;
      // grecaptcha has no remove(); clearing the node lets a remount render again
      if (container) container.innerHTML = "";
    };
  }, [theme]);

  useEffect(() => {
    if (resetSignal && widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
      onTokenRef.current?.("");
    }
  }, [resetSignal]);

  if (!RECAPTCHA_SITE_KEY) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
      <div ref={containerRef} />
    </div>
  );
}
