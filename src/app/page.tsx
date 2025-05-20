import HeroSection from "@/components/hero-2";
import TeamSection from "@/components/team-section";

import Timeline from "@/components/timeline";
import Mission from "@/components/mission";
import LandingPage from "@/components/landingPage";


export default function Home() {
  return (
    
    <div className="font-[family-name:var(--font-sans)]">

        <HeroSection />
        
        {/* Team section with torn paper style frames */}
        <TeamSection />
        
      <Mission />
      <Timeline />

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <LandingPage />

      </footer>
    </div>
  );
}
