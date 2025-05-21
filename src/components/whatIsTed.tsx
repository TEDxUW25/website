'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WhatIsTed: React.FC = () => (
  <section className="relative w-full bg-black flex flex-col items-center justify-center overflow-x-hidden min-h-[900px] md:min-h-[1100px] pb-0 pt-16">
    {/* Decorative lines */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Top left lines */}
      <div className="absolute top-8 left-8 w-24 h-1 bg-white rounded-full opacity-80" />
      <div className="absolute top-20 left-24 w-10 h-0.5 bg-white rounded-full opacity-80 rotate-[-15deg]" />
      {/* Top right lines */}
      <div className="absolute top-4 right-16 w-16 h-0.5 bg-white rounded-full opacity-80" />
      {/* Middle left/right lines */}
      <div className="absolute top-1/3 left-4 w-12 h-0.5 bg-white rounded-full opacity-80" />
      <div className="absolute top-1/2 right-8 w-20 h-1 bg-white rounded-full opacity-80" />
      {/* Bottom left/right lines */}
      <div className="absolute bottom-40 left-1/4 w-8 h-0.5 bg-red-600 rounded-full opacity-80" />
      <div className="absolute bottom-32 right-1/4 w-8 h-0.5 bg-red-600 rounded-full opacity-80" />
      {/* Random red lines */}
      <div className="absolute top-1/2 left-1/3 w-6 h-0.5 bg-red-600 rounded-full opacity-80 rotate-12" />
      <div className="absolute bottom-24 left-1/2 w-12 h-0.5 bg-red-600 rounded-full opacity-80 rotate-[-8deg]" />
      <div className="absolute bottom-10 right-1/3 w-10 h-0.5 bg-red-600 rounded-full opacity-80 rotate-6" />
    </div>
    {/* Title and Description */}
    <div className="w-full max-w-4xl mx-auto pb-8 flex flex-col items-center justify-center relative z-10">
      <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4 relative z-10">
        What is <span className="text-red-600">TED</span><span className="text-white">xUW</span> ?
      </h2>
      <p className="text-white text-base md:text-lg text-center max-w-2xl mx-auto mb-4 relative z-10">
        Founded in 2011, TEDxUW is the University of Waterloo's official TEDx experience. We aim to put the extended UW community onto a new type of global activity map that is being watched, shared, and talked about by the world's top thought leaders.
      </p>
      {/* Presenter image, absolutely positioned to the right */}
      <div className="hidden md:block absolute right-[-120px] top-0 z-20 h-[220px] w-[180px]">
        <Image src="/presenter.png" alt="Presenter" fill className="object-contain" />
      </div>
      <div className="block md:hidden w-32 h-32 mx-auto mb-2 relative z-20">
        <Image src="/presenter.png" alt="Presenter" fill className="object-contain" />
      </div>
    </div>
    {/* 3D Image */}
    <div className="w-full flex justify-center mb-8 z-10">
      <div className="w-full max-w-5xl">
        <Image src="/placeholder3D.png" alt="3D Visual" width={1200} height={400} className="w-full h-56 md:h-80 object-cover" />
      </div>
    </div>
    {/* Impact Text */}
    <div className="w-full max-w-3xl mx-auto pl-4 md:pl-0 z-10">
      <p className="text-white font-bold text-left text-sm md:text-base">
        With many of our Talks published on TED.com, YouTube, and other websites, TEDxUW continually triggers innovation in all corners of the globe beyond our conference date.
      </p>
    </div>
    {/* Interest Text */}
    <div className="w-full max-w-5xl mx-auto z-10 mt-10 mb-2">
      <p className="text-white text-sm md:text-base text-left">We got you interested ?<br />Buy our ticket today!</p>
    </div>
    {/* Red Trapezoid Buy Ticket Bar */}
    <div className="w-full h-20 md:h-28 absolute left-0 bottom-0 z-20" style={{ clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0% 100%)', background: '#e11d22' }}>
      <div className="flex items-center justify-end h-full w-full pr-12">
        <motion.button
          whileHover={{ scale: 1.08, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="flex items-center gap-3 focus:outline-none"
        >
          <Image src="/ticket.png" alt="Ticket Icon" width={36} height={36} />
          <span className="text-white text-xl font-bold hover:underline">Buy Ticket</span>
        </motion.button>
      </div>
    </div>
  </section>
);

export default WhatIsTed;