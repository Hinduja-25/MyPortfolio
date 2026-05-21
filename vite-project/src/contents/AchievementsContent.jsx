import React, { useRef } from 'react';
import { SoundManager } from '../utils/SoundManager';

const achievements = [
  {
    id: 'leetcode',
    title: 'LeetCode Milestone',
    subtitle: '100+ Problems Solved',
    date: '2025',
    desc: 'Consistently solving DSA problems on LeetCode daily, building algorithmic intuition across arrays, trees, graphs, and dynamic programming.',
    color: '#e6a745',
    bgColor: '#fdf8ee',
    Icon: () => (
      <svg viewBox="0 0 120 90" className="w-full h-full" fill="none">
        <rect width="120" height="90" fill="#fdf8ee" rx="4" />
        {/* Monitor frame */}
        <rect x="20" y="15" width="80" height="55" rx="4" fill="#1a2117" stroke="#3c4233" strokeWidth="2" />
        <rect x="24" y="19" width="72" height="47" rx="2" fill="#0d1209" />
        {/* Code lines - amber terminal style */}
        <text x="28" y="34" fontFamily="monospace" fontSize="7" fill="#e6a745">{'> const solve = (n) => {'}</text>
        <text x="28" y="44" fontFamily="monospace" fontSize="7" fill="#8cb865">{'    return dp[n];'}</text>
        <text x="28" y="54" fontFamily="monospace" fontSize="7" fill="#e6a745">{'};'}</text>
        <text x="28" y="62" fontFamily="monospace" fontSize="7" fill="#4d9e3f">{'// ✓ Accepted'}</text>
        {/* Stand */}
        <rect x="52" y="70" width="16" height="8" rx="1" fill="#3c4233" />
        <rect x="44" y="77" width="32" height="4" rx="2" fill="#3c4233" />
        {/* 100+ badge */}
        <circle cx="93" cy="22" r="11" fill="#e6a745" stroke="#3c4233" strokeWidth="1.5" />
        <text x="93" y="26" fontFamily="monospace" fontSize="7" fill="#3c4233" textAnchor="middle" fontWeight="bold">100+</text>
      </svg>
    )
  },
  {
    id: 'hackathon',
    title: 'College Hackathon',
    subtitle: 'Runner-up 🥈 · Web Track',
    date: '2026',
    desc: 'Runner-up in the college hackathon coducted in annual techno-cultural fest Advaita',
    color: '#7d8f6d',
    bgColor: '#f2f6ee',
    Icon: () => (
      <svg viewBox="0 0 120 90" className="w-full h-full" fill="none">
        <rect width="120" height="90" fill="#f2f6ee" rx="4" />
        {/* Medal ribbon */}
        <path d="M50 15 L60 30 L70 15 Z" fill="#e2726d" stroke="#c25d58" strokeWidth="1" />
        <path d="M55 15 L60 25 L65 15 Z" fill="#ffb3ab" />
        {/* Medal circle */}
        <circle cx="60" cy="52" r="26" fill="#f6cc58" stroke="#dfb455" strokeWidth="3" />
        <circle cx="60" cy="52" r="20" fill="#e6a745" stroke="#dfb455" strokeWidth="1.5" />
        {/* #1 text */}
        <text x="60" y="46" fontFamily="serif" fontSize="16" fill="#3c4233" textAnchor="middle" fontWeight="bold">#1</text>
        <text x="60" y="60" fontFamily="monospace" fontSize="6" fill="#3c4233" textAnchor="middle">WINNER</text>
        {/* Stars around */}
        <circle cx="22" cy="22" r="3" fill="#dfb455" />
        <circle cx="98" cy="22" r="3" fill="#dfb455" />
        <circle cx="18" cy="70" r="2" fill="#7d8f6d" />
        <circle cx="102" cy="70" r="2" fill="#7d8f6d" />
      </svg>
    )
  },

];

export default function AchievementsContent() {
  const scrollRef = useRef(null);

  const handleCardClick = () => {
    SoundManager.playClick();
  };

  const handleScrollRight = () => {
    SoundManager.playClick();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    SoundManager.playClick();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-full font-sans select-none">

      {/* Header Bar */}
      <div className="shrink-0 flex items-center justify-between border-b border-[#dfd8be] pb-3 mb-4">
        <div className="space-y-0.5">
          <h2 className="text-sm font-mono font-bold text-[#3c4233] uppercase tracking-widest flex items-center gap-2">
            <span className="text-[#e6a745]">★</span> Achievements.dir
          </h2>
          <p className="text-[10px] font-mono text-[#5c674e]">
            {achievements.length} items · Scroll right to explore →
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleScrollLeft}
            className="w-7 h-7 flex items-center justify-center border border-[#3c4233] bg-[#efe9d9] text-[#3c4233] text-xs font-bold rounded-sm shadow-[1px_1px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none transition-all"
          >
            ←
          </button>
          <button
            onClick={handleScrollRight}
            className="w-7 h-7 flex items-center justify-center border border-[#3c4233] bg-[#efe9d9] text-[#3c4233] text-xs font-bold rounded-sm shadow-[1px_1px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none transition-all"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Cards Row */}
      <div
        ref={scrollRef}
        className="flex-1 flex items-center gap-5 overflow-x-auto overflow-y-hidden pb-2 pr-2 scrollbar-retro"
        style={{ scrollBehavior: 'smooth' }}
      >
        {achievements.map((ach) => (
          <div
            key={ach.id}
            onClick={handleCardClick}
            className="group flex-shrink-0 w-44 cursor-pointer transition-all duration-200 hover:-translate-y-3 hover:rotate-1"
            style={{ filter: 'drop-shadow(2px 2px 0px rgba(60,66,51,0.5))' }}
          >
            {/* Polaroid outer frame */}
            <div
              className="bg-white border-2 border-[#3c4233] rounded-sm overflow-hidden group-hover:shadow-[6px_6px_0px_rgba(60,66,51,0.8)] transition-shadow duration-200"
              style={{ boxShadow: '3px 3px 0px rgba(60,66,51,0.6)' }}
            >
              {/* Photo Canvas Area */}
              <div
                className="w-full h-28 border-b-2 border-[#3c4233] overflow-hidden relative"
                style={{ backgroundColor: ach.bgColor }}
              >
                <ach.Icon />
              </div>

              {/* Polaroid Caption Area */}
              <div className="p-2.5 bg-white space-y-1.5">
                {/* Color accent strip */}
                <div
                  className="h-0.5 w-8 rounded-full mb-2"
                  style={{ backgroundColor: ach.color }}
                />
                <p className="text-[11px] font-mono font-bold text-[#3c4233] leading-tight">
                  {ach.title}
                </p>
                <p className="text-[9px] font-mono text-[#5c674e] leading-snug">
                  {ach.subtitle}
                </p>
                <p className="text-[8px] font-mono text-[#7d8f6d] pt-0.5 border-t border-dashed border-[#dfd8be] leading-relaxed line-clamp-3">
                  {ach.desc}
                </p>
                {/* Date stamp */}
                <p
                  className="text-[8px] font-mono font-bold text-right pt-1"
                  style={{ color: ach.color }}
                >
                  {ach.date}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* End of cards fade placeholder */}
        <div className="flex-shrink-0 w-8 h-full" />
      </div>

    </div>
  );
}
