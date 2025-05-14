"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

interface Sponsor {
  name: string
  logo: string
  description: string
}

export default function SponsorSection({
  tier,
  sponsors,
}: {
  tier: string
  sponsors: Sponsor[]
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    //let scrollAmount = 0
    const speed = 1 // pixels per frame
    let requestId: number

    const scrollLoop = () => {
      if (!scrollContainer) return

      //scrollAmount += speed
      scrollContainer.scrollLeft += speed

      // If we've scrolled past the scrollable width, reset to the start
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0
        //scrollAmount = 0
      }

      requestId = requestAnimationFrame(scrollLoop)
    }

    requestId = requestAnimationFrame(scrollLoop)

    return () => cancelAnimationFrame(requestId)
  }, [])

  return (
    <section className="w-full py-10">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white px-4 mb-4">
        {tier} <span className="font-normal italic ml-1">Sponsors</span>
      </h2>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-scroll no-scrollbar px-4 pb-6"
      >
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white rounded-2xl p-4 flex-shrink-0 shadow-lg"
          >
            <div className="w-full h-36 relative">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-sm text-black">{sponsor.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}