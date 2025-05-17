'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroHome from "@/components/hero";

const DURATION = 7000;
const TYPEWRITER_DELAY = 100;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

const Logo: React.FC = () => (
  <motion.span {...fadeInUp} className="flex items-end relative select-none">
    <motion.span 
      className="text-red-600 text-8xl md:text-9xl font-extrabold leading-none flex items-end group"
      whileHover={{ 
        filter: [
          'drop-shadow(0 0 0px rgba(239, 68, 68, 0))',
          'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))'
        ]
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.span 
        style={{ letterSpacing: '-0.05em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group-hover:text-red-500"
      >
        TED
      </motion.span>
      <motion.span 
        style={{ marginRight: '0.1em', marginLeft: '0.18em' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="group-hover:text-red-500"
      >
        x
      </motion.span>
      <motion.span 
        className="text-white font-light ml-2 group-hover:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        UW
      </motion.span>
    </motion.span>
  </motion.span>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="absolute bottom-8 left-0 w-full px-8">
    <motion.div 
      {...fadeInUp}
      className="w-full h-3 bg-gray-800 rounded-full overflow-hidden"
      transition={{ ...fadeInUp.transition, delay: 0.8 }}
    >
      <motion.div
        className="h-full bg-red-600"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  </div>
);

const LoadingText: React.FC<{ text: string; showCursor: boolean }> = ({ text, showCursor }) => (
  <motion.div 
    {...fadeInLeft}
    className="absolute top-8 left-8 text-white font-light text-lg"
  >
    <span>{text}</span>
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    >
      |
    </motion.span>
  </motion.div>
);

const ProgressPercentage: React.FC<{ progress: number }> = ({ progress }) => (
  <motion.div 
    {...fadeInRight}
    className="absolute top-8 right-8 text-lg"
  >
    <motion.span
      key={Math.round(progress)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="font-medium tracking-wider text-gray-100"
    >
      {Math.round(progress)}%
    </motion.span>
  </motion.div>
);

const LandingLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const text = "Loading your experience...";
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        typewriterRef.current = setTimeout(typeNextChar, TYPEWRITER_DELAY);
      }
    };

    typeNextChar();
    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < DURATION) {
        const percent = (elapsed / DURATION) * 100;
        setProgress(percent);
        requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        setShowLoader(false);
      }
    };

    requestAnimationFrame(animateProgress);
  }, []);

  return (
    <AnimatePresence>
      {showLoader ? (
        <motion.div 
          className="fixed inset-0 bg-black flex flex-col justify-center items-center min-h-screen w-full z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <LoadingText text={displayText} showCursor={true} />
          <ProgressPercentage progress={progress} />
          <div className="flex items-center justify-center mb-24">
            <Logo />
          </div>
          <ProgressBar progress={progress} />
        </motion.div>
      ) : (
        <HeroHome />
      )}
    </AnimatePresence>
  );
};

export default LandingLoader; 