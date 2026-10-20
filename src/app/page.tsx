"use client";

import HeroSection from "@/components/hero-2";
import Timeline from "@/components/timeline";
import Mission from "@/components/mission";
import PastTalks from "@/components/pastTalks";
import JoinSection from "@/components/join-section";
import WhatIsTed from "@/components/whatIsTed";
import ImpactPage from "./impact/page";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="font-[family-name:var(--font-sans)]">
      <div className="">
        <HeroSection />
      </div>
      <JoinSection />
      <WhatIsTed />
      <PastTalks />
      <div className="mt-20"></div>
      <ImpactPage />
      <div className="mt-20"></div>
      <Mission />
      <Timeline />
    </div>
  );
}
