"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function CounterPractice() {
  const [state, setState] = useState(0);

  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const incBtnRef = useRef(null);
  const decBtnRef = useRef(null);

  const increment = () => {
    setState((prev) => prev + 1);

    gsap.fromTo(
      numberRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" }
    );
  };

  const decrement = () => {
    setState((prev) => (prev > 0 ? prev - 1 : prev));

    gsap.fromTo(
      numberRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" }
    );
  };

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
    });

   
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1 }
    )
      .fromTo(
        numberRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.3"
      )
      .fromTo(
        incBtnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.3"
      )
      .fromTo(
        decBtnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.3"
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-4 bg-white shadow-xl rounded-2xl p-6 w-[260px] h-[260px] mx-auto mt-10 border border-gray-200"
    >
      <span
        ref={numberRef}
        className="text-5xl font-bold text-gray-800 tracking-wide"
      >
        {state}
      </span>

      <div className="flex gap-4">
        <button
          ref={incBtnRef}
          onClick={increment}
          className="bg-green-600 hover:bg-green-700 transition-all text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg active:scale-95"
        >
          Increase
        </button>

        <button
          ref={decBtnRef}
          onClick={decrement}
          className="bg-red-600 hover:bg-red-700 transition-all text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg active:scale-95"
        >
          Decrease
        </button>
      </div>
    </div>
  );
}
