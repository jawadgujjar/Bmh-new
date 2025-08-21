 
import SubAboutdigital from "@/components/digital-marketing/sub-category-digital/subaboutdigital";
import SubCalltoactiondigital1 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital1";
import SubCalltoactiondigital2 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital2";
import SubHeroDigitalMarketing from "@/components/digital-marketing/sub-category-digital/subdigitalhero";
import SubKeywordsdigital from "@/components/digital-marketing/sub-category-digital/subkeywordsdigital";
import SubWhydigital from "@/components/digital-marketing/sub-category-digital/subwhydigital";
import Carousel from "@/components/landing/carousel";
import ProposalForm from "@/components/landing/proposalform";
import SeoIndustries from "@/components/landing/seoindustries";
 

export default function SeocompanyPage() {
  return (
    <main>
       <SubHeroDigitalMarketing/>
       <SubAboutdigital/>
       <SubWhydigital/>
       {/* <Reviews/> */}
       <SubKeywordsdigital/>
       <SubCalltoactiondigital1/>
       <SeoIndustries/>
       <SubCalltoactiondigital2/>
       <ProposalForm/>
       <Carousel/>
    </main>
  );
};
