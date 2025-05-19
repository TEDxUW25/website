"use client"

import SponsorshipSection from "./SponsorSection"
import { sponsorData } from "./sponsorData"

export default function SponsorshipHero() {

  return (
    <section className="flex flex-col items-center justify-start min-h-screen bg-black text-white relative">
      <a
        href="https://www.instagram.com/tedxuw/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 
                   px-4 sm:px-6 md:px-10 
                   py-2 sm:py-3 md:py-4 
                   text-sm sm:text-base md:text-xl 
                   font-medium text-white bg-red-600 hover:bg-red-700 
                   rounded-full transition mx-auto block text-center"
      >
        Become our Sponsor →
      </a>

      {sponsorData.map(({ tier, sponsors }, index) => (
        <SponsorshipSection
          key={index}
          tier={tier}
          sponsors={sponsors}
        />
      ))}
    </section>
  )
}
