// app/page.js

"use client";

import Alice from "@/components/landing/alicecarousel";
import Calltoaction from "@/components/landing/calltoaction";
import Carousel from "@/components/landing/carousel";
import FAQ from "@/components/landing/faqs";
import Forwhom from "@/components/landing/forwhom";
import Form1 from "@/components/landing/getaquote";
import Heroform from "@/components/landing/heroform";
import HeroMain from "@/components/landing/heromain";
import ProposalForm from "@/components/landing/proposalform";
import Reviews from "@/components/landing/reviews";  
import Reward from "@/components/landing/reward";
import Seocontent1 from "@/components/landing/seocontent";
import SeoIndustries from "@/components/landing/seoindustries";

import Features from "@/components/landing/services";
import Webcontent1 from "@/components/landing/webcontent";
import WebCalltoaction from "@/components/landing/webdevelopment/webcalltoaction";
import WebIndustries from "@/components/landing/webdevelopment/webindustries";
import WhyChooseUs from "@/components/landing/whychooseus";

export default function Home() {
  return (
    <>
      <HeroMain />
      {/* <Reviews />   */}
      <Heroform/>
      <Alice/>
      <Forwhom/>
      <Features/>
      <Seocontent1/>
      <SeoIndustries/>
      <Calltoaction/>
      <Webcontent1/>
      {/* <WebIndustries/> */}
      <WebCalltoaction/>
      <WhyChooseUs/>
      <Carousel/>
      <Reward/>
      {/* <ProposalForm/> */}
      <Form1/>
      <FAQ/>

    </>
  );
}
