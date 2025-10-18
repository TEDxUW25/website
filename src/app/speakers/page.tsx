"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X } from "lucide-react";

// Mock speaker data
const SPEAKERS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    bio: "Award-winning technologist and AI researcher with over 15 years of experience in machine learning and neural networks. Sarah has pioneered breakthrough innovations in natural language processing and leads a team of researchers pushing the boundaries of what's possible in artificial intelligence.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    role: "AI Research Director",
    talkTitle: "THE FUTURE OF INTELLIGENT SYSTEMS",
  },
  {
    id: 2,
    name: "Marcus Chen",
    bio: "Visionary entrepreneur and sustainability advocate who has founded three successful green technology startups. Marcus combines business acumen with environmental passion to create solutions that address climate change while building profitable enterprises.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    role: "Green Tech Entrepreneur",
    talkTitle: "BUILDING A SUSTAINABLE TOMORROW",
  },
  {
    id: 3,
    name: "Dr. Amara Okafor",
    bio: "Renowned neuroscientist and author exploring the intersection of consciousness, technology, and human potential. Her groundbreaking research on brain-computer interfaces has opened new possibilities for treating neurological conditions and enhancing human capabilities.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
    role: "Neuroscientist & Author",
    talkTitle: "UNLOCKING THE MIND'S POTENTIAL",
  },
  {
    id: 4,
    name: "James Rodriguez",
    bio: "Creative director and digital artist pushing the boundaries of immersive experiences. James has worked with major brands and cultural institutions to create award-winning installations that blend art, technology, and storytelling in unprecedented ways.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
    role: "Creative Technologist",
    talkTitle: "ART IN THE DIGITAL AGE",
  },
  {
    id: 5,
    name: "Elena Volkov",
    bio: "Social innovator and community builder dedicated to creating equitable access to education and opportunity. Elena's initiatives have empowered thousands of underserved communities through technology-enabled learning programs and mentorship networks.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop",
    role: "Education Innovator",
    talkTitle: "DEMOCRATIZING KNOWLEDGE",
  },
  {
    id: 6,
    name: "David Park",
    bio: "Pioneering space entrepreneur and aerospace engineer working to make humanity a multi-planetary species. David's work on next-generation propulsion systems and sustainable space habitats is laying the groundwork for the next era of space exploration.",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
    role: "Space Technology Pioneer",
    talkTitle: "HUMANITY'S COSMIC JOURNEY",
  },
];

interface Speaker {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  role: string;
  talkTitle: string;
}

interface BookSpeakerCardProps {
  speaker: Speaker;
}

const BookSpeakerCard: React.FC<BookSpeakerCardProps> = ({ speaker }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <motion.div
        ref={ref}
        className="relative w-full aspect-[3/5] sm:aspect-[2/3] perspective-1000"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ perspective: "2000px" }}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer preserve-3d"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Book Cover - Red Left Side */}
          <motion.div
            className="absolute inset-0 w-1/2 bg-red-600 flex flex-col justify-between p-5 z-10 shadow-2xl rounded-l-lg"
            style={{
              transformOrigin: "right center",
            }}
          >
            {/* Top: Person Name */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
                {speaker.name.split(" ")[0]}
                <br />
                {speaker.name.split(" ").slice(1).join(" ")}
              </h3>
            </div>

            {/* Bottom: Title of Talk */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {speaker.talkTitle}
              </h4>
              <p className="text-xs text-white mt-2 flex items-center opacity-80">
                click to open
                <motion.span
                  className="ml-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </p>
            </div>
          </motion.div>

          {/* Book Page - Right Side with Image */}
          <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-zinc-200 overflow-hidden shadow-xl rounded-r-lg">
            {speaker.imageUrl ? (
              <img
                src={speaker.imageUrl}
                alt={speaker.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-400 flex items-center justify-center">
                <span className="text-4xl font-bold text-zinc-500">
                  {speaker.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Book Spine Shadow */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-black/20 z-20" />
        </motion.div>
      </motion.div>

      {/* Book Opening Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative max-w-6xl w-full h-[80vh] max-h-[800px]"
              style={{ perspective: "2500px" }}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-full h-full flex">
                {/* Left Page - Red with Info */}
                <motion.div
                  className="w-1/2 h-full bg-red-600 p-8 sm:p-12 flex flex-col justify-between shadow-2xl rounded-l-2xl relative overflow-y-auto"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 0 }}
                  style={{
                    transformOrigin: "right center",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div>
                    <motion.h2
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {speaker.name.split(" ")[0]}
                      <br />
                      {speaker.name.split(" ").slice(1).join(" ")}
                    </motion.h2>

                    <motion.p
                      className="text-white/90 text-sm sm:text-base font-medium mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {speaker.role}
                    </motion.p>

                    <motion.div
                      className="w-16 h-1 bg-white/60 mb-6"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    />

                    <motion.p
                      className="text-white text-sm sm:text-base leading-relaxed mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {speaker.bio}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {speaker.talkTitle}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm italic">
                      Ideas worth spreading
                    </p>
                  </motion.div>

                  {/* Decorative circle */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-white/10"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  />
                </motion.div>

                {/* Right Page - Image */}
                <motion.div
                  className="w-1/2 h-full bg-zinc-900 shadow-2xl rounded-r-2xl overflow-hidden relative"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 0 }}
                  style={{
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {speaker.imageUrl ? (
                    <motion.img
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                      <span className="text-8xl font-bold text-white/20">
                        {speaker.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>

                {/* Center spine */}
                <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-black/40 transform -translate-x-1/2 z-10 rounded-full" />

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-300 z-20"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function Speakers() {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [regularRef, regularInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <motion.section
        className="bg-black text-white pt-10 pb-8 md:pt-12 md:pb-12 lg:pb-16 overflow-visible relative mt-20"
        ref={titleRef}
      >
        <div className="container mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={
                titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.7 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tighter leading-none"
                initial={{ y: 20, opacity: 0 }}
                animate={
                  titleInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Our Speakers
              </motion.h1>
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tighter -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-6 leading-none"
                initial={{ y: 20, opacity: 0 }}
                animate={
                  titleInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Line Up
              </motion.h2>
            </motion.div>

            <motion.div
              className="text-right hidden md:block"
              initial={{ opacity: 0, x: 30 }}
              animate={
                titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
              }
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div className="flex flex-col items-end">
                <p className="text-sm mb-2 text-zinc-300 max-w-xs text-right">
                  Our incredibly talented, knowledgeable rosters of speakers who
                  in love with innovating and spreads{" "}
                  <b>IDEAS WORTH SPREADING</b>
                </p>
                <div className="relative">
                  <motion.h3
                    className="text-4xl md:text-6xl lg:text-8xl italic tracking-wide text-white relative mb-[-2.5rem] md:mb-[-5rem] lg:mb-[-7rem] z-10 transform translate-y-0 md:translate-y-0 lg:translate-y-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    speakers
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <motion.div
          className="container mx-auto max-w-6xl xl:max-w-7xl"
          ref={regularRef}
          initial={{ opacity: 0, y: 40 }}
          animate={regularInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-8">
            {SPEAKERS.slice(0, 3).map((speaker, index) => (
              <div
                key={`speaker-${speaker.id || index}`}
                className="flex flex-col"
              >
                <BookSpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {SPEAKERS.slice(3, 6).map((speaker, index) => (
              <div
                key={`speaker-${speaker.id || index + 3}`}
                className="flex flex-col"
              >
                <BookSpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
