
import { motion } from "framer-motion"

export default function Tile () {
  return (
    <motion.div
      whileHover={{
        zIndex: 1,
        backgroundColor: "#7c3aed",
      }}
      transition={{
        duration: 5,
        ease: "easeOut",
      }}
      className="aspect-square bg-neutral-950 border-neutral-900"
    />
  )
}

