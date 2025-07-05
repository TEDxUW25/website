'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { IoTicket } from "react-icons/io5";

const WhatIsTed = () => {
  return (
    <section className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden min-h-[900px] md:min-h-[1100px] pb-0 pt-8 md:pt-16">
      {/* Moving particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-red-600' : 'bg-white'
            } opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced decorative lines with animations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top left lines */}
        <motion.div 
          className="absolute top-8 left-8 w-24 h-1 bg-white rounded-full opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.div 
          className="absolute top-20 left-24 w-10 h-0.5 bg-white rounded-full opacity-80 rotate-[-15deg]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
        {/* Top right lines */}
        <motion.div 
          className="absolute top-4 right-8 md:right-16 w-16 h-0.5 bg-white rounded-full opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />
        {/* Middle left/right lines */}
        <motion.div 
          className="absolute top-1/3 left-4 w-12 h-0.5 bg-white rounded-full opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        />
        <motion.div 
          className="absolute top-1/2 right-4 md:right-8 w-20 h-1 bg-white rounded-full opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        />
        {/* Bottom left/right lines */}
        <motion.div 
          className="absolute bottom-40 left-1/4 w-8 h-0.5 bg-red-600 rounded-full opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-32 right-1/4 w-8 h-0.5 bg-red-600 rounded-full opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        />
        {/* Random red lines */}
        <motion.div 
          className="absolute top-1/2 left-1/3 w-6 h-0.5 bg-red-600 rounded-full opacity-80 rotate-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-24 left-1/2 w-12 h-0.5 bg-red-600 rounded-full opacity-80 rotate-[-8deg]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-10 right-1/3 w-10 h-0.5 bg-red-600 rounded-full opacity-80 rotate-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        />
      </div>

      {/* Title and Description */}
      <motion.div 
        className="w-full max-w-4xl mx-auto px-4 pb-8 flex flex-col items-center justify-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          What is <span className="text-red-600">TED</span><span className="text-white">xUW</span>?
        </motion.h2>
        
        <motion.p 
          className="text-white text-base md:text-lg lg:text-xl text-center max-w-3xl mx-auto mb-6 leading-relaxed relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Founded in 2011, TEDxUW is the University of Waterloo's official TEDx experience. We aim to put the extended UW community onto a new type of global activity map that is being watched, shared, and talked about by the world's top thought leaders.
        </motion.p>
        
        {/* Enhanced presenter image positioning */}
        <div className="hidden lg:block absolute right-[-100px] xl:right-[-140px] top-0 z-20 h-[220px] w-[180px]">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-8 h-8 bg-red-600 rounded-full"></div>
              </div>
              <p className="text-white text-sm font-semibold">Featured</p>
              <p className="text-gray-400 text-xs">Speaker</p>
            </div>
          </motion.div>
        </div>
        
        {/* Mobile presenter image */}
        <motion.div 
          className="block lg:hidden w-32 h-32 mx-auto mb-4 relative z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-1">
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
              </div>
              <p className="text-white text-xs font-semibold">Speaker</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Impact Text */}
      <motion.div 
        className="w-full max-w-4xl mx-auto px-4 md:px-0 z-10 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="bg-gradient-to-r from-red-600/10 to-transparent border-l-4 border-red-600 p-4 rounded-r-lg">
          <p className="text-white font-bold text-sm md:text-base leading-relaxed">
            With many of our Talks published on TED.com, YouTube, and other websites, TEDxUW continually triggers innovation in all corners of the globe beyond our conference date.
          </p>
        </div>
      </motion.div>

      {/* Enhanced Interest Text */}
      <motion.div 
        className="w-full max-w-5xl mx-auto px-4 z-10 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <p className="text-white text-sm md:text-base text-center md:text-left">
          We got you interested?<br />
          <span className="text-red-600 font-semibold">Buy our ticket today!</span>
        </p>
      </motion.div>

      {/* Enhanced Red Trapezoid Buy Ticket Bar */}
      <motion.div 
        className="w-full h-20 md:h-28 absolute left-0 bottom-0 z-20 bg-gradient-to-r from-red-600 to-red-700 shadow-lg"
        style={{ clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0% 100%)' }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <div className="flex items-center justify-center md:justify-end h-full w-full px-4 md:pr-12">
          <a href="/buy_ticket" target="_blank" className="">
          <motion.button
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center gap-3 focus:outline-none group"
          >
            <motion.div
              className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <IoTicket />
            </motion.div>
            <span className="text-white text-lg md:text-xl font-bold group-hover:underline">
              Buy Tickets
            </span>
            <motion.div
              className="w-6 h-6 text-white"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              →
            </motion.div>
          </motion.button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default WhatIsTed;