// app/page.js

"use client";

import Alice from "@/components/landing/alicecarousel";
import Calltoaction from "@/components/landing/calltoaction";
import Carousel from "@/components/landing/carousel";
import Forwhom from "@/components/landing/forwhom";
import HeroMain from "@/components/landing/heromain";
import ProposalForm from "@/components/landing/proposalform";
import Reviews from "@/components/landing/reviews";  
import Reward from "@/components/landing/reward";
import SeoIndustries from "@/components/landing/seoindustries";
 
import Features from "@/components/landing/services";
import WhyChooseUs from "@/components/landing/whychooseus";

export default function Home() {
  return (
    <>
      <HeroMain />
      <Reviews />  
      <Alice/>
      <Forwhom/>
      <SeoIndustries/>
      <Calltoaction/>
      <Features/>
      <WhyChooseUs/>
      <Carousel/>
      <Reward/>
      <ProposalForm/>

    </>
  );
}
