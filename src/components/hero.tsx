'use client'
import React, { useState, useEffect, useRef } from 'react';

type MouseTrailPoint = {
    id: number;
    x: number;
    y: number;
    image: string;
    isActive: boolean; // Track if the trail point is active or fading
};

// reminder to replace w actual image and not link
const trailImages = [
    "trailed/1.jpg", 
    "trailed/2.jpg", 
    "trailed/3.jpg", 
    "trailed/4.jpg", 
    "trailed/5.jpg", 
];

export default function HeroHome() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const frameCountRef = useRef<number>(0);
    const lastPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [mouseTrail, setMouseTrail] = useState<MouseTrailPoint[]>([]);
    const [isMobile, setIsMobile] = useState<boolean>(false);
  
    // Check for mobile viewport on component mount and window resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // Standard breakpoint for mobile
        };
        
        // Initial check
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
    
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
        
            // First, mark all existing trail points as fading
            setMouseTrail(prev => prev.map(point => ({
                ...point,
                isActive: false
            })));
            
            frameCountRef.current += 1;
            if (frameCountRef.current % 4 === 0) {
                const dx = x - lastPositionRef.current.x;
                const dy = y - lastPositionRef.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
        
                if (distance > 20) {
                    // Add a new active trail point
                    setMouseTrail(prev => [
                        ...prev,
                        {
                            id: Date.now(),
                            x,
                            y,
                            image: trailImages[Math.floor(Math.random() * trailImages.length)],
                            isActive: true
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
  
    // Remove trail items that have completed their fade out animation
    useEffect(() => {
        const fadeOutTimeoutMS = 1500; // Duration for fade out animation
        
        if (mouseTrail.length > 0 && mouseTrail.some(point => !point.isActive)) {
            const timeout = setTimeout(() => {
                setMouseTrail(prev => prev.filter(point => point.isActive || Date.now() - point.id < fadeOutTimeoutMS));
            }, fadeOutTimeoutMS);
            
            return () => clearTimeout(timeout);
        }
    }, [mouseTrail]);

    return (
        <div 
            ref={containerRef}
            className="w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center cursor-none relative"
        >
            {/* Background video for mobile only */}
            {isMobile && (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
                >
                    <source src="/promo_vid.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )} 

            {/* Trail elements */}
            {mouseTrail.map(point => (
                <div
                    key={point.id}
                    className={`absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-10 ${point.isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                        left: `${point.x}px`, 
                        top: `${point.y}px`,
                        transition: point.isActive ? 'none' : 'opacity 1.5s ease-out',
                    }}
                >
                    <img 
                        src={point.image} 
                        alt="Trail" 
                        className="w-100 object-contain"
                    />
                </div>
            ))}

            <div className=" text-center font-semibold leading-none">
              <div className='text-3xl mb-4'> Ideas that inspire change, made possible by the TEDxUW team.</div>
              <div className="dotted text-9xl"> EVERYTHING REIMAGINED</div>
            </div>

                      
            <div className=" mt-8 flex flex-rows z-10">
                <img src="ted.svg" alt="" />
                <h1 className="text-6xl md:text-8xl font-bold text-white">
                    <span className="text-white">UW</span>
                </h1>
            </div>
          
            {/* Bottom Heading */}
            <div className="mt-4 z-10">
                <h1 className="text-2xl md:text-3xl font-light text-white text-center">
                    Ideas Change Everything.
                </h1>
                <p className="text-lg md:text-xl text-white text-center mt-2 opacity-80">
                    Ideas that inspire change, made possible by the TEDxUW team.
                </p>
            </div>
            
        </div>
    );
};