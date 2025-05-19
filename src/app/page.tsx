import HeroHome from "@/components/hero";
import Timeline from "@/components/timeline";
import Footer from "@/components/footer";
import Mission from "@/components/mission";
import LandingPage from "@/components/landingPage";
import PastTalks from '@/components/PastTalks';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-sans)]">
      <HeroHome />
      <Mission />
      <Timeline />
      <PastTalks />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <LandingPage />
  
        <Footer /> {/* for testing */}
      </footer>
    </div>
  );
}
