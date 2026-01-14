"use client";
// import Countdown from "react-countdown";
import { useState } from "react";
import { motion } from "framer-motion";

const renderPaymentUI = (loading: boolean, handleBuyTicket: (type: 'event' | 'event_afterparty') => void) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3
        className="text-[clamp(1rem,2vw,2rem)] font-Inter text-[#d9d4c1] font-bold mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Choose your ticket type:
      </motion.h3>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
        {/* Event Only Ticket */}
        <motion.div
          className="bg-black border-2 border-white/30 rounded-xl p-4 sm:p-6 hover:border-red-600 transition-all duration-200 cursor-pointer flex-1 min-w-[280px] sm:min-w-[320px] md:min-w-[360px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => handleBuyTicket('event')}
        >
          <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">Event Only</h4>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-500 mb-3 text-center">$10</div>
          <ul className="text-white/80 text-xs sm:text-sm mb-4 space-y-0.5 text-left">
            <li>• Full access to all TEDx talks</li>
            <li>• Live performances and presentations</li>
            <li>• Complimentary lunch and snacks</li>
            <li>• Exclusive TEDxUW 2025 water bottle</li>
            <li>• Networking session with attendees</li>
          </ul>
          <button 
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-2 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Buy Event Ticket'}
          </button>
        </motion.div>

        {/* Event + After Party Ticket */}
        <motion.div
          className="bg-black border-2 border-red-600 rounded-xl p-4 sm:p-6 hover:border-red-500 transition-all duration-200 cursor-pointer flex-1 min-w-[280px] sm:min-w-[320px] md:min-w-[360px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => handleBuyTicket('event_afterparty')}
        >
          <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">Event + After Party</h4>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-500 mb-3 text-center">$25</div>
          <ul className="text-white/80 text-xs sm:text-sm mb-4 space-y-0.5 text-left">
            <li>• Everything included in Event Only +</li>
            <li>• Private networking with speakers</li>
            <li>• Exclusive after party at Huether Hotel</li>
            <li>• VIP access to private party</li>
            <li>• Premium food and drinks</li>
          </ul>
          <button 
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-2 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Buy Full Experience'}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};


// const renderer = ({
//   days,
//   hours,
//   minutes,
//   seconds,
//   completed,
//   loading,
//   handleBuyTicket,
// }: {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
//   completed: boolean;
//   loading: boolean;
//   handleBuyTicket: (type: 'event' | 'event_afterparty') => void;
// }) => {
//   if (completed) {
//     return renderPaymentUI(loading, handleBuyTicket);
//   } else {
//     return (
//       <motion.div
//         className="flex gap-[2vw] justify-center items-center text-white mt-8 mb-3 sm:mb-5 md:mb-8 lg:mb-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <TimeUnit value={String(days).padStart(2, "0")} label="days" />
//         <motion.span
//           className="text-[clamp(2rem,6vw,7rem)] font-extrabold font-Inter text-[#d9d4c1] -translate-y-[12%]"
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 1, repeat: Infinity }}
//         >
//           :
//         </motion.span>
//         <TimeUnit value={String(hours).padStart(2, "0")} label="hours" />
//         <motion.span
//           className="text-[clamp(2rem,6vw,7rem)] font-extrabold font-Inter text-[#d9d4c1] -translate-y-[12%]"
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 1, repeat: Infinity }}
//         >
//           :
//         </motion.span>
//         <TimeUnit value={String(minutes).padStart(2, "0")} label="minutes" />
//         <motion.span
//           className="text-[clamp(2rem,6vw,7rem)] font-extrabold font-Inter text-[#d9d4c1] -translate-y-[12%]"
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 1, repeat: Infinity }}
//         >
//           :
//         </motion.span>
//         <TimeUnit value={String(seconds).padStart(2, "0")} label="seconds" />
//       </motion.div>
//     );
//   }
// };

export default function BuyTicketPage() {
  // const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  const handleBuyTicket = async (ticketType: 'event' | 'event_afterparty') => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketType: ticketType,
          // Stripe will collect name and email during checkout
        }),
      });

      const { checkoutUrl, error } = await response.json();

      if (error) {
        alert(error);
        return;
      }

      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black text-white mt-[5%]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="relative z-10 grid grid-cols-12 h-full">
        {/* left side */}
        <motion.div
          className="col-span-12 md:col-span-3 flex flex-col justify-between border-r border-white/15 bg-black overflow-hidden relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* red gradient glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#E50609]/70 via-[#770505]/30 to-transparent" />
          {/* glow ring – 25 % of sidebar width */}
          <div className="absolute left-0 top-1/2 -translate-x-[65%] -translate-y-1/2 hidden md:block z-10 w-[75%] aspect-square">
            <div className="w-full h-full rounded-full bg-[#cb2b2a]" />
          </div>

          <div className="absolute left-0 top-1/2 -translate-x-[65%] -translate-y-1/2 hidden md:block z-0 w-[175%] aspect-square">
            <div className="w-full h-full rounded-full bg-black" />
          </div>

          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
            <p className="rotate-180 origin-left text-sm lg:text-lg font-light tracking-widest text-white/50 [writing-mode:vertical-rl]">
              INDEPENDENTLY ORGANISED TEDx EVENT
            </p>
          </div>
        </motion.div>

        {/* right side */}
        <div className="col-span-12 md:col-span-9 flex flex-col items-center justify-center text-center overflow-hidden">
          <motion.h2
            className="text-[clamp(1.6rem,4.75vw,5rem)] font-Inter text-[#d9d4c1] font-extrabold mt-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            TICKET SALES NOW OPEN
          </motion.h2>
          {/* Ticket sales are open - show buy button immediately */}
          {renderPaymentUI(loading, handleBuyTicket)}
          
          <motion.h2
            className="text-[clamp(1.5rem,3.5vw,4rem)] font-Inter text-[#E50609] font-bold text-center pt-3 px-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            EVERYTHING REIMAGINED
          </motion.h2>
          <motion.h2
            className="text-[clamp(2rem,3vw,4.5rem)] font-Inter text-[#595654] text-center font-light pb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            November 2nd, 2025 <br/>
            1:00PM - 6:00PM
          </motion.h2>
          <motion.div
            className="text-center text-[#d9d4c1] text-[clamp(0.8rem,1.1vw,2.5rem)] w-[75%] py-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Please note that payments are <b>non-refundable</b>. Spots are
            limited!
            <br />
            Please act swiftly if you wish to be part of this experience.
          </motion.div>
        </div>
      </div>
    </div>
  );
}
