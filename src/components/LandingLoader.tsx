'use client';

import React, { useEffect, useRef, useState } from 'react';
import HeroHome from "@/components/hero";

const DURATION = 3200; // total duration for progress bar (slower)
const BLACKHOLE_DURATION = 1800; // ms
const PAUSE_AT_100 = 1500; // ms pause at 100% before blackhole

const glitchColors = [
  { className: 'glitch-red', style: { color: '#ff2b06' } },
  { className: 'glitch-cyan', style: { color: '#00eaff' } },
  { className: 'glitch-white', style: { color: '#fff' } },
];

const LandingLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [blackhole, setBlackhole] = useState(false);
  const [glitchState, setGlitchState] = useState({
    x: 0,
    y: 0,
    opacity: 1,
    active: true,
    slice: 0,
    scale: 1,
  });
  const requestRef = useRef<number | null>(null);
  const glitchRef = useRef<NodeJS.Timeout | null>(null);

  // Progress bar: slow to 65%, then accelerate to 100%
  useEffect(() => {
    let start: number | null = null;
    function animateProgress(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const slowPart = 0.65; // up to 65%
      const slowDuration = DURATION * slowPart;
      let percent;
      if (elapsed < slowDuration) {
        percent = (elapsed / slowDuration) * 65;
      } else if (elapsed < DURATION) {
        // Accelerate from 65% to 100%
        const fastElapsed = elapsed - slowDuration;
        const fastDuration = DURATION - slowDuration;
        // Ease-in for acceleration
        const t = Math.min(1, fastElapsed / fastDuration);
        percent = 65 + 35 * (t * t); // quadratic ease-in
      } else {
        percent = 100;
      }
      setProgress(percent);
      if (percent < 100) {
        requestRef.current = requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => setBlackhole(true), PAUSE_AT_100); // pause at 100% before blackhole
        setTimeout(() => setShowLoader(false), BLACKHOLE_DURATION + PAUSE_AT_100);
      }
    }
    requestRef.current = requestAnimationFrame(animateProgress);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Glitch effect state with dramatic scale changes, slower interval
  useEffect(() => {
    if (!showLoader) return;
    glitchRef.current = setInterval(() => {
      const scaleOptions = [0.92, 0.98, 1, 1.04, 1.12, 0.88, 1.18];
      const scale = scaleOptions[Math.floor(Math.random() * scaleOptions.length)];
      setGlitchState({
        x: Math.random() * 8 - 4,
        y: Math.random() * 4 - 2,
        opacity: 0.7 + Math.random() * 0.3,
        active: Math.random() > 0.15,
        slice: Math.floor(Math.random() * 3),
        scale,
      });
    }, 120 + Math.random() * 80); // slower glitch
    return () => {
      if (glitchRef.current) clearInterval(glitchRef.current);
    };
  }, [showLoader]);

  if (!showLoader) return <HeroHome />;

  // Glitch layers for TEDxUW
  const logo = (
    <span className="flex items-end relative select-none">
      <span className="text-red-600 text-8xl md:text-9xl font-extrabold leading-none" style={{letterSpacing: '-0.05em'}}>TED</span>
      <span className="text-red-600 text-8xl md:text-9xl font-extrabold leading-none" style={{marginRight: '0.1em', marginLeft: '0.18em'}}>x</span>
      <span className="text-white text-8xl md:text-9xl font-light leading-none ml-2">UW</span>
    </span>
  );

  return (
    <div className={`fixed inset-0 bg-black flex flex-col justify-center items-center min-h-screen w-full z-50 transition-all duration-700 ${blackhole ? 'blackhole-anim' : ''}`}>
      {/* Centered Logo with glitch effect and dramatic scale changes */}
      <div className="flex items-center justify-center mb-24 relative" style={{height: '120px'}}>
        {/* Glitch layers */}
        {glitchColors.map((color, i) => (
          <span
            key={color.className}
            className={`absolute top-0 left-1/2 -translate-x-1/2 glitch-logo ${color.className}`}
            style={{
              opacity: glitchState.active && glitchState.slice === i ? glitchState.opacity * 0.7 : 0.18,
              transform: `translate(${glitchState.active && glitchState.slice === i ? glitchState.x : 0}px, ${glitchState.active && glitchState.slice === i ? glitchState.y : 0}px) scale(${glitchState.scale})`,
              filter: i === 2 ? 'blur(0.5px)' : 'none',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            {logo}
          </span>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="absolute bottom-8 left-0 w-full px-8">
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Blackhole, glitch, and TeX percent styles */}
      <style jsx>{`
        .blackhole-anim {
          animation: blackhole-suck ${BLACKHOLE_DURATION}ms cubic-bezier(0.77,0,0.175,1) forwards;
        }
        @keyframes blackhole-suck {
          0% {
            opacity: 1;
            filter: none;
            transform: scale(1) rotate(0deg);
          }
          40% {
            opacity: 1;
            filter: blur(2px);
            transform: scale(0.85) rotate(-10deg);
          }
          70% {
            opacity: 0.8;
            filter: blur(8px);
            transform: scale(0.45) rotate(-180deg);
          }
          85% {
            opacity: 0.5;
            filter: blur(16px);
            transform: scale(0.18) rotate(-400deg);
          }
          100% {
            opacity: 0;
            filter: blur(32px);
            transform: scale(0) rotate(-720deg);
          }
        }
        .glitch-logo {
          text-shadow:
            2px 0 2px #ff2b06,
            -2px 0 2px #00eaff,
            0 2px 2px #fff;
          mix-blend-mode: lighten;
          transition: opacity 0.1s;
        }
        .glitch-red { z-index: 2; }
        .glitch-cyan { z-index: 3; }
        .glitch-white { z-index: 1; }
      `}</style>
      {/*
        To use a video as a background, simply add a <video> tag with absolute positioning and z-index below the content, e.g.:
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/your-video.mp4" type="video/mp4" />
        </video>
        Place this before the rest of the loader content.
      */}
    </div>
  );
};

export default LandingLoader; 