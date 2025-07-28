// app/page.js

"use client";

import Alice from "@/components/landing/alicecarousel";
import Carousel from "@/components/landing/carousel";
import Forwhom from "@/components/landing/forwhom";
import HeroMain from "@/components/landing/heromain";
import ProposalForm from "@/components/landing/proposalform";
import Reviews from "@/components/landing/reviews";  
import Reward from "@/components/landing/reward";
 
import Features from "@/components/landing/services";
import WhyChooseUs from "@/components/landing/whychooseus";

export default function Home() {
  return (
    <>
      <HeroMain />
      <Reviews />  
      <Alice/>
      <Forwhom/>
      <Features/>
      <WhyChooseUs/>
      <Carousel/>
      <Reward/>
      <ProposalForm/>

    </>
  );
}
