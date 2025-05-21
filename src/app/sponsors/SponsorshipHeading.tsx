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
    <div className="sticky top-14 z-10 w-full h-10 sm:h-15 md:h-18 lg:h-35 flex items-center">
      <div className="relative w-full h-full flex items-center">

        {/* Title 1: "BECOME OUR SPONSOR" */}
        <motion.h1
          style={{ opacity: becomeOpacity, x: becomeX }}
          className="
            absolute 
            inset-x-0  
            top-5
            bg-black/30  
            backdrop-blur 
            text-center   
          "
        >
          <span className="font-inter text-white uppercase tracking-[0.1em] text-[7vw] leading-tight">
          BECOME OUR SPONSOR
          </span>
        </motion.h1>

        {/* Title 2: "OUR SPONSORS" */}
        <motion.h1
          style={{ opacity: ourOpacity, x: ourX }}
          className="
            absolute 
            inset-x-0 
            top-5  
            bg-black/30  
            backdrop-blur 
            text-left   
          "
        >
          <span className="font-inter text-white uppercase tracking-[0.1em] text-[7vw] leading-tight">
          OUR SPONSORS
          </span>
        </motion.h1>
      </div>
    </div>
  )
}

export default SponsorshipHeading
