'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './hero-2';

// Component props and animation configuration
type LandingTransitionProps = {
  isVisible: boolean;
  onTransitionComplete: () => void;
};

const ANIMATION_CONFIG = {
  EXIT_DURATION: 0.8,
  EXIT_EASE: [0.16, 1, 0.3, 1] as const,
  TRANSITION_PAUSE: 400,
} as const;

// Defines the clip-path animation for the overlay transition
const overlayVariants = {
  initial: { clipPath: 'inset(0 0 100% 0)' },
  animate: { clipPath: 'inset(0)' },
  exit: { clipPath: 'inset(0 0 calc(100% - 80px) 0)' }
} as const;

// Handles the transition animation between loading screen and hero section
const LandingTransition: React.FC<LandingTransitionProps> = ({ isVisible, onTransitionComplete }) => {
  const [phase, setPhase] = useState<'initial' | 'animate' | 'exit'>('initial');

  // Prevent scrolling during transition, enable after exit animation
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
  }, [isVisible]);

  // Resets or starts the animation sequence based on visibility
  useEffect(() => {
    if (!isVisible) {
      setPhase('initial');
    } else {
      setPhase('animate');
    }
  }, [isVisible]);

  // Manages the animation phase transitions
  const handleAnimationComplete = () => {
    if (phase === 'animate') {
      setTimeout(() => {
        setPhase('exit');
      }, ANIMATION_CONFIG.TRANSITION_PAUSE);
    } else if (phase === 'exit') {
      document.body.style.overflow = 'auto';
      onTransitionComplete();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <div className="fixed inset-0 z-50">
            <HeroSection />
          </div>
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a] z-[60] origin-bottom"
            variants={overlayVariants}
            initial="initial"
            animate={phase}
            transition={{
              duration: ANIMATION_CONFIG.EXIT_DURATION,
              ease: ANIMATION_CONFIG.EXIT_EASE
            }}
            onAnimationComplete={handleAnimationComplete}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default LandingTransition; 