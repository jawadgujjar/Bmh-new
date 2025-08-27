// app/page.js

"use client";

import Alice from "@/components/landing/alicecarousel";
import Calltoaction from "@/components/landing/calltoaction";
import Carousel from "@/components/landing/carousel";
import FAQ from "@/components/landing/faqs";
import Forwhom from "@/components/landing/forwhom";
import Form1 from "@/components/landing/getaquote";
import HeroMain from "@/components/landing/heromain";
import ProposalForm from "@/components/landing/proposalform";
import Reviews from "@/components/landing/reviews";  
import Reward from "@/components/landing/reward";
import SeoIndustries from "@/components/landing/seoindustries";
 
import Features from "@/components/landing/services";
import WebCalltoaction from "@/components/landing/webdevelopment/webcalltoaction";
import WebIndustries from "@/components/landing/webdevelopment/webindustries";
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
      <WebIndustries/>
      <WebCalltoaction/>
      <Features/>
      <WhyChooseUs/>
      <Carousel/>
      <Reward/>
      {/* <ProposalForm/> */}
      <Form1/>
      <FAQ/>

    </>
  );
}
