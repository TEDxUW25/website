"use client"

import { motion, Variants } from "framer-motion" 
import Image from "next/image"                  
import React, { useState, useEffect, useRef } from "react"   

// Array of 5 dummy card images (typed)
const cardImages: string[] = [
  "/cards/image 1.png",
  "/cards/image 2.png",
  "/cards/image 3.png",
  "/cards/image 4.png",
  "/cards/image 5.png"
]

export default function ProjectHero() {
  const [selected, setSelected] = useState<number | null>(null)
  const [, setWindowWidth] = useState(0) // used to trigger re-render

  const spreadAngles = [-16, -11, 0, 11, 16]

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.13,
      },
    },
  }

  // Spread distance managed in ref
  const spreadXRef = useRef(200)

  useEffect(() => {
    const updateSpread = () => {
      const width = window.innerWidth
      if (width < 640) spreadXRef.current = 100
      else if (width < 1024) spreadXRef.current = 160
      else spreadXRef.current = 200

      setWindowWidth(width) // force re-render
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

  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-start pt-12 sm:pt-24 min-h-screen bg-black text-white relative overflow-hidden"
      onClick={() => setSelected(null)}
    >
      <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 -translate-y-6 sm:-translate-y-12 md:-translate-y-16">
        BECOME OUR SPONSOR
      </h1>

      <div className="relative w-full h-auto px-4 sm:px-8">
        <motion.div
          className="relative w-full h-[80vh] flex items-center justify-center"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {cardImages.map((src: string, i: number) => {
            const isSelected = selected === i
            const centerIndex = Math.floor(cardImages.length / 2)
            const offsetFromCenter = i - centerIndex
            const spreadX = spreadXRef.current
            const baseY = spreadX / -5
            const curveDrop = spreadX / 3.5
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
                }}
                whileHover={{
                  y: cardY - 20,
                  boxShadow: "0px 0px 25px rgba(178, 109, 109, 0.6)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-1/3 -translate-y-1/2 
                           w-[60vw] sm:w-[40vw] md:w-[25vw] max-w-[400px]
                           aspect-[2/3] 
                           bg-gray-800 rounded-xl cursor-pointer shadow-lg"
              >
                <Image
                  src={src}
                  alt={`card ${i}`}
                  fill
                  className="rounded-xl object-cover"
                  sizes="(max-width: 768px) 80vw, 300px"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}