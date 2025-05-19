"use client"

import { motion, Variants } from "framer-motion" 
import Image from "next/image"                  
import React, { useState, useEffect, useRef } from "react"  

// Array of 5 dummy card images (typed)
const cardImages: string[] = [
  "/sponsorHeroCards/image 1.png",
  "/sponsorHeroCards/image 2.png",
  "/sponsorHeroCards/image 3.png",
  "/sponsorHeroCards/image 4.png",
  "/sponsorHeroCards/image 5.png"
]

export default function SponsorshipCard() {
  const [selected, setSelected] = useState<number | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)

  // Adjust spread angles based on screen size
  const spreadAngles = windowWidth < 640 ? [-8, -4, 0, 4, 8] : 
                      windowWidth < 1024 ? [-12, -6, 0, 6, 12] : 
                      [-16, -11, 0, 11, 16]

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.13,
      },
    },
  }
  const spreadXRef = useRef(200)
  const curveAmountRef = useRef(200)

  useEffect(() => {
    const updateSpread = () => {
      const width = window.innerWidth
      // Adjust spread distance based on screen size
      if (width < 640) spreadXRef.current = 60
      else if (width < 768) spreadXRef.current = 70
      else if (width < 1024) spreadXRef.current = 120
      else spreadXRef.current = 200

      // Vertical curve amount 
      if (width < 640) curveAmountRef.current = 40
      else if (width < 768) curveAmountRef.current = 80
      else if (width < 1024) curveAmountRef.current = 120
      else curveAmountRef.current = 200

      setWindowWidth(width)
    }

    updateSpread()
    window.addEventListener("resize", updateSpread)
    return () => window.removeEventListener("resize", updateSpread)
  }, [])

  const calculateCardY = (offsetFromCenter: number, baseY: number, curveDrop: number): number => {
    return offsetFromCenter === 0 ? 0 : baseY + 1.5 * Math.abs(offsetFromCenter) * curveDrop
  }

  const cardVariants = (
    angle: number,
    offsetFromCenter: number,
    spreadX: number
  ): Variants => {
    const baseY = spreadX / -5
    const curveDrop = spreadX / 3.5

    return {
      initial: {
        rotate: 0,
        x: 0,
        y: 0,
        opacity: 0,
      },
      animate: {
        rotate: angle,
        x: offsetFromCenter * spreadX,
        y: calculateCardY(offsetFromCenter, baseY, curveDrop),
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
        },
      },
    }
  }

  return (
    <div className="w-full h-auto 
                    px-2 sm:px-4 md:px-8 
                    mt-3 sm:mt-5 md:mt-10 lg:mt-15 
                    pt-8">
      <motion.div
        className="relative w-full 
                   h-[35vh] sm:h-[37vh] md:h-[40vh] lg:h-[90vh] 
                   flex items-center justify-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {cardImages.map((src: string, i: number) => {
          const isSelected = selected === i
          const centerIndex = Math.floor(cardImages.length / 2)
          const offsetFromCenter = i - centerIndex
          const spreadX = spreadXRef.current
          const curveAmount = curveAmountRef.current
          const baseY = spreadX / -5
          const curveDrop = curveAmount / 3.5
          const cardY = calculateCardY(offsetFromCenter, baseY, curveDrop)

          return (
            <motion.div
              key={i}
              layoutId={`card-${i}`}
              variants={cardVariants(spreadAngles[i], offsetFromCenter, spreadX)}
              onClick={(e) => {
                e.stopPropagation()
                setSelected((prev) => (prev === i ? null : i))
              }}
              animate={{
                rotate: isSelected ? 0 : spreadAngles[i],
                scale: isSelected ? 1.05 : 1,
                zIndex: isSelected
                  ? 50
                  : cardImages.length - Math.abs(i - centerIndex),
                opacity: 1,
                y: isSelected ? cardY - 30 : cardY,
                x: offsetFromCenter * spreadX,
              }}
              whileHover={{
                y: cardY - 20,
                boxShadow: "0px 0px 25px rgba(178, 109, 109, 0.6)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute top-1/3 -translate-y-1/2 
                         w-[30vw]
                         max-w-[400px]
                         aspect-[2/3] 
                         bg-gray-800 rounded-xl cursor-pointer shadow-lg`}
            >
              <Image
                src={src}
                alt={`card ${i}`}
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 640px) 70vw, (max-width: 768px) 50vw, (max-width: 1024px) 30vw, 25vw"
              />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}