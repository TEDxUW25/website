import HeroHome from "@/components/hero";
import Timeline from "@/components/timeline";
import Footer from "@/components/footer";
import Mission from "@/components/mission";
import LandingLoader from "@/components/LandingLoader";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-sans)]">
      <HeroHome />
      <Mission />
      <Timeline />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <LandingLoader />
  
        <Footer /> {/* for testing */}
      </footer>
    </div>
  );
}
