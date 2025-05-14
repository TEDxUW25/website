import HeroHome from "@/components/hero";
import Hero2 from "@/components/hero-2";
import Footer from "@/components/footer"

export default function Home() {
  return (
    
    <div className="font-[family-name:var(--font-sans)]">
        {/* <HeroHome /> */}
        <Hero2 />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer /> {/* for testing */}
      </footer>
    </div>
  );
}

