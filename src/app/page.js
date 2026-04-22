// app/page.js
"use client";

import Faqform from "@/components/landing/formfaq/formfaq";
// import Calltoaction from "@/components/landing/calltoaction";
 
 
 import Alice from "src/components/landing/alicecarousel";
import Carousel from "src/components/landing/carousel";
import FAQ from "src/components/landing/faqs";
import Forwhom from "src/components/landing/forwhom";
import Form1 from "src/components/landing/getaquote";
import Heroform from "src/components/landing/heroform";
import HeroMain from "src/components/landing/heromain";
import Reward from "src/components/landing/reward";
import Seocontent1 from "src/components/landing/seocontent";
import SeoIndustries from "src/components/landing/seoindustries";
import Services from "src/components/landing/services";
import Webcontent1 from "src/components/landing/webcontent";
import WebCalltoaction from "src/components/landing/webdevelopment/webcalltoaction";
import WhyChooseUs from "src/components/landing/whychooseus";

export default function Home() {
  return (
    <>
      <HeroMain />
      {/* <Reviews />   */}
      <Heroform />
      <Alice/>
      <Forwhom />
      <Services/>
      <Seocontent1/>
      
      {/* <Calltoaction/> */}
      <WebCalltoaction/>
      <Webcontent1/>
      {/* <WebIndustries/> */}
      <WhyChooseUs/>
      <SeoIndustries/>
      <Carousel />
      
      {/* <ProposalForm/> */}
      {/* <Form1 />
      <FAQ /> */}
      <Faqform/>
      <Reward/>

    </>
  );
}
