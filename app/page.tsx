import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import Team from "./components/Team";
import AboutDbt from "./components/AboutDbt";
import Program from "./components/Program";
import Duration from "./components/Duration";
import Criteria from "./components/Criteria";
import AfterApplication from "./components/AfterApplication";
import CrisisBox from "./components/CrisisBox";
import FormSection from "./components/FormSection";
import Faq from "./components/Faq";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main id="main-content" className="flex-1">
        <Hero />
        <Team />
        <AboutDbt />
        <Program />
        <Duration />
        <Criteria />
        <AfterApplication />
        <CrisisBox />
        <FormSection />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
