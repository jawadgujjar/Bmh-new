"use client"; 
import React, { useEffect } from "react";

const SEO = ({ seo }) => {
  useEffect(() => {
    if (!seo) return;

    // 1. Title Update karein
    if (seo.metaTitle) {
      document.title = seo.metaTitle;
    }

    // 2. Meta Description Update karein
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (seo.metaDescription) {
      if (descriptionTag) {
        descriptionTag.setAttribute("content", seo.metaDescription);
      } else {
        descriptionTag = document.createElement("meta");
        descriptionTag.name = "description";
        descriptionTag.content = seo.metaDescription;
        document.head.appendChild(descriptionTag);
      }
    }

    // 3. Meta Keywords Update karein
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (seo.metaKeywords && seo.metaKeywords.length > 0) {
      const keywordsStr = seo.metaKeywords.join(", ");
      if (keywordsTag) {
        keywordsTag.setAttribute("content", keywordsStr);
      } else {
        keywordsTag = document.createElement("meta");
        keywordsTag.name = "keywords";
        keywordsTag.content = keywordsStr;
        document.head.appendChild(keywordsTag);
      }
    }

    // 4. Schema Markup (JSON-LD) Inject karein
    // Pehle se agar koi purana dynamic schema laga ho toh use remove karein taaki duplicate na ho
    const oldSchema = document.getElementById("dynamic-schema-markup");
    if (oldSchema) oldSchema.remove();

    if (seo.schemaMarkup) {
      const script = document.createElement("script");
      script.id = "dynamic-schema-markup";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(seo.schemaMarkup);
      document.head.appendChild(script);
    }
  }, [seo]); // Jab bhi seo ka data change hoga, ye tags chalenge

  return null; // Client side par ye HTML head direct document se handle karega
};

export default SEO;
