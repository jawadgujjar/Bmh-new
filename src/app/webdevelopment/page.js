 
import Calltoactionweb1 from "@/components/web-development/calltoactionweb1";
import Faqwebdevelopment1 from "@/components/web-development/faqswebdevelopment";
import Keywordsweb from "@/components/web-development/keywordsweb";
import Webservices1 from "@/components/web-development/servicesweb";
import Webdevelopment1 from "@/components/web-development/webdevelopment";

export default function PortfolioPage() {
  return (
    <main>
      <Webdevelopment1 />
      <Keywordsweb/>
      <Calltoactionweb1/>
      <Webservices1/>
      <Faqwebdevelopment1/>
    </main>
  );
}
