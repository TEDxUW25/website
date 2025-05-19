"use client"

import React, { useRef } from "react"
import { useInView } from "framer-motion"
import SponsorshipHeading from "./SponsorshipHeading"
import SponsorshipCard from "./SponsorshipCard"

export default function SponsorshipHero() {
  const cardRef = useRef<HTMLDivElement | null>(null)

  // "true" when cards are in the viewport
  const cardsInView = useInView(cardRef)

  return (
    <section className="flex flex-col items-center justify-start min-h-screen bg-black text-white relative">
      <SponsorshipHeading cardVisible={cardsInView} />

      <div ref={cardRef}>
        <SponsorshipCard />
      </div>
    </section>
  )
}
