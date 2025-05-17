import HeroHome from "@/components/hero";
import HeroSection from "@/components/hero-2";
import Timeline from "@/components/timeline";
import Mission from "@/components/mission";

export default function Home() {
  return (
    
    <div className="font-[family-name:var(--font-sans)]">
      <HeroSection/>
      <Mission />
      <Timeline />
    </div>
  );
}
