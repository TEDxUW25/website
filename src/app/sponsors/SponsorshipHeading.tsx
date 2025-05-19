"use client"

import { motion, useScroll, useTransform } from "framer-motion"

const SponsorshipHeading = () => {
  const { scrollY } = useScroll()

  const range = [700, 900]

  // "BECOME OUR SPONSOR" animation
  const becomeOpacity = useTransform(scrollY, range, [1, 0])
  const becomeX = useTransform(scrollY, range, [0, -40])

  // "OUR SPONSORS" animation
  const ourOpacity = useTransform(scrollY, range, [0, 1])
  const ourX = useTransform(scrollY, range, [40, 0])

  return (
    <div className="sticky top-0 z-40 w-full bg-black/70 backdrop-blur h-10 sm:h-15 md:h-18 lg:h-30 flex items-center">
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
