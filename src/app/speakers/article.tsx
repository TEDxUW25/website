"use client";
import Link from "next/link";
import ArticlePreview from "./articlePreview";

export default function Article() {
  return (
    <div className="w-full h-full p-[7%]">
      <div
        className={`text-sm sm:text-xl md:text-2xl xl:text-4xl flex flex-row justify-between items-center `}
      >
        <h1 className="font-bold">Excited ?</h1>
        <Link href="buy_ticket">
          <h1 className="hover:scale-105 duration-200">
            Purchase{" "}
            <a href="/buy_ticket">
              {" "}
              <span className="underline underline-offset-[15%]">
                tickets
              </span>{" "}
            </a>
            today!
          </h1>
        </Link>
      </div>
      {/* Medium Page/Image*/}
      <div className="flex justify-center items-center my-[3%] border-2 sm:border-4 border-black md:border-0 md:p-3 xl:p-5 md:hover:bg-black md:duration-300">
        <a className="w-full" href="https://medium.com/@tedxuw" target="_blank">
          <img className="w-full" src="medium.png" alt="tedxuw medium page" />
        </a>
      </div>
      {/* Article Preview Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[3%]">
        <ArticlePreview
          img="articles/article1.svg"
          link="https://medium.com/@tedxuw/4-ways-to-improve-your-public-speaking-with-tedx-talks-a3fe8a101a7e"
          title="4 Ways to Improve Your Public Speaking with TEDx Talks"
        />
        <ArticlePreview
          img="articles/article2.svg"
          link="https://medium.com/@tedxuw/5-reasons-to-attend-tedxuw-56f16d8f3e5a"
          title="5 Reasons To Attend TEDxUW"
        />
        <ArticlePreview
          img="articles/article3.svg"
          link="https://medium.com/@tedxuw/why-tedx-talks-bada1712804"
          title="Why TEDx Talks?"
        />
      </div>
    </div>
  );
}
