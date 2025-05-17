import { motion } from "framer-motion"
import { useState } from "react"

const Tile = ({ index, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a random placeholder image (you can replace these with your actual images)
  const imageUrl = `https://i.pinimg.com/736x/0a/da/c7/0adac7d30d0d1ef759ada954b3fd4efe.jpg`;
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(index);
  };

  return (
    <motion.div
      whileHover={{
        zIndex: 1,
      }}
      onMouseEnter={handleMouseEnter}
      className="aspect-square bg-neutral-950 border-neutral-900 relative overflow-hidden"
    >
      {/* The image that will be revealed */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 1.2
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        onAnimationComplete={() => {
          if (!isHovered) setIsHovered(false);
        }}
      >
        <img 
          src={imageUrl} 
          alt={`Tile ${index}`}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  )
}

export default Tile