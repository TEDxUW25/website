"use client";
import React from "react";
import Image from "next/image";
// import TeamBio from "@/components/team_bio";
import { motion } from "framer-motion";
import TeamSection from "@/components/team-section";

const MeetTheTeamPage: React.FC = () => {
  return (
    <main className="bg-black mt-40 text-white px-6 md:px-16 py-16">
      <section className="flex flex-col md:flex-row items-center md:items-start gap-12 max-w-7xl mx-auto">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
          <p className="text-lg leading-relaxed mb-6">
            We’re a team of passionate, driven individuals united by a shared
            mission: to spark innovation, amplify ideas, and create meaningful
            experiences. With diverse talents and a commitment to excellence, we
            bring TEDxUW to life — one spark at a time.
          </p>
        </motion.div>

        {/* Right Image + Handwriting (Responsive & Proportional) */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative w-full mt-0 md:-mt-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Image
                src="/Picture1.png"
                alt="TEDx Team"
                width={1200}
                height={700}
                className="w-full h-auto object-cover rounded-md"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* <section className="mt-20 max-w-7xl mx-auto">
        <TeamBio
          imageSrc="/team1.avif"
          title="Curation Team"
          text="These are the people that choose who speaks and what gets shared."
        />

        <TeamBio
          imageSrc="/team2.jpg"
          title="Logistics Team"
          text="Making sure everything happens on time and in the right place."
          reverse
        />

        <TeamBio
          imageSrc="/team3.avif"
          title="Design Team"
          text="Designing all the posters, banners, screens, slides and visual vibes."
        />
      </section> */}
      <TeamSection />
    </main>
  );
};

export default MeetTheTeamPage;
