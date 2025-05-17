'use client';

import React, { useEffect, useRef, useState } from 'react';
import HeroHome from "@/components/hero";

const DURATION = 7000; // total duration for progress bar (slower)
const TRANSITION_DURATION = 1200; // ms for the fade transition
const PAUSE_AT_100 = 2000; // ms pause at 100% before transition
const TYPEWRITER_DELAY = 100; // ms between each character

const glitchColors = [
  { className: 'glitch-red', style: { color: '#ff2b06' } },
  { className: 'glitch-cyan', style: { color: '#00eaff' } },
  { className: 'glitch-white', style: { color: '#fff' } },
];

const LandingLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [glitchState, setGlitchState] = useState({
    x: 0,
    y: 0,
    opacity: 1,
    active: true,
    slice: 0,
  });
  const requestRef = useRef<number | null>(null);
  const glitchRef = useRef<NodeJS.Timeout | null>(null);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect for loading text
  useEffect(() => {
    const text = "Loading your experience...";
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        typewriterRef.current = setTimeout(typeNextChar, TYPEWRITER_DELAY);
      } else {
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 500);
      }
    };

    typeNextChar();
    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, []);

  // Progress bar with smooth easing
  useEffect(() => {
    let start: number | null = null;
    let glowPhase = 0;
    
    function animateProgress(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const slowPart = 0.75;
      const slowDuration = DURATION * slowPart;
      
      // Calculate glow intensity using sine wave
      glowPhase = (elapsed / 1500) * Math.PI * 2;
      const glowIntensity = 0.8 + Math.sin(glowPhase) * 0.4;
      
      let percent;
      if (elapsed < slowDuration) {
        const t = elapsed / slowDuration;
        percent = 75 * (1 - Math.pow(1 - t, 3));
      } else if (elapsed < DURATION) {
        const fastElapsed = elapsed - slowDuration;
        const fastDuration = DURATION - slowDuration;
        const t = fastElapsed / fastDuration;
        percent = 75 + 25 * (1 - Math.pow(1 - t, 2));
      } else {
        percent = 100;
      }
      
      setProgress(percent);
      if (percent < 100) {
        requestRef.current = requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => setIsTransitioning(true), PAUSE_AT_100);
        setTimeout(() => setShowLoader(false), TRANSITION_DURATION + PAUSE_AT_100);
      }
    }
    requestRef.current = requestAnimationFrame(animateProgress);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Glitch effect with dynamic glow
  useEffect(() => {
    if (!showLoader || progress >= 100) return;
    glitchRef.current = setInterval(() => {
      setGlitchState({
        x: Math.random() * 12 - 6,
        y: Math.random() * 6 - 3,
        opacity: 0.8 + Math.random() * 0.2,
        active: Math.random() > 0.3,
        slice: Math.floor(Math.random() * 3),
      });
    }, 80 + Math.random() * 60);
    return () => {
      if (glitchRef.current) clearInterval(glitchRef.current);
    };
  }, [showLoader, progress]);

  if (!showLoader) return <HeroHome />;

  const logo = (
    <span className="flex items-end relative select-none">
      <span className="text-red-600 text-8xl md:text-9xl font-extrabold leading-none" style={{letterSpacing: '-0.05em'}}>TED</span>
      <span className="text-red-600 text-8xl md:text-9xl font-extrabold leading-none" style={{marginRight: '0.1em', marginLeft: '0.18em'}}>x</span>
      <span className="text-white text-8xl md:text-9xl font-light leading-none ml-2">UW</span>
    </span>
  );

  return (
    <div className={`fixed inset-0 bg-black flex flex-col justify-center items-center min-h-screen w-full z-50 transition-all duration-1000 ${isTransitioning ? 'fade-out' : ''}`}>
      {/* Loading text */}
      <div className="absolute top-8 left-8 text-white font-light text-lg">
        <span className="typewriter-text">{displayText}</span>
        {showCursor && <span className="animate-pulse">|</span>}
      </div>
      
      {/* Progress percentage */}
      <div className="absolute top-8 right-8 text-white font-light text-lg">
        {Math.round(progress)}%
      </div>

      <div className="flex items-center justify-center mb-24 relative" style={{height: '120px'}}>
        {glitchColors.map((color, i) => (
          <span
            key={color.className}
            className={`absolute top-0 left-1/2 -translate-x-1/2 glitch-logo ${color.className}`}
            style={{
              opacity: glitchState.active && glitchState.slice === i ? glitchState.opacity : 0.15,
              transform: `translate(${glitchState.active && glitchState.slice === i ? glitchState.x : 0}px, ${glitchState.active && glitchState.slice === i ? glitchState.y : 0}px)`,
              filter: i === 2 
                ? `blur(0.8px) drop-shadow(0 0 ${4 + Math.sin(Date.now() / 800) * 2}px ${color.style.color})`
                : `drop-shadow(0 0 ${2 + Math.sin(Date.now() / 800) * 1}px ${color.style.color})`,
              pointerEvents: 'none',
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out',
            }}
            aria-hidden="true"
          >
            {logo}
          </span>
        ))}
      </div>
      
      <div className="absolute bottom-8 left-0 w-full px-8">
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        .fade-out {
          animation: elegant-fade ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes elegant-fade {
          0% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
          20% {
            opacity: 0.95;
            filter: blur(1px);
            transform: scale(0.98);
          }
          60% {
            opacity: 0.4;
            filter: blur(4px);
            transform: scale(0.95);
          }
          100% {
            opacity: 0;
            filter: blur(8px);
            transform: scale(0.92);
          }
        }
        .glitch-logo {
          text-shadow: 2px 0 2px #ff2b06, -2px 0 2px #00eaff, 0 2px 2px #fff;
          mix-blend-mode: lighten;
          transition: opacity 0.1s, filter 0.1s;
        }
        .typewriter-text {
          font-family: inherit;
          letter-spacing: 0.05em;
        }
        .glitch-red { z-index: 2; }
        .glitch-cyan { z-index: 3; }
        .glitch-white { z-index: 1; }
      `}</style>
    </div>
  );
};

export default LandingLoader; 