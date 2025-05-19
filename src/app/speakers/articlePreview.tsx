"use client";

interface ArticlePreviewProps {
  img: string;
  link: string;
  title: string;
}

export default function ArticlePreview(props: ArticlePreviewProps) {
  return (
    <div className="w-full h-[75px] sm:h-[125px] md:h-full border-2 border-white overflow-hidden relative">
      <a
        className="block cursor-pointer group"
        href={props.link}
        target="_blank"
      >
        <h1 className="z-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-xs sm:text-xl md:text-sm lg:text-lg xl:text-xl text-center w-[70%] duration-300 group-hover:scale-110 group-hover:bg-[#E50609] p-1 whitespace-normal">
          {props.title} →
        </h1>
        <img
          src={props.img}
          className="w-full h-full object-cover -translate-y-1/3 md:translate-y-0"
          alt={`article img: ${props.title}`}
        />
      </a>
    </div>
  );
}
