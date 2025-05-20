'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import LandingTransition from './landingTransition';

// Component props and animation configuration
type LoadingTextProps = { text: string };
type ProgressProps = { progress: number };

const ANIMATION_CONFIG = {
  DURATION: 4000,
  TYPEWRITER_DELAY: 100,
  LOADING_COMPLETE_PAUSE: 800
} as const;

// Animation variants for fade and hover effects
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
} as const;

const logoHoverVariants: Variants = {
  hover: {
    scale: 1.01,
    filter: [
      'drop-shadow(0 0 0px rgba(239, 68, 68, 0))',
      'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))'
    ],
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

/**
 * Logo component displays the animated TED×UW logo with hover effects
 */
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

/**
 * ProgressBar component shows the loading progress with a red indicator
 */
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

/**
 * LoadingText component displays the typewriter-style loading message
 */
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

/**
 * ProgressPercentage component shows the current loading percentage
 */
const ProgressPercentage: React.FC<ProgressProps> = ({ progress }) => (
  <motion.div 
    {...fadeInVariants.right}
    className="absolute top-8 right-8 text-2xl"
  >
    <motion.span
      key={Math.round(progress)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="font-bold tracking-wider text-red-200 drop-shadow-[0_0_12px_rgba(254,202,202,0.9)]"
    >
      {Math.round(progress)}%
    </motion.span>
  </motion.div>
);

/**
 * LandingLoader is the main component that orchestrates the loading sequence
 * and transition to the hero section. It manages:
 * 1. Typewriter text animation
 * 2. Progress bar animation
 * 3. Transition to hero section
 */
const LandingLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const isHomePageRef = useRef(true);
  const hasCompletedLoaderRef = useRef(false);
  const shouldShowTransitionRef = useRef(false);

  useEffect(() => {
    isHomePageRef.current = window.location.pathname === '/';
  }, []);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const hasSeenLanding = sessionStorage.getItem('hasSeenLanding');
    if (hasSeenLanding || !isHomePageRef.current) {
      setShowLoader(false);
      setShowTransition(false);
      hasCompletedLoaderRef.current = false;
      shouldShowTransitionRef.current = false;
    } else {
      sessionStorage.setItem('hasSeenLanding', 'true');
      shouldShowTransitionRef.current = true;
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('hasSeenLanding');
      hasCompletedLoaderRef.current = false;
      shouldShowTransitionRef.current = false;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showLoader]);

  useEffect(() => {
    if (!showLoader || !isHomePageRef.current) return;
    
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
  }, [showLoader]);

  useEffect(() => {
    if (!showLoader || isTransitioningRef.current || !isHomePageRef.current) return;
    
    const startTime = Date.now();
    
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < ANIMATION_CONFIG.DURATION) {
        const percent = (elapsed / ANIMATION_CONFIG.DURATION) * 100;
        setProgress(percent);
        requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          if (!isTransitioningRef.current && isHomePageRef.current && shouldShowTransitionRef.current) {
            hasCompletedLoaderRef.current = true;
            isTransitioningRef.current = true;
            setShowTransition(true);
            setShowLoader(false);
          }
        }, ANIMATION_CONFIG.LOADING_COMPLETE_PAUSE);
      }
    };

    requestAnimationFrame(animateProgress);
  }, [showLoader]);

  const handleTransitionComplete = () => {
    setShowTransition(false);
    isTransitioningRef.current = false;
  };

  if (!isHomePageRef.current) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div 
            className="fixed inset-0 bg-black flex flex-col justify-center items-center min-h-screen w-full z-[70]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <LoadingText text={displayText} />
            <ProgressPercentage progress={progress} />
            <div className="flex items-center justify-center mb-24">
              <Logo />
            </div>
            <ProgressBar progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>
      {shouldShowTransitionRef.current && hasCompletedLoaderRef.current && (
        <LandingTransition 
          isVisible={showTransition} 
          onTransitionComplete={handleTransitionComplete} 
        />
      )}
    </>
  );
};

export default LandingLoader; 