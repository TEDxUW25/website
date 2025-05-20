"use client"

import { useEffect } from "react"
import { motion, useTransform, useMotionValue, animate } from "framer-motion"

const SponsorshipHeading = ({ cardVisible }: { cardVisible: boolean }) => {
  const visibilityValue = useMotionValue(cardVisible ? 1 : 0)

  // Smoothly animate when visibility changes
  const becomeOpacity = useTransform(visibilityValue, [0, 1], [0, 1])
  const becomeX = useTransform(visibilityValue, [0, 1], [-40, 0])

  const ourOpacity = useTransform(visibilityValue, [0, 1], [1, 0])
  const ourX = useTransform(visibilityValue, [0, 1], [0, 40])

  // Optional: animate `visibilityValue` using useEffect
  useEffect(() => {
    animate(visibilityValue, cardVisible ? 1 : 0, {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], 
    })
  }, [cardVisible, visibilityValue])

  return (
    <div className="sticky top-15 z-10 w-full bg-black/70 backdrop-blur h-10 sm:h-15 md:h-18 lg:h-30 flex items-center">
      <div className="relative w-full h-full flex items-center">
        {/* Title 1: "BECOME OUR SPONSOR" */}
        <motion.h1
          style={{ opacity: becomeOpacity, x: becomeX }}
          className="absolute inset-0 font-inter text-white uppercase tracking-[0.1em] 
                     text-[7vw] 
                     leading-tight text-center"
        >
          BECOME OUR SPONSOR
        </motion.h1>

        {/* Title 2: "OUR SPONSORS" */}
        <motion.h1
          style={{ opacity: ourOpacity, x: ourX }}
          className="absolute inset-0 font-inter text-white uppercase tracking-[0.1em] 
                     text-[7vw] 
                     leading-tight text-center sm:text-left
                     px-1 sm:px-2 lg:px-4"
        >
          OUR SPONSORS
        </motion.h1>
      </div>
    </div>
  )
}

export default SponsorshipHeading
