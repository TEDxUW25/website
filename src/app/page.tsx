import HeroHome from "@/components/hero";
import TeamSection from "@/components/team-section";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-sans)]">
        <HeroHome />
        
        {/* Team section with torn paper style frames */}
        <TeamSection />
        
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
  
      </footer>
    </div>
  );
}

