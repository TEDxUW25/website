/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect, useRef } from 'react';

export default function HeroHome() {
  const [mouseTrail, setMouseTrail] = useState([]);
  const containerRef = useRef(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const frameCountRef = useRef(0);

  // Create images to use in the trail
  const trailImages = [
    "https://tedxuw2024.netlify.app/static/media/carosel1.90be98a99271b350bb32.jpg", 
    "https://tedxuw2024.netlify.app/static/media/Carousel2.7c691d976686c515fa33.jpg", 
    "https://tedxuw2024.netlify.app/static/media/Carousel3.d76dfce7b0f2009fc0ca.jpg",
    "https://tedxuw2024.netlify.app/static/media/Carousel6.f768dd9cd7989f1b67ad.jpg",
    "https://tedxuw2024.netlify.app/static/media/Carousel5.aa7359cbf0cadba4e811.jpg",
    "https://tedxuw2024.netlify.app/static/media/Carousel4.a7c599fd804b24c406b4.jpg",
  ];

  useEffect(() => {
    const container = containerRef.current;
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only add a new point every few frames to avoid overwhelming the DOM
      frameCountRef.current += 1;
      if (frameCountRef.current % 4 === 0) {
        // Calculate distance from last position
        const dx = x - lastPositionRef.current.x;
        const dy = y - lastPositionRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only add a new point if mouse has moved significantly
        if (distance > 20) {
          setMouseTrail(prev => [
            ...prev, 
            {
              id: Date.now(),
              x,
              y,
              image: trailImages[Math.floor(Math.random() * trailImages.length)]
            }
          ]);
          
          lastPositionRef.current = { x, y };
        }
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Remove trail items after animation
  useEffect(() => {
    if (mouseTrail.length > 0) {
      const timeout = setTimeout(() => {
        setMouseTrail(prev => prev.slice(1));
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [mouseTrail]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
      style={{ touchAction: 'none' }}
    >
      {/* Trail elements */}
      {mouseTrail.map(point => (
        <div
          key={point.id}
          className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 opacity-100 transition-all duration-1500 animate-pulse"
          style={{ 
            left: `${point.x}px`, 
            top: `${point.y}px`,
            animationDuration: '3s',
            opacity: 1,
            animation: 'fadeOut 3s forwards',
          }}
        >
          <img 
            src={point.image} 
            alt="Trail" 
            className="w-50"
          />
        </div>
      ))}
      
      {/* Center text */}
      <div className='absolute inset-0 flex flex-rows items-center justify-center pointer-events-none'>
        <div className=" flex flex-rows">
            <img src="ted.svg"alt="logo" />
            <h1 className="text-6xl md:text-8xl text-white ">  <p>UW</p>
            </h1>
        </div>
      </div>

    {/* Bottom Heading */}
    <div className="absolute bottom-16 left-0 right-0 text-center">
    <h3 className=" md:text-xl font-bold text-white tracking-wide px-4">
        Ideas Change Everything.
    </h3>
    <h1>Ideas that inspire change, made possible by the TEDxUW team.</h1>
    </div>

    </div>
  );
};
