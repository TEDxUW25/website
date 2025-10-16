"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import CounterRow from "@/components/counter_row";

const ImpactPage: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <main ref={ref} className="bg-black py-20 px-4">
      {/* <h2 className="text-white text-3xl font-semibold text-center mb-12">
        Our <span className="underline decoration-[#E50609]">Achievement</span>{" "}
        in 2024
      </h2> */}

      <CounterRow
        stats={[
          { target: 200, suffix: "+", label: "Volunteers" },
          { target: 50000, prefix: "$", suffix: "+", label: "Funds raised" },
          { target: 7, label: "Events hosted" },
        ]}
        trigger={isInView}
      />

      <div className="my-12 w-full max-w-none px-8 sm:px-16">
        <motion.div
          initial={{ scale: 0.01, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-between text-[#E50609] text-[14vw] md:text-[16vw] font-extrabold leading-none tracking-tight select-none uppercase"
        >
          <span>I</span>
          <span>M</span>
          <span>P</span>
          <span>A</span>
          <span>C</span>
          <span>T</span>
        </motion.div>
      </div>

      <CounterRow
        stats={[
          { target: 500, suffix: "K+", label: "Volunteers joined" },
          { target: 2500, label: "Attendees engaged" },
          { target: 42, label: "Speakers featured" },
        ]}
        trigger={isInView}
      />
    </main>
  );
};

export default ImpactPage;
