'use client';
import React, { useState } from 'react';
import { Speaker, SPEAKERS } from '@/data/speakers';

// Social icon components
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

// Speaker Card Component
const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
  return (
    <div 
      className={`bg-zinc-900 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ${speaker.featured ? 'hover:shadow-red-500/30 ring-1 ring-red-500/30' : 'hover:shadow-white/10'}`}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {/* Placeholder gradient until real images are available */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-red-900 animate-pulse"></div>
        
        {/* Featured badge */}
        {speaker.featured && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-xl font-bold">{speaker.name}</h3>
          <p className="text-red-500">{speaker.role}</p>
        </div>
      </div>
      
      <div className="p-4">
        {speaker.talkTitle && (
          <p className="text-lg font-semibold mb-2 text-red-400">&ldquo;{speaker.talkTitle}&rdquo;</p>
        )}
        <p className="text-sm text-zinc-300 mb-4">{speaker.bio}</p>
        
        {/* Topic tags */}
        {speaker.topics && speaker.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {speaker.topics.map(topic => (
              <span key={topic} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        )}
        
        {/* Social links */}
        {speaker.socialLinks && (
          <div className="flex gap-3 mb-4">
            {speaker.socialLinks.twitter && (
              <a 
                href={speaker.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                <TwitterIcon />
              </a>
            )}
            {speaker.socialLinks.linkedin && (
              <a 
                href={speaker.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                <LinkedinIcon />
              </a>
            )}
            {speaker.socialLinks.website && (
              <a 
                href={speaker.socialLinks.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                <WebsiteIcon />
              </a>
            )}
          </div>
        )}
        
        <button className="w-full mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default function SpeakersLineup() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter speakers based on selected topic
  const filteredSpeakers = activeFilter
    ? SPEAKERS.filter(speaker => speaker.topics?.includes(activeFilter))
    : SPEAKERS;
    
  // Get unique topics for filter buttons
  const allTopics = Array.from(new Set(
    SPEAKERS.flatMap(speaker => speaker.topics || [])
  ));
  
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Featured speakers section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4">Featured Speakers</h2>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SPEAKERS.filter(speaker => speaker.featured).map(speaker => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>
        
        {/* All speakers section */}
        <h2 className="text-4xl font-bold text-center mb-2">All Speakers</h2>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
        
        {/* Topic filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full text-sm ${!activeFilter ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
          >
            All Topics
          </button>
          {allTopics.map(topic => (
            <button
              key={topic}
              onClick={() => setActiveFilter(topic)}
              className={`px-4 py-2 rounded-full text-sm ${activeFilter === topic ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
            >
              {topic}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpeakers.map(speaker => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}
