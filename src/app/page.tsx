"use client"

import HeroSection from "@/components/hero-2";
import Timeline from "@/components/timeline";
import Mission from "@/components/mission";
import LandingPage from "@/components/landingPage";
import PastTalks from "@/components/pastTalks";
import Theme from "@/components/theme";
import WhatIsTed from "@/components/whatIsTed";
import ImpactPage from "./impact/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="font-[family-name:var(--font-sans)]">
      <HeroSection />
      <Theme />
      <WhatIsTed />
      <PastTalks />
      <div className="mt-20"></div>
      <ImpactPage />
      <div className="mt-20"></div>
      <Mission />
      <Timeline />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <LandingPage />
      </footer>
      <button
        className="fixed z-50 bottom-6 right-6 bg-[#d41102]/80 text-white rounded-2xl px-7 py-4 text-lg shadow-lg"
        style={{ width: "auto" }}
        onClick={() => router.push("/buy_ticket")}
      >
        Buy Tickets &bull; Nov XXX, 2025 &bull; Hagey Hall
      </button>
    </div>
  );
}
