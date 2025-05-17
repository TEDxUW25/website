'use client'
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const videoRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  // Text content for each section
  const sections = [
    {
      title: "Step into a world of ideas worth spreading at TEDxUW 2025.",
      footnote: "1"
    },
    {
      title: "Discover voices that challenge convention and ignite curiosity.",
      footnote: "2"
    },
    {
      title: "Experience talks that connect passion, purpose, and possibility.",
      footnote: "3"
    },
    {
      title: "Join the movement. Inspire change. Be part of something bigger.",
      footnote: "4"
    }
  ];
  

  // Set up intersection observer to detect which section is in view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when element is 50% visible
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

    // Observe all section elements
    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Handle smooth scroll logic
  const handleScroll = (index) => {
    sectionRefs.current[index].scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
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

      {/* Navigation dots */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-4">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => handleScroll(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index ? 'bg-white scale-125' : 'bg-gray-500'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main content container */}
      <div 
        ref={containerRef}
        className="relative min-h-screen z-10 flex flex-col snap-y snap-mandatory overflow-y-auto"
      >

        {/* Text sections that highlight on scroll */}
        {sections.map((section, index) => (
          <div 
            key={index}
            ref={el => sectionRefs.current[index] = el}
            className="min-h-screen flex items-center justify-center snap-start scroll-mt-0"
          >
            <div className="max-w-4xl px-6 py-24 text-center">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className={activeSection === index ? 'text-white' : 'text-gray-600'}>
                  {section.title.split(' ').map((word, wordIndex) => (
                    <span 
                      key={wordIndex} 
                      className="transition-all duration-700"
                      style={{
                        opacity: activeSection === index ? 1 : 0.3,
                        transform: activeSection === index ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: `${wordIndex * 50}ms`
                      }}
                    >
                      {word}{' '}
                    </span>
                  ))}
                  <sup>{section.footnote}</sup>
                </span>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}