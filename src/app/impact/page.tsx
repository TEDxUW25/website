"use client";
import SectionHeader from "@/components/section-header";
import { useInView } from "framer-motion";
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

      <div className="my-14">
        <SectionHeader eyebrow="By the numbers" title="Our Impact" />
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
