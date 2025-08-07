import Appdevelopment1 from "@/components/app-development/appdevelopment";
import Calltoactionapp1 from "@/components/app-development/calltoactionapp1";
import Calltoactionapp2 from "@/components/app-development/calltoactionapp2";
import Faqapp1 from "@/components/app-development/faqsapp";
import Keywordsapp from "@/components/app-development/keywordsapp";
import Appservices1 from "@/components/app-development/servicesapp";
 
 

export default function AppdevelopmentPage() {
  return (
    <main>
        <Appdevelopment1/>
        <Keywordsapp/>
        <Calltoactionapp1/>
        <Appservices1/>
        <Calltoactionapp2/>
        <Faqapp1/>
    </main>
  );
};
