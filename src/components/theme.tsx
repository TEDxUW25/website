'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Theme: React.FC = () => (
  <section className="relative w-full h-[520px] md:h-[700px] flex items-center justify-center overflow-hidden bg-black">
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
    <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-4">
      <motion.div
        className="absolute top-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <span className="text-white text-2xl md:text-3xl font-semibold tracking-wide">TEDxUW 2025 Talks</span>
      </motion.div>
      <div className="flex w-full items-center justify-between px-8 md:px-20" style={{height: '100%'}}>
        {/* Left info */}
        <motion.div
          className="flex flex-col items-start justify-center h-full"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-white text-2xl md:text-3xl font-bold mb-1">October 6th, 2024</span>
          <span className="text-white text-2xl md:text-3xl font-bold">1 PM - 4 PM</span>
          <span className="text-white text-base opacity-80 mt-2">Calendar</span>
        </motion.div>
        {/* Center title */}
        <motion.div
          className="flex flex-col items-center justify-center h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h1 className="text-white text-5xl md:text-7xl font-extrabold text-center drop-shadow-xl leading-tight">Everything Reimagined</h1>
        </motion.div>
        {/* Right info */}
        <motion.div
          className="flex flex-col items-end justify-center h-full"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-white text-2xl md:text-3xl font-bold mb-1 text-right">Hagey Hall Humanity Theatre</span>
          <span className="text-white text-lg md:text-xl text-right">200 University Street West, Waterloo, Postal</span>
          <span className="text-white text-base opacity-80 mt-2">Google Maps</span>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Theme;
