"use client"

import React, { useRef } from "react"
import SponsorshipHeading from "./SponsorshipHeading"
import SponsorshipCard from "./SponsorshipCard"

export default function SponsorshipHero() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-start pt-4 sm:pt-10 min-h-screen bg-black text-white relative"
    >
      <SponsorshipHeading />
      <SponsorshipCard />
    </section>
  )
}
