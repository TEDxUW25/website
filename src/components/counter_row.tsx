"use client";
import React from "react";
import Counter from "./counter";

interface Stat {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface Props {
  stats: Stat[];
}

const CounterRow: React.FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto text-center">
      {stats.map((stat, index) => (
        <div key={index}>
          <Counter
            target={stat.target}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
          <p className="mt-2 text-sm text-white">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default CounterRow;
