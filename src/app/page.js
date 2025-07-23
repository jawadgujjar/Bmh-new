// app/page.js

"use client";

import HeroMain from "@/components/heromain";
import Reviews from "@/components/reviews"; // 👈 Correct path if needed

export default function Home() {
  return (
    <>
      <HeroMain />
      <Reviews /> {/* 👈 Yeh neeche render hoga */}
    </>
  );
}
