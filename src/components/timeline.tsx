"use client";
import Year from "@/components/year";

export default function Timeline() {
  return (
    <div>
      <h1 className="font-extrabold tracking-[5vw] text-center text-[15vw] overflow-hidden">
        Timeline
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-5 text-center">
        <Year
          image="timeline_bg/timeline1.svg"
          yr="2018"
          theme={`Making\nWaves`} // \n for each theme so red box height is consistent as using h-auto
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum magnam iusto vitae ducimus ea, quam, amet et magni numquam laboriosam vero at animi dolorem velit nostrum dicta corporis repellendus molestias."
        />
        <Year
          image="timeline_bg/timeline2.svg"
          yr="2020"
          theme={`Press\nPlay`}
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum magnam iusto vitae ducimus ea, quam, amet et magni numquam laboriosam vero at animi dolorem velit nostrum dicta corporis repellendus molestias."
        />
        <Year
          image="timeline_bg/timeline3.svg"
          yr="2023"
          theme={`From the\nGround Up`}
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum magnam iusto vitae ducimus ea, quam, amet et magni numquam laboriosam vero at animi dolorem velit nostrum dicta corporis repellendus molestias."
        />
        <Year
          image="timeline_bg/timeline3.svg"
          yr="2024"
          theme={`In the Odd\nChance`}
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum magnam iusto vitae ducimus ea, quam, amet et magni numquam laboriosam vero at animi dolorem velit nostrum dicta corporis repellendus molestias."
        />
        <Year
          image="timeline_bg/timeline3.svg"
          yr="2025"
          theme={`Everything\nReimagined`}
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum magnam iusto vitae ducimus ea, quam, amet et magni numquam laboriosam vero at animi dolorem velit nostrum dicta corporis repellendus molestias."
        />
        <div className="sm:hidden">
          <Year
            image="timeline_bg/timeline3.svg"
            yr="2025"
            theme={`Everything\nReimagined`}
            desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum magnam iusto vitae ducimus ea, quam, amet et magni numquam laboriosam vero at animi dolorem velit nostrum dicta corporis repellendus molestias."
          />
        </div>
      </div>
    </div>
  );
}
