import Aboutdigital from "@/components/digital-marketing/aboutdigital";
import Calltoactiondigital1 from "@/components/digital-marketing/calltoactiondigital1";
import HeroDigitalMarketing from "@/components/digital-marketing/digitalhero";
import Keywordsdigital from "@/components/digital-marketing/keywordsdigital";
import Whydigital from "@/components/digital-marketing/whydigital";
import Reviews from "@/components/landing/reviews";

export default function PortfolioPage() {
  return (
    <main>
       <HeroDigitalMarketing/>
       <Aboutdigital/>
       <Whydigital/>
       {/* <Reviews/> */}
       <Keywordsdigital/>
       <Calltoactiondigital1/>
    </main>
  );
};
