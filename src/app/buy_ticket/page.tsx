"use client";
import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const renderPaymentUI = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3
        className="text-[clamp(1.5rem,3vw,3.5rem)] font-Inter text-[#d9d4c1] font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Purchase today to secure your spot!
      </motion.h3>

      <motion.a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-12 py-6 text-[clamp(1.1rem,2vw,2rem)] font-bold font-Inter text-white bg-[#E50609] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#E50609]/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">PURCHASE TICKETS NOW</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#ff0000] to-[#E50609]"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    </motion.div>
  );
};

const TimeUnit = ({ value, label }: { value: string; label: string }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true);
      setPrevValue(value);
    }
  }, [value, prevValue]);

  // Split the value into individual digits
  const digits = value.split("");
  const prevDigits = prevValue.split("");

  return (
    <motion.div
      className="flex flex-col items-center py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="text-[clamp(1.75rem,5.5vw,7rem)] font-extrabold font-Inter px-3 md:px-5 lg:px-7 py-2 rounded-lg text-[#d9d4c1] relative"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex">
            {digits.map((digit, index) => {
              const isChanging = isAnimating && digit !== prevDigits[index];
              return (
                <span
                  key={`${index}-${digit}`}
                  className="inline-block relative h-[1.2em] w-[0.75em] overflow-hidden align-middle"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${index}-${digit}`}
                      className="absolute inset-0 w-full text-center"
                      initial={isChanging ? { y: -100, opacity: 0 } : undefined}
                      animate={{ y: 0, opacity: 1 }}
                      exit={isChanging ? { y: 100, opacity: 0 } : undefined}
                      transition={{
                        duration: 0.5,
                        ease: [0.52, 0.72, 0, 0.8],
                      }}
                    >
                      {digit}
                    </motion.span>
                  </AnimatePresence>
                </span>
              );
            })}
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 blur-xl bg-white/10"
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
      <motion.span
        className="mt-2 md:mt-3 text-[clamp(0.75rem,1.5vw,2rem)] uppercase tracking-widest text-[#d9d4c1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    return renderPaymentUI();
  } else {
    return (
      <motion.div
        className="flex gap-[2vw] justify-center items-center text-white mt-8 mb-3 sm:mb-5 md:mb-8 lg:mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TimeUnit value={String(days).padStart(2, "0")} label="days" />
        <motion.span
          className="text-[clamp(2rem,6vw,7rem)] font-extrabold font-Inter text-[#d9d4c1] -translate-y-[12%]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          :
        </motion.span>
        <TimeUnit value={String(hours).padStart(2, "0")} label="hours" />
        <motion.span
          className="text-[clamp(2rem,6vw,7rem)] font-extrabold font-Inter text-[#d9d4c1] -translate-y-[12%]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          :
        </motion.span>
        <TimeUnit value={String(minutes).padStart(2, "0")} label="minutes" />
        <motion.span
          className="text-[clamp(2rem,6vw,7rem)] font-extrabold font-Inter text-[#d9d4c1] -translate-y-[12%]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          :
        </motion.span>
        <TimeUnit value={String(seconds).padStart(2, "0")} label="seconds" />
      </motion.div>
    );
  }
};

export default function BuyTicketPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black text-white mt-[5%]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="relative z-10 grid grid-cols-12 h-full">
        {/* left side */}
        <motion.div
          className="col-span-12 md:col-span-3 flex flex-col justify-between border-r border-white/15 bg-black overflow-hidden relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* red gradient glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#E50609]/70 via-[#770505]/30 to-transparent" />
          {/* glow ring – 25 % of sidebar width */}
          <div className="absolute left-0 top-1/2 -translate-x-[65%] -translate-y-1/2 hidden md:block z-10 w-[75%] aspect-square">
            <div className="w-full h-full rounded-full bg-[#cb2b2a]" />
          </div>

          <div className="absolute left-0 top-1/2 -translate-x-[65%] -translate-y-1/2 hidden md:block z-0 w-[175%] aspect-square">
            <div className="w-full h-full rounded-full bg-black" />
          </div>

          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
            <p className="rotate-180 origin-left text-sm lg:text-lg font-light tracking-widest text-white/50 [writing-mode:vertical-rl]">
              INDEPENDENTLY ORGANISED TEDx EVENT
            </p>
          </div>
        </motion.div>

        {/* right side */}
        <div className="col-span-12 md:col-span-9 flex flex-col items-center justify-center text-center overflow-hidden">
          <motion.h2
            className="text-[clamp(1.6rem,4.75vw,5rem)] font-Inter text-[#d9d4c1] font-extrabold mt-16 lg:mt-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            TICKET SALES NOW OPEN
          </motion.h2>
          {isMounted ? (
            <Countdown
              date={new Date("2025-09-01T00:00:00")}
              renderer={renderer}
            />
          ) : (
            <div className="flex gap-10 justify-center items-center text-[#d9d4c1] mt-8 mb-12">
              <TimeUnit value="00" label="days" />
              <span className="text-8xl font-extrabold font-Inter text-[#d9d4c1]">
                :
              </span>
              <TimeUnit value="00" label="hours" />
              <span className="text-8xl font-extrabold font-Inter text-[#d9d4c1]">
                :
              </span>
              <TimeUnit value="00" label="minutes" />
              <span className="text-8xl font-extrabold font-Inter text-[#d9d4c1]">
                :
              </span>
              <TimeUnit value="00" label="seconds" />
            </div>
          )}
          <motion.h2
            className="text-[clamp(1.5rem,3.5vw,4rem)] font-Inter text-[#E50609] font-bold text-center pt-3 px-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            EVERYTHING REIMAGINED
          </motion.h2>
          <motion.h2
            className="text-[clamp(2rem,3vw,4.5rem)] font-Inter text-[#595654] text-center font-light pb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            OCTOBER 26, 2025
          </motion.h2>
          <motion.div
            className="text-center text-[#d9d4c1] text-[clamp(0.8rem,1.1vw,2.5rem)] w-[75%] py-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Please note that payments are <b>non-refundable</b>. Spots are
            limited!
            <br />
            Please act swiftly if you wish to be part of this experience.
          </motion.div>
        </div>
      </div>
    </div>
  );
}
