import React from 'react';

interface PastTalkCardProps {
  id: number;
  title: string;
  desc: string;
  youtube: string;
}

// Helper to extract YouTube video ID from a URL
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:[?&]v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  return match ? match[1] : null;
}

// Helper to truncate at word boundary
function truncateAtWord(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  const truncated = str.substr(0, maxLen);
  return truncated.substr(0, truncated.lastIndexOf(' ')) + '...';
}

const PastTalkCard: React.FC<PastTalkCardProps> = ({ title, desc, youtube }) => {
  const videoId = getYouTubeId(youtube);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : undefined;
  const truncatedTitle = truncateAtWord(title, 40);

  return (
    <a
      href={youtube}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg shadow-md w-full h-full relative overflow-hidden group border border-gray-200 hover:border-red-400 cursor-pointer"
    >
      {/* Thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6">
        <div className="text-lg font-bold text-white text-center mb-1 w-full">{truncatedTitle}</div>
        <div className="text-sm text-gray-200 text-center mb-2">{desc}</div>
        <div className="mt-2 text-base text-red-300">Watch on YouTube →</div>
      </div>
    </a>
  );
};

export default PastTalkCard; 