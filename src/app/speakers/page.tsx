'use client';
import React from 'react';
import Image from 'next/image';
import { Speaker, SPEAKERS } from '@/data/speakers';

const getSpeakerImage = (imageUrl?: string) => imageUrl || '/speaker-placeholder.png';

interface FeaturedSpeakerCardProps {
  speaker: Speaker;
}

const FeaturedSpeakerCard: React.FC<FeaturedSpeakerCardProps> = ({ speaker }) => {
  return (
    <div className="relative w-full aspect-[3/4] bg-zinc-800 text-white rounded-none overflow-hidden group shadow-xl">
      <div className="w-full h-full bg-red-600 flex items-center justify-center">
        <span className="text-6xl font-bold text-white opacity-50">
          {speaker.name.charAt(0) || '?'}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 sm:p-5 flex flex-col justify-end">
        <h3 className="text-xl sm:text-2xl font-bold mb-1 drop-shadow-md uppercase">{speaker.name}</h3>
        <p className="text-xs sm:text-sm leading-relaxed line-clamp-3 text-zinc-200 drop-shadow-sm">
          {speaker.bio ? speaker.bio.substring(0, 100) + (speaker.bio.length > 100 ? '...' : '') : 'An inspiring voice sharing groundbreaking ideas.'}
        </p>
      </div>
    </div>
  );
};

interface RegularSpeakerCardProps {
  speaker: Speaker;
}

const RegularSpeakerCard: React.FC<RegularSpeakerCardProps> = ({ speaker }) => {
  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[2/3] bg-black text-white rounded-none overflow-hidden group shadow-lg flex">
      <div className="w-1/2 bg-red-600 p-3 sm:p-4 flex flex-col justify-between items-start text-left">
        <div>
          <h3 className="text-md sm:text-lg lg:text-xl font-semibold leading-tight uppercase">{speaker.name}</h3>
        </div>
        <div className="mt-auto w-full">
          <p className="text-[10px] sm:text-xs font-medium text-red-100 uppercase">Title of Talk</p>
          <p className="text-[10px] sm:text-xs text-white truncate pt-1">
            {speaker.talkTitle || 'To be announced'}
          </p>
        </div>
      </div>
      <div className="w-1/2 relative bg-zinc-700">
        <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
          <span className="text-4xl font-bold text-white opacity-50">
            {speaker.name.charAt(0) || '?'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Speakers() {
  let topSpeakers = SPEAKERS.filter(s => s.featured).slice(0, 3);

  if (topSpeakers.length < 3) {
    const nonFeatured = SPEAKERS.filter(s => !topSpeakers.find(ts => ts.id === s.id));
    const needed = 3 - topSpeakers.length;
    topSpeakers = [...topSpeakers, ...nonFeatured.slice(0, needed)];
  }
  
  if (SPEAKERS.length === 0) {
    topSpeakers = Array(3).fill(null).map((_, i) => ({
      id: i - 100,
      name: 'PERSON NAME',
      bio: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.',
      imageUrl: '/speaker-placeholder.png',
      role: 'SPEAKER ROLE',
      talkTitle: 'A TALK TO INSPIRE CHANGE'
    }));
  } else {
    while (topSpeakers.length < 3 && SPEAKERS.length > 0) {
        topSpeakers.push(SPEAKERS[topSpeakers.length % SPEAKERS.length]);
    }
  }

  const topSpeakerIds = new Set(topSpeakers.map(s => s.id));
  let gridSpeakers = SPEAKERS.filter(s => !topSpeakerIds.has(s.id));
  
  if (gridSpeakers.length === 0 && SPEAKERS.length > 0) {
    gridSpeakers = SPEAKERS;
  }
  
  if (SPEAKERS.length === 0) {
    gridSpeakers = Array(9).fill(null).map((_, i) => ({
      id: i - 200,
      name: 'PERSON NAME',
      bio: 'Bio coming soon.',
      imageUrl: '/speaker-placeholder.png',
      role: 'SPEAKER ROLE',
      talkTitle: 'TITLE OF TALK'
    }));
  }

  return (
    <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">
      <section className="bg-black text-white pt-10 pb-8 md:pt-12 md:pb-12 lg:pb-16 overflow-visible relative">
        <div className="container mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tighter leading-none">
                Our Speakers
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tighter -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-6 leading-none">
                Line Up
              </h2>
            </div>
            
            <div className="text-right hidden md:block">
              <div className="flex flex-col items-end">
                <p className="text-sm mb-2 text-zinc-300 max-w-xs text-right">
                  Our incredibly talented, knowledgeable rosters of speakers who in love with innovating and spreads ideas worth spreading
                </p>
                <div className="relative">
                  <h3 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wide text-white relative mb-[-2.5rem] md:mb-[-5rem] lg:mb-[-7rem] z-10 transform translate-y-4 md:translate-y-8 lg:translate-y-10">
                    speakers
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="pt-12 pb-8 md:pt-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl xl:max-w-7xl mt-8 md:mt-10 lg:mt-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
            {topSpeakers.map((speaker, index) => (
              <div key={speaker.id ? `featured-${speaker.id}` : `featured-placeholder-${index}`} className="flex flex-col">
                <h4 className="text-black font-bold text-xl mb-2 uppercase">PERSON NAME</h4>
                <FeaturedSpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl xl:max-w-7xl">
          {gridSpeakers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {gridSpeakers.map((speaker, index) => (
                <div key={speaker.id ? `regular-${speaker.id}` : `regular-placeholder-${index}`} className="flex flex-col">
                  <h4 className="text-black font-bold text-lg mb-2 uppercase">PERSON NAME</h4>
                  <RegularSpeakerCard speaker={speaker} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-400 text-xl py-10">More speaker announcements coming soon!</p>
          )}
        </div>
      </section>
    </div>
  );
}