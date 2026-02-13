 
import Digitalservices1 from "@/components/digital-marketing/servicesdigital";
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import Heroform from "@/components/landing/heroform";
import Calltoactionweb1 from "@/components/web-development/calltoactionweb1";
import Calltoactionweb2 from "@/components/web-development/calltoactionweb2";
import Faqwebdevelopment1 from "@/components/web-development/faqswebdevelopment";
import Heroweb1 from "@/components/web-development/heroweb";
import Keywordsweb from "@/components/web-development/keywordsweb";
import Webservices1 from "@/components/web-development/servicesweb";
import Webdevelopment1 from "@/components/web-development/webdevelopment";

export default function WebdevelopmentPage() {
  return (
    <main>
      <Heroweb1/>
      <Heroform/>
      <Webdevelopment1 />
      <Keywordsweb/>
      <Calltoactionweb1/>
      <Webservices1 category="web-development" />
      <Calltoactionweb2/>
      <Form1/>
      <Carousel/>
      <Faqwebdevelopment1/>
    </main>
  );
}
