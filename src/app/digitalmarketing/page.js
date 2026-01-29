import Aboutdigital from "@/components/digital-marketing/aboutdigital";
import Calltoactiondigital1 from "@/components/digital-marketing/calltoactiondigital1";
import Calltoactiondigital2 from "@/components/digital-marketing/calltoactiondigital2";
import HeroDigitalMarketing from "@/components/digital-marketing/digitalhero";
import Keywordsdigital from "@/components/digital-marketing/keywordsdigital";
import Digitalservices1 from "@/components/digital-marketing/servicesdigital";
import Whydigital from "@/components/digital-marketing/whydigital";
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import Heroform from "@/components/landing/heroform";
import ProposalForm from "@/components/landing/proposalform";
import Reviews from "@/components/landing/reviews";

export default function DigitalmarketingPage() {
  return (
    <main>
       <HeroDigitalMarketing/>
       <Heroform/>
       <Aboutdigital/>
       <Whydigital/>
       {/* <Reviews/> */}
       <Keywordsdigital/>
       <Calltoactiondigital1/>
       <Digitalservices1/>
       <Calltoactiondigital2/>
       <Form1/>
       <Carousel/>
    </main>
  );
};
