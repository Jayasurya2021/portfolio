"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export function MorphText({
  words = ["CREATE", "DESIGN", "DEVELOP"],
  interval = 3000,
  subtext,
  fontSize = "clamp(3rem, 15vw, 10rem)",
  fontFamily = '"Space Grotesk", sans-serif',
  align = "left",
  className,
  textClassName,
  subtextClassName,
}) {
  // Unique ID so multiple instances don't share filter IDs
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;

  const totalDuration = (interval / 1000) * words.length; // seconds
  const wordDuration = interval / 1000;

  // Build per-word keyframe + delay styles
  const wordStyles = words.map((_, i) => ({
    animationDelay: `${i * wordDuration}s`,
    animationDuration: `${totalDuration}s`,
  }));

  const maxLen = Math.max(...words.map((w) => w.length));
  const isLeft = align === "left";

  return (
    <div className={cn("morph-text-root relative flex flex-col items-center text-center", className)}>
      {/* ── Threshold SVG filter (hidden) ─────────────────────────── */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Morphing word container ────────────────────────────────── */}
      <div
        className={cn("morph-text-container relative select-none", textClassName)}
        style={{
          fontSize,
          fontWeight: 700,
          filter: `url(#${filterId})`,
          fontFamily,
        }}
      >
        {/* word rotator */}
        <div
          className={cn("morph-word-rotator relative flex items-center justify-center")}
          style={{ height: "1.2em", minWidth: `${maxLen + 1}ch` }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="morph-word absolute text-black dark:text-white"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                whiteSpace: "nowrap",
                animationName: "morph-word-rotate",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                ...wordStyles[i],
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Optional subtext ──────────────────────────────────────── */}
      {subtext && (
        <div
          className={cn(
            "morph-subtext mt-3 uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm select-none w-full text-center",
            subtextClassName
          )}
          style={{
            fontFamily,
          }}
        >
          {subtext}
        </div>
      )}

      {/* ── Scoped keyframes ──────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');

        @keyframes morph-word-rotate {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(0.8);
          }
          5% {
            opacity: 0.5;
            filter: blur(10px);
          }
          15%, 35% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(1);
          }
          45% {
            opacity: 0.5;
            filter: blur(10px);
          }
          50%, 100% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes morph-word-rotate-left {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(0%, -50%) scale(0.8);
          }
          5% {
            opacity: 0.5;
            filter: blur(10px);
          }
          15%, 35% {
            opacity: 1;
            filter: blur(0px);
            transform: translate(0%, -50%) scale(1);
          }
          45% {
            opacity: 0.5;
            filter: blur(10px);
          }
          50%, 100% {
            opacity: 0;
            filter: blur(20px);
            transform: translate(0%, -50%) scale(1.2);
          }
        }

        @keyframes morph-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default MorphText;
