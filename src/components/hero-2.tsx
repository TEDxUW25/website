'use client'
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import Tile from "./Tile";

export default function Hero2() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverTrail, setHoverTrail] = useState([]);
  const cols = 20;
  const rows = 12;
  const totalTiles = cols * rows;
  
  // Use a single image for the entire grid
  // Replace this with your actual image URL
  const imageUrl = "https://i.pinimg.com/736x/a6/ce/92/a6ce92109f19db3dbe63d9846ed20910.jpg";
  
  // Handle hover effect and create trail
  const handleTileHover = useCallback((index) => {
    setHoveredIndex(index);
    // Create a trail of tiles that will be affected
    const trail = [];
    const maxTrailRadius = 6; // How far the effect reaches
    
    // Get coordinates of the hovered tile
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    // Create a ripple effect in all directions
    for (let r = -maxTrailRadius; r <= maxTrailRadius; r++) {
      for (let c = -maxTrailRadius; c <= maxTrailRadius; c++) {
        // Skip the center tile (the one being hovered)
        if (r === 0 && c === 0) continue;
        
        const newRow = row + r;
        const newCol = col + c;
        
        // Make sure we're in bounds
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          const newIndex = newRow * cols + newCol;
          
          // Calculate distance for delay (using Manhattan distance for an interesting pattern)
          const distance = Math.abs(r) + Math.abs(c);
          
          trail.push({
            index: newIndex,
            // Tiles further away get more delay
            delay: distance * 0.04
          });
        }
      }
    }
    
    // Sort by delay so closest tiles activate first
    trail.sort((a, b) => a.delay - b.delay);
    
    setHoverTrail(trail);
  }, [cols, rows]);
  
  // Effect to animate trail
  useEffect(() => {
    if (hoverTrail.length > 0) {
      const timers = hoverTrail.map(({ index, delay }) => {
        return setTimeout(() => {
          const element = document.querySelector(`[data-index="${index}"]`);
          if (element) {
            element.classList.add('active');
            
            // Keep the image visible for a while
            setTimeout(() => {
              element.classList.remove('active');
            }, 800); // Longer duration for a nice effect
          }
        }, delay * 1000);
      });
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [hoverTrail]);

  return (
    <main className="w-full relative">
      {/* Grid background */}
      <section className="w-full grid grid-cols-20 h-screen overflow-y-clip">
        {Array.from(Array(totalTiles), (_, i) => (
          <div key={i} data-index={i} className={`tile-wrapper ${hoveredIndex === i ? 'hovered' : ''}`}>
            <Tile 
              index={i} 
              onHover={handleTileHover} 
              cols={cols} 
              rows={rows}
              imageUrl={imageUrl}
            />
          </div>
        ))}
      </section>
      
      <style jsx global>{`
        .tile-wrapper.active .motion-div,
        .tile-wrapper.hovered .motion-div {
          opacity: 1 !important;
          transition: all 0.4s ease-out;
        }
        
        /* Optional: Add a subtle zoom effect */
        .tile-wrapper .motion-div {
          transform: scale(1.1);
        }
        
        .tile-wrapper.active .motion-div,
        .tile-wrapper.hovered .motion-div {
          transform: scale(1);
        }
      `}</style>
      
      <div className="pointer-events-none absolute inset-0 flex flex-col gap-5 items-center justify-center z-10 mb-10 font-poppins">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-9xl text-neutral-100 font-black uppercase tracking-tight"
        >
          hello
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-white w-1/2 text-xl text-center tracking-wide"
        >
          Join my growing community of creative developers
        </motion.p>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-neutral-100 rounded-full text-3xl bg-indigo-700 px-10 py-3 border border-indigo-900 pointer-events-auto"
        >
          Subscribe
        </motion.button>
      </div>
    </main>
  );
}