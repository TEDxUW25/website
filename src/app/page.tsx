import HeroSection from "@/components/hero-2";
import Timeline from "@/components/timeline";
import Mission from "@/components/mission";
import LandingPage from "@/components/landingPage";

export default function Home() {
  return (
    
    <div className="font-[family-name:var(--font-sans)]">
      <LandingPage/>
      <HeroSection/>
      <Mission />
      <Timeline />
    </div>
  );
}
