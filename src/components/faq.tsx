"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const data = [
  {
    question: "Do I need to be a UW student to attend?",
    ans: `No, TEDxUW is open to everyone. Our talks are designed for a mature audience, so we recommend attendees be 12+. Please avoid bringing young children who might disrupt the experience. (Minors should attend with a guardian and follow venue policies.)`,
  },
  {
    question: "What is TEDx, and how is TEDxUW related to TED?",
    ans: `TEDxUW is an independently organized TEDx event, produced by volunteers under license from TED. We follow TED’s format and spirit of Ideas Worth Spreading, but programming and operations are curated locally by our team—not by TED.`,
  },
  {
    question: "Will the talks be recorded or posted online?",
    ans: `Yes. Talks are filmed, and selected talks may be published on the TEDx Talks YouTube channel (and occasionally featured by TED). Publication isn’t guaranteed. Audience members may appear in wide shots; if you prefer not to, ask our volunteers about camera-light seating.`,
  },
];

export default function FAQ() {
  // hold open state of each FAQ
  const [isOpen, setIsOpen] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const pathname = usePathname(); // detect route changes

  // Reset open states of questions every time the component mounts/page reroutes
  useEffect(() => {
    setIsOpen(Array(data.length).fill(false));
  }, [pathname]);

  const toggleAccordion = (index: number) => {
    setIsOpen((prev) => prev.map((open, i) => (i === index ? !open : open)));
  };

  return (
    <div className="flex flex-col items-center text-black mt-10 mb-20 md:mb-35 xl:mb-50">
      {data.map((item, i) => (
        <div
          key={i}
          className="w-4/5 min-w-48 bg-white rounded-xl px-6 md:px-8 xl:px-10 py-3 md:py-4 mb-5 text-sm md:text-base xl:text-lg cursor-pointer"
          onClick={() => toggleAccordion(i)}
        >
          {/* quetsion */}
          <div className="flex justify-between items-center ">
            <h1 className="font-semibold text-base md:text-lg xl:text-xl">
              {item.question}
            </h1>
            {/* animation for + to x on open and collapse*/}
            <motion.h1
              animate={{ rotate: isOpen[i] ? 135 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "50% 55%" }}
              className="text-lg md:text-xl xl:text-3xl font-semibold"
            >
              +
            </motion.h1>
          </div>

          {/* animation to show ans */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isOpen[i] ? "auto" : 0 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden opacity-100`}
          >
            <h1 className="my-3">{item.ans}</h1>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
