"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TeamBioProps {
  imageSrc: string;
  title: string;
  text: string;
  reverse?: boolean;
}

const TeamBio: React.FC<TeamBioProps> = ({
  imageSrc,
  title,
  text,
  reverse = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 md:gap-16 mb-16`}
    >
      <div
        className={`flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } items-center gap-8 md:gap-16 mb-16`}
      >
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={imageSrc}
            alt={title}
            width={600}
            height={400}
            className="w-full h-auto rounded-md object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <p className="text-base leading-relaxed text-white/90">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamBio;
