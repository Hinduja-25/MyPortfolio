import React, { useState } from 'react';
import { Star, Heart, Sparkle } from 'lucide-react';

export default function ScrapbookHero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
      {/* Main Scrapbook Container */}
      <div
        className="relative pointer-events-auto cursor-pointer"
        style={{ width: '450px', height: '350px', marginTop: '20px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Text Snippets */}

        <div className="absolute bottom-12 -right-36 font-handwriting text-7xl text-[#d45d79] rotate-3 font-bold drop-shadow-md select-none z-20">
          Hinduja Simhadri
        </div>
        <div className="absolute -bottom-12 right-0 font-handwriting text-3xl text-[#5c674e] -rotate-2 select-none">
          Welcome to my portfolio ♡
        </div>

        {/* Envelope Back Base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[260px] bg-[#e6dfcb] rounded-md shadow-inner border border-[#d5ccb5]"></div>

        {/* Envelope Open Flap (Top pointing up) */}
        <div className="absolute bottom-[258px] left-1/2 -translate-x-1/2 w-[420px] h-[150px] overflow-hidden">
          <svg viewBox="0 0 420 150" className="w-full h-full drop-shadow-md" preserveAspectRatio="none">
            <path d="M0,150 L210,0 L420,150 Z" fill="#f0ebd9" stroke="#d5ccb5" strokeWidth="2" />
          </svg>
        </div>

        {/* Polaroid (Pops up out of envelope) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isHovered ? 'bottom-[120px] rotate-3 scale-105' : 'bottom-[70px] -rotate-6'
            }`}
          style={{ zIndex: 10 }}
        >
          {/* Generated Polaroid Card */}
          <div className="relative w-[280px]">
            <img
              src="/polaroid_edited.png"
              alt="Hinduja Simhadri Polaroid"
              className="w-full h-auto drop-shadow-xl select-none pointer-events-none mix-blend-multiply"
              draggable={false}
            />
          </div>
        </div>

        {/* Envelope Front (Covers the bottom of the polaroid) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[260px]" style={{ zIndex: 15 }}>
          {/* Front Flaps (CSS Triangle/SVG) */}
          <svg viewBox="0 0 420 260" className="w-full h-full drop-shadow-[0_-4px_10px_rgba(0,0,0,0.08)]">
            {/* Left flap */}
            <path d="M0,0 L210,140 L0,260 Z" fill="#eae4d3" stroke="#d5ccb5" strokeWidth="1" />
            {/* Right flap */}
            <path d="M420,0 L210,140 L420,260 Z" fill="#e6dfcb" stroke="#d5ccb5" strokeWidth="1" />
            {/* Bottom flap */}
            <path d="M0,260 L210,140 L420,260 Z" fill="#f0ebd9" stroke="#d5ccb5" strokeWidth="1" />
          </svg>

          {/* Wax Seal */}
          <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-14 h-14 bg-[#aa4238] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.2)] flex items-center justify-center text-[#f6dbd8] font-serif italic text-2xl border-4 border-[#8c352d] rotate-12 select-none">
            HS
          </div>




          <div className="absolute top-6 right-16 w-10 h-12 bg-[#b6c7a3] border-2 border-dashed border-white flex items-center justify-center shadow-sm -rotate-6 select-none">
            <Star className="w-5 h-5 fill-white text-white" />
          </div>
        </div>

        {/* Floating Developer Elements (Emerge on hover) */}
        {/* 1. Tiny Terminal Popup */}
        <div className={`absolute transition-all duration-700 ease-out z-0 flex flex-col overflow-hidden bg-[#2a2432]/95 backdrop-blur-sm rounded-lg border border-pink-200/20 shadow-[0_4px_15px_rgba(0,0,0,0.1)] w-44 ${
          isHovered ? 'top-[-10px] -left-12 rotate-[-4deg] opacity-100' : 'top-[50px] left-0 rotate-0 opacity-0'
        }`}>
          <div className="h-4 bg-[#1f1926]/90 flex items-center px-2 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="p-2.5 text-[9px] font-mono text-pink-100/90 leading-relaxed">
            <div><span className="text-pink-400 font-bold">{'>'}</span> learning AI/ML...</div>
            <div><span className="text-pink-400 font-bold">{'>'}</span> solving DSA...</div>
            <div className="animate-pulse text-pink-400 font-bold">_</div>
          </div>
        </div>

        {/* 2. Sticky-note Code Snippet */}
        <div className={`absolute transition-all duration-700 ease-out z-0 bg-[#fff9c4] text-[#5c674e] p-2 rounded shadow-sm font-mono text-[9px] w-36 border border-yellow-200/50 ${
          isHovered ? 'top-[40px] -right-16 rotate-[6deg] opacity-100' : 'top-[80px] right-0 rotate-0 opacity-0'
        }`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1.5 w-8 h-3 bg-pink-200/60 rotate-[-3deg] shadow-sm" />
          <span className="text-[#c678dd] font-bold">const</span> dream = <br/><span className="text-[#98c379]">"learn and grow"</span>;
        </div>

        {/* Decorative Stickers (Z-index high to overlap everything) */}
        <div style={{ zIndex: 20 }}>
          <Star className="absolute top-8 -left-4 text-[#e6a745] fill-[#e6a745] w-8 h-8 -rotate-12 drop-shadow-sm transition-transform hover:scale-125 hover:rotate-45 duration-300" />
          <Sparkle className="absolute bottom-20 -left-12 text-[#cc6a5c] fill-[#cc6a5c] w-6 h-6 rotate-12 drop-shadow-sm animate-pulse" />
          <Heart className="absolute bottom-8 -right-8 text-[#d45d79] fill-[#d45d79] w-7 h-7 rotate-12 drop-shadow-sm transition-transform hover:scale-125 duration-300" />

          {/* Some extra random pieces of tape */}
          <div className="absolute bottom-0 -left-10 w-12 h-4 bg-white/50 backdrop-blur-sm -rotate-12 shadow-sm rounded-sm"></div>
          <div className="absolute top-32 -right-8 w-10 h-4 bg-white/50 backdrop-blur-sm rotate-45 shadow-sm rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
