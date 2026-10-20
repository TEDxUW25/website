import { motion } from "framer-motion";

export default function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
      className="text-center px-6"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ff4a3d]">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold text-white">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#d41408]" />
    </motion.div>
  );
}
