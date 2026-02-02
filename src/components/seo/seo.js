"use client"; // for Next.js 13+ app router
import React from "react";
import Head from "next/head";

const SEO = ({ seo }) => {
  if (!seo) return null;

  return (
    <Head>
      {seo.metaTitle && <title>{seo.metaTitle}</title>}
      {seo.metaDescription && (
        <meta name="description" content={seo.metaDescription} />
      )}
      {seo.metaKeywords && seo.metaKeywords.length > 0 && (
        <meta name="keywords" content={seo.metaKeywords.join(", ")} />
      )}
      {seo.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schemaMarkup) }}
        />
      )}
    </Head>
  );
};

export default SEO;
