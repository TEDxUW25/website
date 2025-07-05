"use client";
import React from "react";
import { Speaker, SPEAKERS } from "@/data/speakers";
import Article from "@/app/speakers/article";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FeaturedSpeakerCardProps {
  speaker: Speaker;
}

const FeaturedSpeakerCard: React.FC<FeaturedSpeakerCardProps> = ({
  speaker,
}) => {
  const handleClick = () => {
    window.open('https://www.google.com', '_blank');
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      {/* Image card with hover zoom effect */}
      <motion.div 
        className="w-full aspect-[3/4] rounded-none overflow-hidden shadow-xl group cursor-pointer relative" 
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {speaker.imageUrl ? (
          <img
            src={speaker.imageUrl}
            alt={speaker.name}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none"%3E%3Crect width="600" height="400" fill="%23e11d48"%3E%3C/rect%3E%3Ctext x="300" y="200" font-family="sans-serif" font-size="40" text-anchor="middle" dominant-baseline="middle" fill="white"%3E' +
                speaker.name.charAt(0) +
                "%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="w-full h-full bg-red-600 flex items-center justify-center">
            <span className="text-6xl font-bold text-white opacity-50">
              {speaker.name.charAt(0) || "?"}
            </span>
          </div>
        )}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </motion.div>
      {/* Text below card */}
      <motion.div 
        className="p-3 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}>
        <motion.h3 
          className="text-xl sm:text-2xl font-bold mb-1 uppercase text-black"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {speaker.name}
        </motion.h3>
        <motion.p 
          className="text-xs sm:text-sm leading-relaxed line-clamp-3 text-black"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {speaker.bio
            ? speaker.bio.substring(0, 100) +
              (speaker.bio.length > 100 ? "..." : "")
            : "An inspiring voice sharing groundbreaking ideas."}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

interface RegularSpeakerCardProps {
  speaker: Speaker;
}

const RegularSpeakerCard: React.FC<RegularSpeakerCardProps> = ({ speaker }) => {
  const handleClick = () => {
    window.open('https://www.google.com', '_blank');
  };
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <motion.div 
      ref={ref}
      className="relative w-full aspect-[3/5] sm:aspect-[2/3] flex rounded-none overflow-hidden shadow-lg group cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Red left side - moves slightly left on hover with enhanced transition */}
      <motion.div 
        className="w-1/2 bg-red-600 flex flex-col justify-between p-5 z-10"
        initial={{ x: 0 }}
        whileHover={{ x: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Top: Person Name */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
            {speaker.name.split(" ")[0]}
            <br />
            {speaker.name.split(" ").slice(1).join(" ")}
          </h3>
        </div>

        {/* Middle: Circular initial with pulse effect */}
        <div className="self-center">
          <motion.div 
            className="w-14 h-14 rounded-full bg-zinc-600/60 flex items-center justify-center shadow-md relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full bg-white/20"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            />
            <motion.span 
              className="text-xl font-bold text-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {speaker.name.charAt(0) || "M"}
            </motion.span>
          </motion.div>
        </div>

        {/* Bottom: Title of Talk */}
        <div>
          <h4 className="text-2xl font-bold text-white">
            {speaker.talkTitle || "Title of Talk"}
          </h4>
          <motion.p 
            className="text-xs text-white mt-1 flex items-center"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            click to open bio <motion.span 
                               className="ml-1"
                               animate={{ x: [0, 5, 0] }}
                               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                             >→</motion.span>
          </motion.p>
        </div>
      </motion.div>

      {/* Right side - gray image with optimized loading */}
      <motion.div 
        className="absolute top-0 right-0 bottom-0 w-1/2 bg-zinc-300 overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[51%]"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        {speaker.imageUrl ? (
          <motion.img
            src={speaker.imageUrl}
            alt={speaker.name}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none"%3E%3Crect width="600" height="400" fill="%23cccccc"%3E%3C/rect%3E%3Ctext x="300" y="200" font-family="sans-serif" font-size="40" text-anchor="middle" dominant-baseline="middle" fill="%23666666"%3E' +
                speaker.name.charAt(0) +
                "%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-400 transition-transform duration-300 ease-in-out group-hover:scale-105">
            <div className="flex items-center justify-center h-full">
              <span className="text-4xl font-bold text-zinc-500">
                {speaker.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Decorative element */}
      <motion.div 
        className="absolute -bottom-2 -right-2 w-8 h-8 bg-black/70 rounded-full hidden sm:block"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      />
    </motion.div>
  );
};

export default function Speakers() {
  // Create refs for animation triggers
  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [regularRef, regularInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  let topSpeakers = SPEAKERS.filter((s) => s.featured).slice(0, 3);

  if (topSpeakers.length < 3) {
    const nonFeatured = SPEAKERS.filter(
      (s) => !topSpeakers.find((ts) => ts.id === s.id)
    );
    const needed = 3 - topSpeakers.length;
    topSpeakers = [...topSpeakers, ...nonFeatured.slice(0, needed)];
  }

  if (SPEAKERS.length === 0) {
    topSpeakers = Array(3)
      .fill(null)
      .map((_, i) => ({
        id: i - 100,
        name: "PERSON NAME",
        bio: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
        imageUrl: "/speaker-placeholder.png",
        role: "SPEAKER ROLE",
        talkTitle: "A TALK TO INSPIRE CHANGE",
      }));
  } else {
    while (topSpeakers.length < 3 && SPEAKERS.length > 0) {
      topSpeakers.push(SPEAKERS[topSpeakers.length % SPEAKERS.length]);
    }
  }

  const topSpeakerIds = new Set(topSpeakers.map((s) => s.id));
  let gridSpeakers = SPEAKERS.filter((s) => !topSpeakerIds.has(s.id));

  if (gridSpeakers.length === 0 && SPEAKERS.length > 0) {
    gridSpeakers = SPEAKERS;
  }

  if (SPEAKERS.length === 0) {
    gridSpeakers = Array(9)
      .fill(null)
      .map((_, i) => ({
        id: i - 200,
        name: "PERSON NAME",
        bio: "Bio coming soon.",
        imageUrl: "/speaker-placeholder.png",
        role: "SPEAKER ROLE",
        talkTitle: "TITLE OF TALK",
      }));
  }

  return (
    <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">
      <motion.section 
        className="bg-black text-white pt-10 pb-8 md:pt-12 md:pb-12 lg:pb-16 overflow-visible relative mt-20"
        ref={titleRef}
      >
        <div className="container mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7 }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tighter leading-none"
                initial={{ y: 20, opacity: 0 }}
                animate={titleInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Our Speakers
              </motion.h1>
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tighter -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-6 leading-none"
                initial={{ y: 20, opacity: 0 }}
                animate={titleInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Line Up
              </motion.h2>
            </motion.div>

            <motion.div 
              className="text-right hidden md:block"
              initial={{ opacity: 0, x: 30 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div className="flex flex-col items-end">
                <p className="text-sm mb-2 text-zinc-300 max-w-xs text-right">
                  Our incredibly talented, knowledgeable rosters of speakers who
                  in love with innovating and spreads ideas worth spreading
                </p>
                <div className="relative">
                  <motion.h3 
                    className="text-4xl md:text-6xl lg:text-8xl italic tracking-wide text-white relative mb-[-2.5rem] md:mb-[-5rem] lg:mb-[-7rem] z-10 transform translate-y-0 md:translate-y-0 lg:translate-y-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    speakers
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="pt-12 pb-8 md:pt-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl xl:max-w-7xl mt-8 md:mt-10 lg:mt-12">
          <motion.div 
            ref={featuredRef}
            initial={{ opacity: 0, y: 30 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
              {topSpeakers.map((speaker, index) => (
                <div
                  key={
                    speaker.id
                      ? `featured-${speaker.id}`
                      : `featured-placeholder-${index}`
                  }
                  className="flex flex-col"
                >
                  <h4 className="text-black font-bold text-xl mb-2 uppercase text-center">
                    PERSON NAME
                  </h4>
                  <FeaturedSpeakerCard speaker={speaker} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <motion.div 
          className="container mx-auto max-w-6xl xl:max-w-7xl"
          ref={regularRef}
          initial={{ opacity: 0, y: 40 }}
          animate={regularInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Force display exactly 6 speakers in 2 rows with 3 per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-8">
            {/* First row - 3 speakers */}
            {SPEAKERS.slice(0, 3).map((speaker, index) => (
              <div
                key={`regular-${speaker.id || index}`}
                className="flex flex-col"
              >
                <RegularSpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {/* Second row - 3 speakers */}
            {SPEAKERS.slice(3, 6).map((speaker, index) => (
              <div
                key={`regular-${speaker.id || index + 3}`}
                className="flex flex-col"
              >
                <RegularSpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      <Article />
    </div>
  );
}
