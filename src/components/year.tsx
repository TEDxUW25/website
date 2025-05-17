"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface YearProps {
  image: string;
  yr: string;
  theme: string;
  desc: string;
}

// returns true if window view matches query (used to check for mobile view)
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

export default function Year(props: YearProps) {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGrey, setIsGrey] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const [imgHeight, setImgHeight] = useState<number | null>(null);

  const handleClick = () => {
    if (isSmallScreen) {
      setIsExpanded((prev) => !prev);
      setIsGrey((prev) => !prev);
    }
  };

  const toggleGreyscale = () => {
    if (!isSmallScreen) {
      setIsGrey((prev) => !prev);
    }
  };

  const updateHeight = () => {
    if (imgRef.current) {
      setImgHeight(imgRef.current.clientHeight);
    }
  };
  // keeps track of height of images to ensure red box doesnt exceed height of image when opened
  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="relative text-white group">
      <p className="hidden md:block md:text-center md:p-3 md:text-xs lg:text-sm lg:px-5 xl:px-8 xl:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
        obcaecati quia nihil id cumque similique deserunt minus non a ducimus
        cupiditate expedita dicta, aliquam dolore molestiae quo sed sequi ad!
      </p>
      <img
        className={`border-y-2 border-x-1 border-white w-full filter duration-300 transition-all ease-in-out ${
          isGrey ? "grayscale-100" : ""
        }`}
        ref={imgRef}
        src={props.image}
        alt="speaker bg img"
      />
      {/* Red box for timeline events */}
      <motion.div
        className="absolute bottom-0 bg-[#e50409] w-full min-h-[20%] h-auto overflow-y-scroll border-y-2 border-x-1 border-white flex flex-col justify-center items-center"
        style={{ maxHeight: imgHeight ? `${imgHeight + 4}px` : undefined }}
        whileHover={!isSmallScreen ? "hover" : undefined}
        initial="initial"
        animate={isSmallScreen && isExpanded ? "hover" : "initial"}
        onClick={handleClick}
        onHoverStart={toggleGreyscale}
        onHoverEnd={toggleGreyscale}
        variants={{
          hover: { height: "auto" },
        }}
        transition={{ duration: 0.3 }}
      >
        {/* up arrow & animation */}
        <motion.img
          className="h-3 sm:h-4 md:h-4 xl:h-6 mt-5 mb-2 sm:mb-3"
          src="timeline_bg/up_arrow.svg"
          alt="up arrow"
          variants={{
            hover: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        />
        {/* year & theme */}
        <p className="font-semibold text-center whitespace-pre-line text-sm sm:text-lg md:text-base xl:text-lg p-1 sm:p-2 w-[80%]">
          {props.theme}
        </p>
        <h1 className="font-bold text-2xl sm:text-4xl md:text-3xl xl:text-5xl py-2 sm:py-3">
          {props.yr}
        </h1>
        {/* description animation and scroll if overflow */}
        <motion.p
          className="overflow-y-scroll"
          variants={{
            hover: { height: "auto", opacity: 1 },
            initial: { height: 0, opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="block p-5 text-sm md:text-base xl:text-lg">
            {props.desc}
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
