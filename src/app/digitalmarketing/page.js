import Aboutdigital from "@/components/digital-marketing/aboutdigital";
import HeroDigitalMarketing from "@/components/digital-marketing/digitalhero";
import Whydigital from "@/components/digital-marketing/whydigital";
import Reviews from "@/components/landing/reviews";

export default function PortfolioPage() {
  return (
    <main>
       <HeroDigitalMarketing/>
       <Aboutdigital/>
       <Whydigital/>
       <Reviews/>
    </main>
  );
}
