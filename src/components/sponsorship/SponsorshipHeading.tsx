"use client"

import { motion, useScroll, useTransform } from "framer-motion"

const SponsorshipHeading = () => {
  const { scrollY } = useScroll()

  const range = [700, 900]

  // "BECOME OUR SPONSOR" fades out and slides left
  const becomeOpacity = useTransform(scrollY, range, [1, 0])
  const becomeX = useTransform(scrollY, range, [0, -40])

  // "OUR SPONSORS" fades in and slides from right
  const ourOpacity = useTransform(scrollY, range, [0, 1])
  const ourX = useTransform(scrollY, range, [40, 0])

  return (
    <div className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur px-4 sm:px-8 lg:px-16 py-2 sm:py-4 h-16 sm:h-20 md:h-24 lg:h-32 flex items-center">
      <div className="relative w-full h-full">
        {/* Title 1: "BECOME OUR SPONSOR" */}
        <motion.h1
          style={{ opacity: becomeOpacity, x: becomeX }}
          className="absolute inset-0 font-inter text-white uppercase tracking-[0.1em] 
                     text-[6vw] sm:text-[6.6vw] md:text-[7vw] 
                     leading-tight text-center sm:text-left whitespace-nowrap"
        >
          BECOME OUR SPONSOR
        </motion.h1>

        {/* Title 2: "OUR SPONSORS" */}
        <motion.h1
          style={{ opacity: ourOpacity, x: ourX }}
          className="absolute inset-0 font-inter text-white uppercase tracking-[0.1em] 
                     text-[6vw] sm:text-[6.6vw] md:text-[7vw] 
                     leading-tight text-center sm:text-left whitespace-nowrap"
        >
          OUR SPONSORS
        </motion.h1>
      </div>
    </div>
  )
}

export default SponsorshipHeading
