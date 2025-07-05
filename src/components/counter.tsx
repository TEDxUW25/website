"use client";
import React, { useEffect, useState } from "react";

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}

const Counter: React.FC<CounterProps> = ({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  trigger,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!trigger) return;

    let current = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        clearInterval(interval);
        setCount(target);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration, trigger]);

  return (
    <div className="text-5xl font-bold text-white">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default Counter;
