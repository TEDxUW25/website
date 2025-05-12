"use client";
import Year from "@/components/year";

export default function Timeline() {
  return (
    <div className="grid grid-cols-5 h-[200px] text-center w-full">
        <Year image="timeline_bg/timeline1.svg" yr="2018"/>
        <Year image="timeline_bg/timeline2.svg" yr="2020"/>
        <Year image="timeline_bg/timeline3.svg" yr="2023"/>
        <Year image="timeline_bg/timeline3.svg" yr="2024"/>
        <Year image="timeline_bg/timeline3.svg" yr="2025"/>
    </div>
  );
}
