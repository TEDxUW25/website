'use client';
import React from 'react';

type TeamMember = {
  name: string;
  role: string;
  image?: string;
  featured?: boolean;
};

export default function TeamSection() {
  // Sample team members data - replace with actual data
  const teamMembers: TeamMember[] = [
    { name: 'Person Name', role: 'Position in TED', image: '/team/member1.jpg', featured: true },
    { name: 'Person Name', role: 'Position in TED', featured: true },
    { name: 'Person Name', role: 'Position in TED' },
    { name: 'Person Name', role: 'Position in TED' },
    { name: 'Person Name', role: 'Position in TED' },
    { name: 'Person Name', role: 'Position in TED' },
    { name: 'Person Name', role: 'Position in TED' },
    { name: 'Person Name', role: 'Position in TED' },
  ];

  // Split team members into featured (top 2) and regular members
  const featuredMembers = teamMembers.filter(member => member.featured);
  const regularMembers = teamMembers.filter(member => !member.featured);

  // Create a TeamMemberCard component to avoid code duplication
  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <div className="flex flex-col items-center">
      {/* Torn paper frame effect - more jagged like the reference image */}
      <div className="relative w-60 h-60 mb-4 cursor-pointer group">
        {/* White torn paper outer frame with more realistic rough edges matching reference image */}
        <div className="absolute inset-0" 
             style={{ 
               filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
               clipPath: "polygon(2% 5%, 6% 1%, 12% 4%, 15% 0%, 20% 3%, 28% 1%, 35% 3%, 42% 1%, 48% 2%, 54% 0%, 60% 3%, 68% 1%, 76% 2%, 84% 0%, 92% 3%, 98% 1%, 99.8% 7%, 98% 15%, 100% 20%, 98.5% 28%, 100% 34%, 98% 42%, 100% 50%, 98.5% 57%, 100% 65%, 98.8% 72%, 100% 80%, 98% 88%, 100% 95%, 98% 99%, 90% 97.5%, 84% 100%, 75% 98%, 67% 100%, 60% 98.5%, 50% 100%, 42% 98%, 35% 100%, 26% 98%, 18% 100%, 9% 98%, 2% 99%, 0% 92%, 1.5% 83%, 0% 75%, 2% 68%, 0% 60%, 1.8% 50%, 0% 42%, 1.8% 33%, 0% 26%, 1.5% 18%, 0% 12%)",
               background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
               boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
               border: '1px solid rgba(0,0,0,0.03)'
             }}> 
             
          {/* White inner square with image - more centered like the reference image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white transition-all duration-300 ease-in-out group-hover:w-[75%] group-hover:h-[75%] p-3" style={{
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)',
                border: '1px solid rgba(240,240,240,0.8)'
              }}
          >
            {/* Plain white square with placeholder image */}
            <div className="w-full h-full bg-white flex items-center justify-center">
              <img 
                src="/team/placeholder-image.svg" 
                alt="Team Member" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center p-4 mt-2 bg-black text-white rounded-sm transform rotate-[0.3deg] max-w-60" 
           style={{
             clipPath: 'polygon(0% 2%, 3% 0%, 97% 0%, 100% 2%, 99% 98%, 97% 100%, 3% 100%, 1% 98%)',
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23333333' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
             boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
           }}
      >
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-gray-400">{member.role}</p>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Our Team</h2>
        
        {/* Featured members (top 2 centered) */}
        <div className="flex justify-center gap-10 md:gap-20 mb-16">
          {featuredMembers.map((member, index) => (
            <TeamMemberCard key={`featured-${index}`} member={member} />
          ))}
        </div>
        
        {/* Regular members (two rows of 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {regularMembers.map((member, index) => (
            <TeamMemberCard key={`regular-${index}`} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
