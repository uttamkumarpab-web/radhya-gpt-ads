import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import OnlineMbaOverview from "@/components/OnlineMbaOverview";
import Approvals from "@/components/Approvals";
import Specializations from "@/components/Specializations";
import AdmissionProcessSection from "@/components/Admissions";
import FaqSection from "@/components/FaqSection";
import ConnectUs from "@/components/connectUs";
import TopUniversities from "@/components/TopUniversities";
import FormPopup from "@/components/FormPopup";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <HeroSection />
        <OnlineMbaOverview />
        <Approvals />
        <TopUniversities />
        <Specializations />
        <AdmissionProcessSection />
        <FaqSection />
        <ConnectUs />
      </main>
      <FormPopup />
    </div>
  );
}
