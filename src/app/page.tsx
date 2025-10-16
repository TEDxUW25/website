"use client";

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
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="font-[family-name:var(--font-sans)]">
      <div className="sticky top-20 z-50 text-red-500 shadow-sm p-4">
        <button
          onClick={() => {
            const themeSection = document.getElementById("theme");
            if (themeSection) {
              themeSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="cursor-pointer bg-white px-4 py-2 rounded-xl hover:underline text-red-600 font-medium"
        >
          Go to theme -{`>`}
        </button>
      </div>
      <div className="">
        <HeroSection />
      </div>
      <div className="" id="theme">
        <Theme />
      </div>
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
        className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 bg-[#bd1104] text-white rounded-lg sm:rounded-2xl px-3 py-2 sm:px-7 sm:py-4 text-sm sm:text-lg shadow-lg w-auto whitespace-nowrap"
        style={{ width: "auto" }}
        onClick={() => router.push("/buy_ticket")}
      >
        Buy Tickets &bull; Nov 2nd, 2025 &bull; Humanities Theatre
      </button>
    </div>
  );
}
