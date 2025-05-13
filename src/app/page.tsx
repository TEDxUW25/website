import HeroHome from "@/components/hero";
import Footer from "@/components/footer" // testing

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-sans)]">
        <HeroHome />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer /> {/* for testing */}
      </footer>
    </div>
  );
}

