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

    const speed = 1 // pixels per frame
    let requestId: number

    const scrollLoop = () => {
      if (!scrollContainer) return
      scrollContainer.scrollLeft += speed
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0
      }
      requestId = requestAnimationFrame(scrollLoop)
    }

    requestId = requestAnimationFrame(scrollLoop)
    return () => cancelAnimationFrame(requestId)
  }, [])

  return (
    <section className="w-full py-10">
      <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white px-2 sm:px-4 md:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        {tier} <span className="font-normal italic ml-1">Sponsors</span>
      </h2>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto no-scrollbar px-4 pb-6"
      >
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/4 h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] bg-white rounded-2xl p-[1.5rem] shadow-lg flex flex-col"
          >
            {/* Logo positioned at top-right corner */}
            <div className="absolute -top-1/10 w-32 sm:w-36 md:w-40 lg:w-50 h-32 sm:h-36 md:h-40 lg:h-44 relative">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Description always stays at bottom */}
            <div className="mt-auto pt-4">
              <p className="text-sm sm:text-base md:text-lg text-black">
                {sponsor.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}