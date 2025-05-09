"use client"

import React, { useEffect, useState, useRef } from "react"

const SponsorshipHeading = () => {
  const [opacity, setOpacity] = useState(1)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!headingRef.current) return
      const scrollY = window.scrollY
      const fadeStart = 0         // Start fading as soon as user scrolls
      const fadeEnd = 150         // Fully invisible after 150px scroll
      const opacityValue = 1 - Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1)
      setOpacity(opacityValue)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <h1 className="font-inter w-full text-white uppercase tracking-[0.1em] 
                  text-[8.5vw] sm:text-[5vw] md:text-[7vw] 
                  text-left sm:text-center
                  px-0 mx-0 mb-6 sm:mb-20 leading-tight
                  sticky top-0 z-50 backdrop-blur">
      <span style={{ opacity, transition: "opacity 0.2s ease-out" }}>BECOME </span>
      OUR SPONSOR
    </h1>
  )
}

export default SponsorshipHeading