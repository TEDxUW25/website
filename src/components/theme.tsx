'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdOutlineArrowOutward } from "react-icons/md";

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.2, // Start after panels reveal
      staggerChildren: 0.04,
    },
  },
};

const letter = {
  hidden: {
    y: '100%',
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
  },
  visible: {
    y: '0%',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      ease: [0.455, 0.03, 0.515, 0.955],
      duration: 1.2,
    },
  },
};

const title = 'Everything Reimagined';

const Theme: React.FC = () => (
  <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
    {/* Revealing Color Panels */}
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-black z-50" 
      initial={{ y: 0 }}
      whileInView={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: 'easeInOut', delay: 0 }}
      viewport={{ once: true, amount: 0.1 }}
    />
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-[#3e0000] z-40" 
      initial={{ y: 0 }}
      whileInView={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
      viewport={{ once: true, amount: 0.1 }}
    />
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-[#9c1417] z-30" 
      initial={{ y: 0 }}
      whileInView={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
      viewport={{ once: true, amount: 0.1 }}
    />

    {/* Animated Background */}
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <Image
        src="/2025theme.png"
        alt="2025 Theme"
        fill
        className="object-cover object-center"
        priority
      />
    </motion.div>
    {/* Overlay */}
    <div className="absolute inset-0 z-10" id = "theme">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <motion.div
          className="absolute top-10 flex justify-center w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 1.8 }}
          viewport={{ once: true }}
        >
          <span className="text-white text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide">
            TEDxUW 2025 Talks
          </span>
        </motion.div>

        {/* Center title */}
        <motion.h1
          className="text-white text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem] font-bold text-center drop-shadow-xl tracking-wide flex flex-col md:flex-row md:gap-x-4 items-center justify-center"
          variants={sentence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          {title.split(' ').map((word, wordI) => (
            <span key={wordI} style={{ whiteSpace: 'nowrap' }}>
              {word.split('').map((char, charI) => (
                <motion.span
                  style={{ display: 'inline-block', paddingBottom: '1.2em' }}
                  variants={letter}
                  key={`${char}-${charI}`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Left info */}
        <motion.div
          className="absolute bottom-[22%] sm:bottom-[28%] md:bottom-[30%] left-[5%] md:left-[10%] lg:left-[15%] flex flex-col items-start"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 1.8 }}
          viewport={{ once: true }}
        >
          <span className="text-white text-md sm:text-xl md:text-2xl font-bold">November 2nd, 2025</span>
          <span className="text-white text-md sm:text-xl md:text-2xl font-bold">1 PM - 4 PM</span>
          <a target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=M2dsazZvMm5rbWZ0cW41Z29tZml0cTE3NTMgdHJpbmhtaW5odGhhbzIxMTkzQG0&amp;tmsrc=trinhminhthao21193%40gmail.com"
          className="hover:underline transition ease-in-out">
            <span className="flex flex-cols text-white text-xs sm:text-base opacity-80 mt-2">Calendar 
              <MdOutlineArrowOutward className='mt-1'/>
            </span>
          </a>
        </motion.div>

        {/* Right info */}
        <motion.div
          className="absolute bottom-[10%] md:bottom-[22%] right-[5%] md:right-[10%] lg:right-[15%] flex flex-col items-end"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 1.8 }}
          viewport={{ once: true }}
        >
          <span className="text-white text-md sm:text-xl md:text-2xl font-bold text-right">
            Hagey Hall Humanity Theatre
          </span>
          <span className="text-white text-xs sm:text-md md:text-lg text-right">
            200 University Street West, Waterloo, ON N2L 3G1
          </span>
          <a href="https://g.co/kgs/9fgTqHw" target="_blank" className="hover:underline transition ease-in-out">
            <span className="flex flex-cols text-white text-xs sm:text-base opacity-80 mt-2">Google Maps 
              <MdOutlineArrowOutward className='mt-1'/>
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Theme;
