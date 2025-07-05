"use client";

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import PastTalkCard from './pastTalkCard';
import { motion, AnimatePresence } from 'framer-motion';

// Example data: add your real YouTube links, titles, and descriptions
const pastTalks = [
  { id: 1, title: 'Success Isn\'t Linear', desc: 'Jordan Howlett', youtube: 'https://www.youtube.com/watch?v=oKN1d6sremo' },
  { id: 2, title: 'I Draw Real World Inspiration from Things I Use to Escape from the Real World', desc: 'Arda Ocal', youtube: 'https://www.youtube.com/watch?v=2CJHCBLAeWo' },
  { id: 3, title: 'AI Will Set Education Back 2500 Years... And That\'s a Good Thing', desc: 'Robert Clapperton', youtube: 'https://www.youtube.com/watch?v=ZcIkF4gLvsc' },    
  { id: 4, title: 'Why you need to think like an entrepreneur when it comes to your career', desc: 'Camelia Nunez', youtube: 'https://www.youtube.com/watch?v=KF8ZResRLLs' },
  { id: 5, title: 'Taking Unreasonable Bets', desc: 'Dhananja Jayalath', youtube: 'https://www.youtube.com/watch?v=2Y8Y49nqiN0' },
  { id: 6, title: 'Achieving Excellence: One Choice & Three Practices', desc: 'Anil Gupta', youtube: 'https://www.youtube.com/watch?v=3Ez9Lm-0Qu8' },
  { id: 7, title: 'Why you will fail to have a great career', desc: 'Larry Smith', youtube: 'https://www.youtube.com/watch?v=iKHTawgyKWQ' },
  { id: 8, title: 'A Friend in Debt', desc: 'Patrick Gill', youtube: 'https://www.youtube.com/watch?v=7BNBU484XOE' },
  { id: 9, title: 'Why life is all about REAL connections.', desc: 'Michael Bociurkiw', youtube: 'https://www.youtube.com/watch?v=BXu_V1qfw0I' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const PastTalks: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlaySpeed = 5000; // 5 seconds per slide
  const totalSlides = Math.ceil(pastTalks.length / 3); // 3 cards per slide

  // Handle navigation
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [currentIndex, handleNext]);

  // Create slides - 3 cards per slide
  const slides = [];
  for (let i = 0; i < pastTalks.length; i += 3) {
    slides.push(pastTalks.slice(i, i + 3));
  }

  return (
    <div>
      <section className="relative flex flex-col items-center justify-center w-full min-h-[700px] pt-8 md:pt-10 pb-10 bg-white overflow-hidden p-10">
        {/* Mobile white gradient overlay for title readability */}
        <div className="absolute top-0 left-0 w-full h-24 z-10 bg-gradient-to-b from-white via-white/80 to-transparent block md:hidden pointer-events-none" />
        {/* Background image */}
        <div className="absolute inset-x-0 w-full h-full z-0 flex items-start justify-center pointer-events-none select-none mt-16 md:mt-20 xl:mt-24">
          <Image
            src="/pastTalkBG.png"
            alt="Past Talks Background"
            fill
            style={{ objectFit: 'contain', objectPosition: '54.5% 0%' }}
            priority
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto">
          <div className="h-16 md:h-20 xl:h-24 flex items-center justify-center w-full mb-16 md:mb-24 xl:mb-32">
            <motion.h2
              className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-black text-center w-full"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              transition={fadeUp.transition}
              viewport={{ once: true }}
            >
              Past Talks
            </motion.h2>
          </div>
          
          {/* Carousel */}
          <div className="relative w-full max-w-6xl">
            <div className="overflow-hidden h-[250px] sm:h-[200px] md:h-[200px] lg:h-[240px]" ref={carouselRef}>
              <AnimatePresence initial={false} custom={direction} mode="wait" onExitComplete={() => setIsAnimating(false)}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{
                    x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
                    opacity: 0,
                    scale: 0.95
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      opacity: { duration: 0.2, ease: "easeOut" },
                    }
                  }}
                  exit={{
                    x: direction < 0 ? '100%' : direction > 0 ? '-100%' : 0,
                    opacity: 0,
                    scale: 0.95,
                    transition: { 
                      duration: 0.4, 
                      ease: [0.32, 0.72, 0, 1] // Custom easing curve for smooth exit
                    }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full h-full"
                >
                  {slides[currentIndex].map((talk, i) => (
                    <motion.div 
                      key={talk.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: i * 0.1, // Stagger the cards' entrance
                          duration: 0.5,
                          ease: "easeOut" 
                        }
                      }}
                      className="h-full"
                    >
                      <PastTalkCard {...talk} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <motion.button 
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}  
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 sm:-ml-10 z-20 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </motion.button>
            <motion.button 
              onClick={handleNext}
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              aria-label="Next slide"
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 sm:-mr-10 z-20 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </motion.button>

            {/* Dots navigation */}
            <div className="flex items-center justify-center mt-8">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <motion.button
                  key={i}
                  initial={false}
                  animate={{ 
                    width: i === currentIndex ? 24 : 12,
                    backgroundColor: i === currentIndex ? "#dc2626" : "#d1d5db"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    duration: 0.3 
                  }}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className="h-3 mx-1 rounded-full focus:outline-none hover:bg-gray-400"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="flex justify-center w-full mt-16 md:mt-20"
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-lg md:text-xl text-black font-bold text-center max-w-fit shadow-sm">
              and{' '}
              <a
                href="https://www.youtube.com/@TEDx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 font-bold underline underline-offset-2 hover:text-red-800 transition-colors duration-150"
              >
                more
              </a>
              ...
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PastTalks;
