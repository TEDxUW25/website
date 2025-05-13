"use client";
import { motion } from "framer-motion";
import { transferableAbortSignal } from "util";

interface YearProps {
  image: string;
  yr: string;
  theme: string;
  desc: string;
}

export default function Year(props: YearProps) {
  return (
    <div className="relative text-white">
        <p className="text-center p-2 md:px-7 md:py-3 text-xs md:text-sm xl:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati quia nihil id cumque similique deserunt minus non a ducimus cupiditate expedita dicta, aliquam dolore molestiae quo sed sequi ad!</p>
      <img className="border-y-2 border-x-1 border-white w-full" src={props.image} alt="speaker bg img" />
      <motion.div
        className="absolute bottom-0 bg-[#e50409] w-full min-h-[25%] h-auto border-y-2 border-x-1 border-white flex flex-col justify-center items-center"
        whileHover="hover"
        initial="initial"
        variants={{
          hover: { height: "auto" },
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          className="h-2 md:h-4 xl:h-6 mt-5 mb-3"
          src="timeline_bg/up_arrow.svg"
          alt="up arrow"
          variants={{
            hover: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        />
        <p className="font-semibold text-center whitespace-pre-line text-sm sm:text-sm md:text-base xl:text-lg p-2 w-[80%]">{props.theme}</p>
        <h1 className="font-bold text-3xl sm:text-2xl md:text-3xl xl:text-5xl py-3">
          {props.yr}
        </h1>
        <motion.p
          className="overflow-hidden"
          variants={{
            hover: { height: "auto", opacity: 1 },
            initial: { height: 0, opacity: 0},
          }}
          transition={{duration: 0.3}}
        >
          <span className="block p-5">{props.desc}</span>
        </motion.p>
      </motion.div>
    </div>
  );
}
