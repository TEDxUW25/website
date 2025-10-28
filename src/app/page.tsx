"use client";

import HeroSection from "@/components/hero-2";
import Timeline from "@/components/timeline";
import Mission from "@/components/mission";
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
      <button
        className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 bg-gradient-to-b from-[#d41408] to-[#bd1104] text-white rounded-[20px] sm:rounded-3xl px-6 py-3 sm:px-7 sm:py-4 text-base sm:text-lg font-semibold shadow-[0_8px_32px_rgb(189,17,4,0.6),0_2px_8px_rgba(0,0,0,0.3)] sm:shadow-[0_6px_24px_rgb(189,17,4,0.35),0_2px_8px_rgba(0,0,0,0.2)] w-auto whitespace-nowrap transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_10px_40px_rgb(189,17,4,0.7),0_4px_12px_rgba(0,0,0,0.4)] active:scale-95 backdrop-blur-xl border border-white/10"
        style={{ width: "auto" }}
        onClick={() => router.push("/buy_ticket")}
      >
        <span className="sm:hidden">Buy Tickets • Nov 2nd &bull; 1PM - 6PM</span>
        <span className="hidden sm:inline">Buy Tickets &bull; Nov 2nd, 2025 &bull; 1PM - 6PM &bull; Humanities Theatre</span>
      </button>
    </div>
  );
}
