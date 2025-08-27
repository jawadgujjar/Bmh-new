// app/portfolio/page.js

import Carousel from "@/components/landing/carousel";
import Calltoactionportfolio from "@/components/portfolio/portfoliopage/calltoactionportfolio";
import Calltoactionportfolio1 from "@/components/portfolio/portfoliopage/calltoactionportfolio1";
import Heroportfolio from "@/components/portfolio/portfoliopage/heroportfolio";
import Highlightportfolio from "@/components/portfolio/portfoliopage/highlightportfolio";
import Imageportfolio from "@/components/portfolio/portfoliopage/imageportfolio";
 
export default function Portfoliobmh() {
  return (
    <main>
      <Heroportfolio />
      <Imageportfolio/>
      <Calltoactionportfolio1/>
      <Highlightportfolio/>
      <Calltoactionportfolio/>
      <Carousel/>
    </main>
  );
}
