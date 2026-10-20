"use client";

import { motion } from "framer-motion";
import { joinHref, JOIN_FORM_URL } from "@/lib/links";

const teams = [
  { name: "Internals", desc: "Keep the team connected, organized, and thriving." },
  { name: "Speaker Relations", desc: "Find and coach the voices on our 2026 stage." },
  { name: "Corporate Relations", desc: "Build the partnerships that make the event possible." },
  { name: "Marketing", desc: "Shape how TEDxUW looks, sounds, and spreads." },
  { name: "Logistics", desc: "Run the day, from venue to volunteers." },
  { name: "Production", desc: "Bring the stage, sound, and screens to life." },
  { name: "Software", desc: "Build the website, ticketing, and tools behind TEDxUW." },
  { name: "Finance", desc: "Plan the budget and keep the event on solid ground." },
];

export default function JoinSection() {
  const external = Boolean(JOIN_FORM_URL);
  return (
    <section id="join" className="bg-black text-white px-6 md:px-16 py-24 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-[#d41408] text-[#ff4a3d] px-4 py-1 text-sm font-semibold tracking-wide uppercase">
            Now recruiting &bull; 2026
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            TEDxUW is <span className="text-[#d41408]">back</span>.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            The club has started again, and we&apos;re putting together the team
            for our 2026 event. Join a team, or apply for a VP role. About 5 to 10 hours a week,
            and a real hand in bringing ideas worth spreading to Waterloo.
          </p>
          <a
            href={joinHref}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-10 inline-block rounded-2xl bg-gradient-to-b from-[#d41408] to-[#bd1104] px-8 py-4 text-lg font-semibold shadow-[0_6px_24px_rgb(189,17,4,0.35)] transition hover:scale-[1.04] active:scale-95"
          >
            Apply to join the team
          </a>
        </motion.div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="mt-2 text-gray-400">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
