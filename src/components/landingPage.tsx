'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import HeroHome from "@/components/hero";

// Types
type LoadingTextProps = {
  text: string;
  showCursor: boolean;
};

type ProgressProps = {
  progress: number;
};

// Animation variants
const fadeInVariants = {
  up: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
  left: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
  },
  right: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
  }
};

const logoHoverVariants: Variants = {
  hover: {
    scale: 1.01,
    filter: [
      'drop-shadow(0 0 0px rgba(239, 68, 68, 0))',
      'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))'
    ],
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Constants
const ANIMATION_CONFIG = {
  DURATION: 7000,
  TYPEWRITER_DELAY: 100,
  EXIT_DURATION: 0.8,
  EXIT_EASE: [0.16, 1, 0.3, 1] as const
};

// Components
const Logo: React.FC = () => (
  <motion.span {...fadeInVariants.up} className="flex items-end relative select-none">
    <motion.span 
      className="text-red-600 text-8xl md:text-9xl font-extrabold leading-none flex items-end group"
      whileHover="hover"
      variants={logoHoverVariants}
    >
      <motion.span 
        style={{ letterSpacing: '-0.05em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group-hover:text-red-500 transition-colors duration-300"
      >
        TED
      </motion.span>
      <motion.span 
        style={{ marginRight: '0.1em', marginLeft: '0.18em' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="group-hover:text-red-500 transition-colors duration-300"
      >
        x
      </motion.span>
      <motion.span 
        className="text-white font-light ml-2 group-hover:text-gray-100 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        UW
      </motion.span>
    </motion.span>
  </motion.span>
);

const ProgressBar: React.FC<ProgressProps> = ({ progress }) => (
  <div className="absolute bottom-8 left-0 w-full px-8">
    <motion.div 
      {...fadeInVariants.up}
      className="w-full h-3 bg-gray-800 rounded-full overflow-hidden"
      transition={{ ...fadeInVariants.up.transition, delay: 0.8 }}
    >
      <motion.div
        className="h-full bg-red-600"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  </div>
);

const LoadingText: React.FC<LoadingTextProps> = ({ text }) => (
  <motion.div 
    {...fadeInVariants.left}
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

const ProgressPercentage: React.FC<ProgressProps> = ({ progress }) => (
  <motion.div 
    {...fadeInVariants.right}
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
        typewriterRef.current = setTimeout(typeNextChar, ANIMATION_CONFIG.TYPEWRITER_DELAY);
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
      
      if (elapsed < ANIMATION_CONFIG.DURATION) {
        const percent = (elapsed / ANIMATION_CONFIG.DURATION) * 100;
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
          transition={{ 
            duration: ANIMATION_CONFIG.EXIT_DURATION, 
            ease: ANIMATION_CONFIG.EXIT_EASE 
          }}
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