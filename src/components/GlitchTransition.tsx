"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

export default function GlitchTransition() {
  const [active, setActive] = useState(false);
  const timersRef = useRef<number[]>([]);

  const reset = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    setActive(false);
  };

  useEffect(() => {
    const onStart = () => {
      reset();
      setActive(true);
      const t = window.setTimeout(() => {
        window.location.href = SITE.automotiveUrl;
      }, 1400);
      timersRef.current.push(t);
    };
    const onPageShow = () => reset();

    window.addEventListener("scrm:glitch-start", onStart);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("scrm:glitch-start", onStart);
      window.removeEventListener("pageshow", onPageShow);
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div
      aria-hidden={!active}
      className={`fixed inset-0 z-[100] pointer-events-none ${active ? "" : "hidden"}`}
    >
      {/* Background warp */}
      <div className={`absolute inset-0 bg-black ${active ? "anim-warp" : ""}`} />

      {/* Static noise */}
      <div className={`absolute inset-0 noise ${active ? "anim-noise" : ""}`} />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines" />

      {/* Horizontal glitch bars */}
      <div className={`absolute inset-0 ${active ? "anim-bars" : ""}`}>
        <div className="bar bar-1" />
        <div className="bar bar-2" />
        <div className="bar bar-3" />
      </div>

      {/* Logos */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Real estate logo (fades out at peak) */}
        <div className={`relative ${active ? "anim-logo-out" : ""}`}>
          <span className="absolute inset-0 ghost ghost-red">scrm</span>
          <span className="absolute inset-0 ghost ghost-blue">scrm</span>
          <span className="font-sans text-6xl md:text-7xl font-bold text-white tracking-tight relative">
            <span className="text-re-blue-accent">scrm</span>
            <span className="text-white"> media</span>
          </span>
        </div>

        {/* Automotive logo (snaps in) */}
        <div className={`absolute ${active ? "anim-logo-in" : "opacity-0"}`}>
          <span className="font-sans text-6xl md:text-7xl font-bold tracking-tight">
            <span className="text-re-blue-accent">scrm</span>
            <span className="text-white"> media</span>
          </span>
          <span className="block mt-2 text-center font-sans text-sm tracking-[0.3em] uppercase text-white/80">
            Automotive
          </span>
        </div>
      </div>

      <style jsx>{`
        .scanlines {
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.0) 0px,
            rgba(0, 0, 0, 0.0) 2px,
            rgba(0, 0, 0, 0.45) 3px,
            rgba(0, 0, 0, 0.45) 4px
          );
          mix-blend-mode: multiply;
          opacity: 0.55;
        }
        .noise {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>");
          mix-blend-mode: screen;
          opacity: 0.4;
        }
        .anim-noise { animation: noiseShift 0.18s steps(2) infinite; }
        .anim-warp { animation: warp 1.4s ease-out forwards; transform-origin: center; }
        .bar {
          position: absolute;
          left: 0; right: 0;
          height: 12px;
          background: rgba(255,255,255,0.06);
          mix-blend-mode: screen;
          filter: blur(0.4px);
        }
        .bar-1 { top: 22%; }
        .bar-2 { top: 48%; height: 22px; background: rgba(59,111,170,0.18); }
        .bar-3 { top: 71%; height: 6px; background: rgba(196,169,108,0.18); }
        .anim-bars .bar { animation: barShift 0.16s steps(3) infinite; }
        .anim-bars .bar-2 { animation-duration: 0.22s; }
        .anim-bars .bar-3 { animation-duration: 0.11s; }

        .ghost {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 800;
          font-size: inherit;
          letter-spacing: -0.02em;
          color: transparent;
          mix-blend-mode: screen;
        }
        .ghost-red { color: rgba(255,40,40,0.85); transform: translateX(-3px); }
        .ghost-blue { color: rgba(60,150,255,0.85); transform: translateX(3px); }

        .anim-logo-out {
          animation: logoOut 1.4s ease-in forwards;
        }
        .anim-logo-in {
          animation: logoIn 1.4s steps(8) forwards;
        }

        @keyframes warp {
          0%   { transform: scale(1.06); filter: blur(8px) brightness(1.6); opacity: 0; }
          15%  { transform: scale(1.0); filter: blur(0px) brightness(1); opacity: 1; }
          50%  { transform: scale(1.01); }
          80%  { transform: scale(1.0); filter: brightness(1); }
          100% { transform: scale(1.0); filter: brightness(0.9); opacity: 1; }
        }
        @keyframes noiseShift {
          0%   { transform: translate(0,0); }
          50%  { transform: translate(-3%, 2%); }
          100% { transform: translate(2%, -2%); }
        }
        @keyframes barShift {
          0%   { transform: translateX(0); }
          33%  { transform: translateX(-12px); }
          66%  { transform: translateX(8px); }
          100% { transform: translateX(0); }
        }
        @keyframes logoOut {
          0%   { opacity: 0; transform: translateX(0) skewX(0); }
          12%  { opacity: 1; transform: translateX(-2px) skewX(-1deg); }
          30%  { transform: translateX(3px) skewX(2deg); }
          50%  { opacity: 1; transform: translateX(-4px) skewX(-3deg); }
          65%  { opacity: 0.8; transform: translateX(6px) skewX(4deg); filter: blur(1px); }
          75%  { opacity: 0; transform: translateX(0) skewX(0); }
          100% { opacity: 0; }
        }
        @keyframes logoIn {
          0%, 70%   { opacity: 0; transform: translateY(8px); }
          71%       { opacity: 1; transform: translateY(0); }
          74%       { opacity: 0; }
          76%       { opacity: 1; }
          80%       { opacity: 0; }
          82%, 100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
