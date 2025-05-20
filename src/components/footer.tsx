"use client";
import FAQ from "@/components/faq";
import { useState, useEffect } from "react";
import ContactForm from "@/components/contactForm";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FaLinkedin } from "react-icons/fa";


const quotes = [
  {
    quote: "People don't buy what you do, they buy why you do it",
    author: "Simon Sinek",
  },
  {
    quote: "Vulnrability is our most accurage measurement of courage",
    author: "Brene Brown",
  },
  {
    quote: "Opportunities don't happen, you create them",
    author: "Chris Grosser",
  },
  {
    quote: "If you can dream it, you can do it",
    author: "Walt Disney",
  },
  {
    quote: "Nothing is impossible. The word itself says 'I'm possible!'",
    author: "Audrey Hepburn",
  },
];

export default function Footer() {
  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => {
    const randIndex = Math.floor(Math.random() * quotes.length);
    setIndex(randIndex);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="font-bold text-center text-xl md:text-3xl xl:text-5xl xl:p-15 mt-10 md:mt-20">
        Frequently Asked Questions
      </h1>
      <FAQ />
      <div className="w-full h-auto relative">
        {/* Red Polygon background */}
        <div
          className="w-full h-[700px] md:h-[900px] xl:h-[1100px] flex flex-col justify-center items-center"
          style={{
            backgroundColor: "var(--button-transition)",
            clipPath: "polygon(0% 10%, 0% 90%, 100% 100%, 100% 0%)",
          }}
        >
          {/* Display quote */}
          {index !== null && (
            <>
              <p className="text-lg md:text-3xl xl:text-4xl font-semibold text-center px-3">
                {quotes[index].quote}
              </p>
              <p className="text-lg md:text-3xl xl:text-4xl font-semibold m-1 md:m-3 xl:m-5 text-center">
                - {quotes[index].author}
              </p>
            </>
          )}
          <ContactForm />
        </div>
        <div className="absolute top-0 right-[10%] font-bold text-black text-sm md:text-lg xl:text-2xl bg-white py-3 px-10 md:py-4 md:px-12 xl:py-5 xl:px-20">
          Contact Us
        </div>
        {/* Buy Ticket Button with underilne animation */}
        <Link href="/buy_ticket">
          <motion.button
            className="absolute bottom-[5%] left-[10%] font-bold text-black bg-white py-3 px-10 md:py-4 md:px-12 xl:py-5 xl:px-10 cursor-pointer outline-none"
            whileHover="hover"
            initial="initial"
          >
            <p className="relative text-sm md:text-lg xl:text-2xl">
              <motion.span
                className="absolute bottom-0 left-0 h-[2.5px] bg-black cursor-pointer"
                variants={{
                  initial: { width: "0%" },
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.2 }}
              ></motion.span>
              Buy Your Ticket Today →
            </p>
          </motion.button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 my-10">
        {/* TEDxUW logo */}
        <div className="flex flex-row items-center mt-20">
          <img src="ted.svg" alt="" className="h-6 md:h-8 xl:h-10" />
          <h1 className="text-3xl md:text-4xl xl:text-5xl text-white ml-2">
            UWaterloo
          </h1>
        </div>
        <p className="font-bold text-xs md:text-base xl:text-md mb-5 text-center">
          <span className="text-[#e50409] font-extrabold">x</span> = independently organized
          TED event
        </p>
        {/* Social Media Links */}
        <div className="flex flex-row gap-7 mb-10">
          <Link href="https://www.instagram.com/tedxuw/" target="_blank">
          <div className="bg-red-500 p-2 rounded-2xl"><FaInstagram/></div>
            
          </Link>
          <Link href="https://www.linkedin.com/company/tedxuw/" target="_blank">
          <div className="bg-red-500 p-2 rounded-2xl">< FaLinkedin/></div>
           
          </Link>
          <Link href="https://www.facebook.com/TEDxUW/" target="_blank">
          <div className="bg-red-500 p-2 rounded-2xl"><FaFacebookF/></div>
          </Link>
        </div>
        {/* Copyright */}
        <p className="text-center mt-5 w-[70%] text-sm md:text-base xl:text-xs">
          @ 2025 TEDxUW. All righs reserved. This independent TEDx event is
          operated under licence from TED
        </p>
      </div>
    </div>
  );
}
