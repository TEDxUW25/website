'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Nav {
  name: string,
  path: string,
}

const navItems: Nav[] = [
  {
    name: "Home",
    path: "/"},
  {
    name: "Speakers",
    path: "/speakers"},
  {
    name: "Organizers",
    path: "/organizers"},
  {
    name: "Sponsors",
    path: "/sponsors"},
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle mounting effect - useful for client-side animations
  useEffect(() => {
    setMounted(true);
    
    // Add scroll event listener with faster detection threshold
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8 
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      x: "100%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    open: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  return (
    <div>
      {/* Mobile View Nav */}
      <motion.div 
        className={`block md:hidden fixed top-0 w-full z-30 transition-all duration-200 ${scrolled ? 'bg-black' : 'bg-black'}`}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={navbarVariants}
      >
        <div className="flex justify-between items-center p-4">
          <Link href="/">
            <img src="logo.svg" width="90px" alt="logo"/>
          </Link>
          <button 
            onClick={toggleMenu}
            className={`focus:outline-none ${scrolled ? 'text-white' : 'text-white'}`}
          >
            {isMenuOpen ? (
              <span className="text-2xl">×</span>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Popup - using framer motion for slide animation */}
        <motion.div 
          className="fixed inset-0 bg-black z-50 p-4 flex flex-col"
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src="logo.svg" width="70px" alt="logo"/>
              <span className="text-black">University of Waterloo</span>
            </div>
            <button 
              onClick={toggleMenu}
              className="text-gray-500 focus:outline-none text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={toggleMenu}
                className="py-4 text-white border-b border-gray-200 font-medium uppercase"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 w-full">
              <Link href="/buy_ticket" className="block mb-4" onClick={toggleMenu}>
                <button className="w-full bg-red-500 text-white py-3 rounded-md font-medium">
                  Buy Tickets
                </button>
              </Link>
              <Link href="/log_in" className="block" onClick={toggleMenu}>
                <button className="w-full bg-white text-black border border-black py-3 rounded-md font-medium">
                  Log In
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-between text-gray-500 mt-auto pt-4 w-full border-t border-gray-200">
            {/* Social Links */}
            <button className="text-sm"> Youtube → </button>
            <button className="text-sm"> Linkedin → </button>
            <button className="text-sm"> Instagram → </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop View Nav */}
      <motion.div 
        className={`hidden md:flex flex-row justify-between p-4 fixed top-0 z-30 w-full transition-all duration-200 ${scrolled ? 'bg-black/30 backdrop-blur' : 'bg-black shadow-sm'}`}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={navbarVariants}
      >
        <div className="items-start mt-2 md:gap-12 flex flex-row">
          <Link href="/"><img src="logo.svg" width="90px" alt="logo"/></Link>
          {navItems.map(n => (
            <div key={n.name} className={`hover:underline underline-offset-2 transition ease-in-out ${scrolled ? 'text-white' : 'text-white'}`}>
              <Link href={n.path}>{n.name}</Link> 
            </div>
          ))}  
        </div>
        <div className="flex flex-row gap-8">
          <Link href="/buy_ticket">
            <button className={`rounded-lg border-2 px-4 py-2 hover:bg-[var(--button-transition)] hover:border-[var(--button-transition)] transition ease-in-out border-white text-white`}>
              Buy Ticket
            </button>
          </Link> 
          <Link href="/log_in">
            <button className={`hover:underline underline-offset-2 transition ease-in-out pt-2 text-white`}>
              Log In
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}