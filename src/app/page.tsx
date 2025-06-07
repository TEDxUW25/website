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

export default function Home() {
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
    </div>
  );
}
