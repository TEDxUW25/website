"use client";

import React from 'react'
import Image from 'next/image';
import PastTalkCard from './pastTalkCard';
import { motion } from 'framer-motion';

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
  return (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl mx-auto mt-2 md:mt-3 xl:mt-4">
          {pastTalks.map((talk) => (
            <PastTalkCard key={talk.id} {...talk} />
          ))}
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
  );
};

export default PastTalks;


