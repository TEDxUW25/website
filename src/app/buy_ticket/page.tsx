"use client";
import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const renderPaymentUI = () => {
  return null;
  // When the countdown is complete, the payment UI can go here I guess (Whoever has Payement UI ticket)
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
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold font-Inter px-3 sm:px-5 md:px-8 py-3 lg:py-4 rounded-lg text-white relative"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex space-x-0.5 md:space-x-1 xl:space-x-2">
            {digits.map((digit, index) => {
              const isChanging = isAnimating && digit !== prevDigits[index];
              return (
                <span
                  key={`${index}-${digit}`}
                  className="inline-block relative h-[1em] w-[0.6em] overflow-hidden align-middle"
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
        className="mt-2 md:mt-3 text-[0.7rem] sm:text-sm md:text-lg uppercase tracking-widest text-white"
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
        className="flex gap-2 md:gap-5 lg:gap-8 justify-center items-center text-white mt-8 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TimeUnit value={String(days).padStart(2, "0")} label="days" />
        <motion.span
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold font-Inter text-white -translate-y-1/3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          :
        </motion.span>
        <TimeUnit value={String(hours).padStart(2, "0")} label="hours" />
        <motion.span
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold font-Inter text-white -translate-y-1/3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          :
        </motion.span>
        <TimeUnit value={String(minutes).padStart(2, "0")} label="minutes" />
        <motion.span
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold font-Inter text-white -translate-y-1/3"
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
      className="min-h-screen flex flex-col items-center bg-black bg-opacity-80 px-4 mt-32"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-normal font-Inter text-white mb-12 mt-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Ticket Sales Open In
      </motion.h2>
      {isMounted ? (
        <Countdown date={new Date("2025-09-01T00:00:00")} renderer={renderer} />
      ) : (
        <div className="flex gap-10 justify-center items-center text-white mt-8 mb-12">
          <TimeUnit value="00" label="days" />
          <span className="text-8xl font-extrabold font-Inter text-white">
            :
          </span>
          <TimeUnit value="00" label="hours" />
          <span className="text-8xl font-extrabold font-Inter text-white">
            :
          </span>
          <TimeUnit value="00" label="minutes" />
          <span className="text-8xl font-extrabold font-Inter text-white">
            :
          </span>
          <TimeUnit value="00" label="seconds" />
        </div>
      )}
      <motion.div
        className="mt-16 text-center text-white text-base md:text-xl max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Please note that payments are <b>non-refundable</b>. Spots are limited!
        <br />
        Please act swiftly if you wish to be part of this experience.
      </motion.div>
    </div>
  );
}
