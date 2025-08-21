 
import Carousel from "@/components/landing/carousel";
import Calltoactionweb1 from "@/components/web-development/calltoactionweb1";
import Calltoactionweb2 from "@/components/web-development/calltoactionweb2";
import Faqwebdevelopment1 from "@/components/web-development/faqswebdevelopment";
import Keywordsweb from "@/components/web-development/keywordsweb";
import Webservices1 from "@/components/web-development/servicesweb";
import Webdevelopment1 from "@/components/web-development/webdevelopment";

export default function WebdevelopmentPage() {
  return (
    <main>
      <Webdevelopment1 />
      <Keywordsweb/>
      <Calltoactionweb1/>
      <Webservices1/>
      <Calltoactionweb2/>
      <Carousel/>
      <Faqwebdevelopment1/>
    </main>
  );
}
