'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

interface Section {
  title: string;
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastSectionRef = useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [lastSectionInView, setLastSectionInView] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Text content for each section
  const sections: Section[] = [
    { title: "Step into a world of ideas worth spreading at TEDxUW 2025." },
    { title: "Discover voices that challenge convention and ignite curiosity." },
    { title: "Experience talks that connect passion, purpose, and possibility." },
    { title: "Join the movement. Inspire change. Be part of something bigger." }
  ];

  // Intersection observer for active section
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    }, options);

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Intersection observer for last section
  useEffect(() => {
    if (!lastSectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLastSectionInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(lastSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScroll = (index: number) => {
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      >
        <source src="promo_vid.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navigation dots with fade animation */}
      <AnimatePresence>
        {(lastSectionInView || activeSection != sections.length - 1) && (
          <motion.div
            key="nav-dots"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed right-2.5 md:right-8 top-1/2 transform -translate-y-1/2 z-20"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleScroll(index)}
                  className={`w-1.5 h-1.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    activeSection === index ? 'bg-white scale-125' : 'bg-gray-500'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        ref={containerRef}
        className="relative min-h-screen z-10 flex flex-col snap-y snap-mandatory overflow-y-auto"
      >
        {sections.map((section, index) => (
          <div
            key={index}
            ref={el => {
              sectionRefs.current[index] = el;
              if (index === sections.length - 1) lastSectionRef.current = el;
            }}
            className="min-h-screen flex items-center justify-center snap-start scroll-mt-0"
          >
            <div className="max-w-7xl px-6 py-24 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                <span className={activeSection === index ? 'text-white' : 'text-gray-600'}>
                  {section.title.split(' ').map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className="transition-all duration-700 inline-block mr-2"
                      style={{
                        opacity: activeSection === index ? 1 : 0.3,
                        transform: activeSection === index ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: `${wordIndex * 50}ms`
                      }}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </span>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
