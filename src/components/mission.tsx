"use client";
import { useState } from "react";
import { useMediaQuery } from "@/components/year";

export default function Mission() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    if (isMobile) {
      setIsFlipped((prev) => !prev);
    }
  };
  return (
    <div className="w-full h-full p-10 flex justify-center items-center bg-white">
      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] text-black font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl sm:gap-2 md:gap-4 xl:gap-8">
        {/* top text */}
        <div className="col-span-3 row-start-1 h-16 md:h-20 xl:h-24 flex justify-center items-center">
          Our Mission
        </div>

        {/* left text */}
        <div className="col-start-1 row-start-2 w-12 sm:w-16 md:w-20 xl:w-24 flex justify-center items-center">
          <h1 className="transform -rotate-90 whitespace-nowrap">Hover Me</h1>
        </div>

        {/* center image & flip animation*/}
        <div
          className="col-start-2 row-start-2 aspect-square w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] xl:w-[500px] xl:h-[500px] cursor-pointer group [perspective:1000px]"
          onClick={toggleFlip}
        >
          <div
            className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
              isMobile
                ? isFlipped
                  ? "[transform:rotateY(180deg)]"
                  : ""
                : "group-hover:[transform:rotateY(180deg)]"
            }`}
          >
            {/* Front Face */}
            <img
              className="w-full h-full object-cover shadow-lg shadow-gray-500"
              src="mission.svg"
              alt="our mission"
            />
            {/* Back Face */}
            <div className="absolute inset-0 h-full w-full p-4 sm:p-6 md:p-8 xl:p-10 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-black text-white flex flex-col items-center">
              <h1 className="text-sm sm:text-lg md:text-2xl xl:text-3xl font-bold text-[#e50409] xl:py-3">
                Our Mission
              </h1>
              <p className="text-[10px] leading-normal sm:text-xs md:text-base xl:text-lg px-4 md:px-8 xl:px-12">
                <br />
                Dear all,
                <br />
                <br />
                To unite the brightest minds within the University of Waterloo
                community to create an environment where change-makers can share
                their ideas and achievements with the world.
                <br />
                <br />
                Sincerely,
                <br />
                TEDxUW
              </p>
            </div>
          </div>
        </div>

        {/* bottom text */}
        <div className="col-span-3 row-start-3 h-16 md:h-20 xl:h-24 flex justify-center items-center">
          Our Mission
        </div>

        {/* right text */}
        <div className="col-start-3 row-start-2 w-12 sm:w-16 md:w-20 xl:w-24 flex justify-center items-center">
          <h1 className="transform rotate-90 whitespace-nowrap">Hover Me</h1>
        </div>
      </div>
    </div>
  );
}
