// app/page.js

"use client";

import Alice from "@/components/landing/alicecarousel";
import Forwhom from "@/components/landing/forwhom";
import HeroMain from "@/components/landing/heromain";
import Reviews from "@/components/landing/reviews"; // 👈 Correct path if needed
import Features from "@/components/landing/services";

export default function Home() {
  return (
    <>
      <HeroMain />
      <Reviews /> {/* 👈 Yeh neeche render hoga */}
      <Alice/>
      <Forwhom/>
      <Features/>
      
    </>
  );
}
