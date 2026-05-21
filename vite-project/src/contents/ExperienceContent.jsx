import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Search,
  Briefcase,
  Calendar,
  Award,
  Sparkles,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Clock,
  Building2
} from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export default function ExperienceContent() {
  const experiences = [
    {
      key: 'veritus',
      file: 'Veritus.html',
      title: 'Product & Growth Intern',
      company: 'Veritus',
      url: 'https://www.veritus.ai/',
      period: 'Jan 2026 - PRESENT',
      color: '#0e1e38',
      desc: 'Driving growth and product strategy for AI-powered compliance platforms. Bridging complex user requirements with advanced AI capabilities to enhance feature communications and accelerate product positioning and adoption.',
      points: [
        'Participated in product demos and solution discussions, bridging user requirements with product capabilities and improving feature communication.',
        'Analyzed engagement patterns and user responses to support data-driven decisions on product positioning and adoption.'
      ],
      tech: ['AI Solutions', 'Product Demos', 'Growth Strategy', 'Requirement Gathering', 'Engagement Analysis'],
      logoText: 'V'
    },
  ];

  // Navigation History States
  const [history, setHistory] = useState(['veritus']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const currentKey = history[historyIndex];

  const activeExp = experiences.find(e => e.key === currentKey) || experiences[0];

  // Reload Animation State
  const [isRefreshing, setIsRefreshing] = useState(false);
  // Liked/Endorsed state per job
  const [endorsed, setEndorsed] = useState({
    veritus: false,
    lead_dev: false
  });

  // Handle Tab / Page Navigation
  const navigateTo = (key, pushToHistory = true) => {
    if (key === currentKey) return;

    SoundManager.playClick();

    if (pushToHistory) {
      // Slice any "forward" history we navigated away from
      const nextHistory = history.slice(0, historyIndex + 1);
      setHistory([...nextHistory, key]);
      setHistoryIndex(nextHistory.length);
    }
  };

  // Back Navigation
  const handleBack = () => {
    if (historyIndex > 0) {
      SoundManager.playClick();
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Forward Navigation
  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      SoundManager.playClick();
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Refresh Navigation
  const handleRefresh = () => {
    SoundManager.playClick();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      SoundManager.playSuccess();
    }, 850);
  };

  // Endorse button trigger
  const handleEndorse = (key) => {
    if (endorsed[key]) return;
    SoundManager.playSuccess();
    setEndorsed(prev => ({
      ...prev,
      [key]: true
    }));
  };

  return (
    <div className="flex flex-col h-full font-sans select-text relative">

      {/* 🌼 Smiley Daisy Flower Sticker from Reference Photo */}
      <div className="absolute -top-11 right-20 z-40 select-none pointer-events-none drop-shadow-md transform hover:rotate-12 transition-transform duration-300 origin-bottom">
        <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
          {/* Petals */}
          <ellipse cx="50" cy="20" rx="9" ry="15" fill="#fcfcfc" stroke="#3c4233" strokeWidth="3" />
          <ellipse cx="50" cy="80" rx="9" ry="15" fill="#fcfcfc" stroke="#3c4233" strokeWidth="3" />
          <ellipse cx="20" cy="50" rx="15" ry="9" fill="#fcfcfc" stroke="#3c4233" strokeWidth="3" />
          <ellipse cx="80" cy="50" rx="15" ry="9" fill="#fcfcfc" stroke="#3c4233" strokeWidth="3" />

          <g transform="rotate(45 50 50)">
            <ellipse cx="50" cy="20" rx="9" ry="15" fill="#fcfcfc" stroke="#3c4233" strokeWidth="3" />
            <ellipse cx="50" cy="80" rx="9" ry="15" fill="#fcfcfc" stroke="#3c4233" strokeWidth="3" />
            <ellipse cx="20" cy="50" rx="15" ry="9" fill="#fcfcfc" stroke="#3c4233" strokeWidth="3" />
            <ellipse cx="80" cy="50" rx="15" ry="9" fill="#fcfcfc" stroke="#3c4233" strokeWidth="3" />
          </g>

          {/* Golden Center Disk */}
          <circle cx="50" cy="50" r="16" fill="#f6cc58" stroke="#3c4233" strokeWidth="3" />

          {/* Smiley Eyes */}
          <circle cx="44" cy="46" r="2.5" fill="#3c4233" />
          <circle cx="56" cy="46" r="2.5" fill="#3c4233" />

          {/* Smiley Mouth */}
          <path d="M43 53 Q50 58 57 53" stroke="#3c4233" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* 🌐 Browser Header (Coral Pink / Red) */}
      <div className="bg-[#f0706a] border-t border-x-2 border-[#3c4233] pt-2 px-3 flex items-end justify-between select-none shrink-0 relative rounded-t-sm shadow-[inset_-1px_1px_1px_rgba(255,255,255,0.4)]">

        {/* Browser Tabs Row */}
        <div className="flex items-end gap-0.5 max-w-[80%]">
          {experiences.map((exp) => {
            const isActive = activeExp.key === exp.key;
            return (
              <button
                key={exp.key}
                onClick={() => navigateTo(exp.key)}
                className={`relative h-7 px-4 font-mono text-[10px] md:text-xs cursor-pointer select-none transition-all duration-100 flex items-center justify-center -mb-[2px] ${isActive
                  ? 'z-20 text-[#3c4233] font-bold'
                  : 'z-10 text-[#5c674e] hover:text-[#3c4233]'
                  }`}
                style={{ width: '130px' }}
              >
                {/* SVG background polygon for realistic trapezoid shape matching reference image */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 28" preserveAspectRatio="none">
                  <polygon
                    points="8,1 92,1 99,28 1,28"
                    fill={isActive ? '#fbf6ed' : '#fcf9f2'}
                    stroke="#3c4233"
                    strokeWidth="1.8"
                  />
                  {isActive && (
                    // Covers the bottom border to blend with navigation bar
                    <line x1="2" y1="27.5" x2="98" y2="27.5" stroke="#fbf6ed" strokeWidth="3.5" />
                  )}
                </svg>

                {/* File Label Text */}
                <span className="relative z-10 truncate mt-0.5">{exp.file}</span>
              </button>
            );
          })}
        </div>

        {/* Mock Window Controls (Right Side) */}
        <div className="flex items-center gap-1.5 pb-2">
          <button className="w-5 h-5 flex items-center justify-center font-mono text-[10px] border border-[#3c4233] bg-[#efe9d9] text-[#3c4233] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] active:translate-y-px active:shadow-none font-bold">
            -
          </button>
          <button className="w-5 h-5 flex items-center justify-center font-mono text-[8px] border border-[#3c4233] bg-[#efe9d9] text-[#3c4233] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] active:translate-y-px active:shadow-none font-bold">
            ⬜
          </button>
          <button className="w-5 h-5 flex items-center justify-center font-mono text-[9px] border border-[#3c4233] bg-[#efe9d9] text-[#3c4233] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] active:translate-y-px active:shadow-none font-bold">
            X
          </button>
        </div>
      </div>

      {/* 🧭 Browser Navigation & Address Bar (Light Sand Band) */}
      <div className="bg-[#efe5d5] border-x-2 border-b-2 border-[#3c4233] p-2 flex items-center gap-2 select-none shrink-0 shadow-sm z-10">

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleBack}
            disabled={historyIndex === 0}
            className={`p-1 border border-[#3c4233] rounded-sm transition-all shadow-[1px_1px_0px_rgba(0,0,0,0.4)] flex items-center justify-center ${historyIndex === 0
              ? 'bg-[#e2dacb] text-gray-400 opacity-60 cursor-not-allowed shadow-none'
              : 'bg-[#fcf9f2] text-[#3c4233] hover:bg-[#efe9d9] active:translate-y-px active:shadow-none'
              }`}
            title="Go Back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex === history.length - 1}
            className={`p-1 border border-[#3c4233] rounded-sm transition-all shadow-[1px_1px_0px_rgba(0,0,0,0.4)] flex items-center justify-center ${historyIndex === history.length - 1
              ? 'bg-[#e2dacb] text-gray-400 opacity-60 cursor-not-allowed shadow-none'
              : 'bg-[#fcf9f2] text-[#3c4233] hover:bg-[#efe9d9] active:translate-y-px active:shadow-none'
              }`}
            title="Go Forward"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-1 border border-[#3c4233] rounded-sm bg-[#fcf9f2] text-[#3c4233] hover:bg-[#efe9d9] active:translate-y-px active:shadow-none shadow-[1px_1px_0px_rgba(0,0,0,0.4)] flex items-center justify-center"
            title="Refresh Page"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Search & URL Input Address Bar */}
        <div className="flex-1 flex items-center border border-[#3c4233] bg-[#fbfbf8] rounded-sm overflow-hidden h-7">
          {/* Yellow Search Prefix Box */}
          <div className="bg-[#dfb455] border-r border-[#3c4233] h-full px-2 flex items-center justify-center shrink-0">
            <Search className="w-3.5 h-3.5 text-[#3c4233]" />
          </div>
          {/* Dynamic URL Field */}
          <div className="flex-1 px-3 text-[10px] md:text-xs font-mono text-[#5c674e] truncate tracking-wide select-all pointer-events-auto leading-none pt-0.5">
            {activeExp.url}
          </div>
        </div>

        {/* Small TTY Security Badge */}
        <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono font-bold bg-[#efe9d9] border border-[#3c4233] px-1.5 py-0.5 rounded-sm text-[#5c674e]">
          <ShieldCheck className="w-3 h-3 text-[#5c674e]" /> SECURE
        </div>

      </div>

      {/* 📄 Browser Page Content Area */}
      <div className="flex-1 border-x-2 border-b-2 border-[#3c4233] bg-[#fbf6ed] p-4 md:p-5 flex flex-col min-h-0 relative">

        {/* Loading Overlay when Refreshing */}
        {isRefreshing && (
          <div className="absolute inset-0 bg-[#fbf6ed]/85 z-50 flex flex-col items-center justify-center gap-2">
            <div className="w-7 h-7 border-2 border-dashed border-[#dfb455] rounded-full animate-spin"></div>
            <span className="font-mono text-xs text-[#5c674e] animate-pulse">Retrieving manifest buffer...</span>
          </div>
        )}

        <div className="flex-1 overflow-auto pr-1 scrollbar-retro space-y-5 text-left select-text">

          {/* Webpage Header Banner */}
          <div className="border-b-2 border-dashed border-[#dfd8be] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-sm bg-[#3c4233] text-[#fbf6ed] font-mono font-bold flex items-center justify-center text-xs select-none">
                  {activeExp.logoText}
                </span>
                <h3 className="text-lg md:text-xl font-bold font-mono text-[#3c4233] uppercase">
                  {activeExp.title}
                </h3>
              </div>
              <p className="text-xs text-[#5c674e] font-mono flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold underline">{activeExp.company}</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{activeExp.period}</span>
              </p>
            </div>

            {/* Status Stamp Seal */}
            <div className="shrink-0 flex items-center">
              <span className={`px-2.5 py-1 text-[10px] font-mono border-2 rounded-sm font-bold uppercase select-none tracking-wider ${activeExp.key === 'lead_dev'
                ? 'border-[#7d8f6d] bg-[#f2f6ee] text-[#5c674e] rotate-[-2deg]'
                : 'border-[#dfb455] bg-[#fbf9f2] text-[#cda43f] rotate-[2deg]'
                }`}>
                {activeExp.key === 'lead_dev' ? '● Live Log Active' : '✓ Archive Seal'}
              </span>
            </div>
          </div>

          {/* Description Block */}
          <div className="bg-[#fcf9f2] border border-[#3c4233] p-3.5 rounded-sm shadow-[1px_1px_0px_0px_rgba(60,66,51,1)]">
            <p className="text-xs md:text-sm leading-relaxed text-[#3c4233]">
              {activeExp.desc}
            </p>
          </div>

          {/* Accomplishments checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#5c674e] uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#3c4233]" /> Performance_Manifest.txt
            </h4>

            <div className="space-y-2.5">
              {activeExp.points.map((pt, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  {/* Decorative Retro Bullet Icon */}
                  <span className="w-4 h-4 rounded-sm border border-[#3c4233] bg-[#efe9d9] flex items-center justify-center text-[10px] text-[#e6a745] font-bold shrink-0 mt-0.5 select-none shadow-[1px_1px_0px_rgba(0,0,0,0.3)]">
                    ★
                  </span>
                  <p className="text-xs md:text-sm leading-relaxed text-[#3c4233]">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Tech Stack Used */}
          <div className="space-y-2.5 border-t border-dashed border-[#dfd8be] pt-4">
            <h4 className="text-xs font-mono font-bold text-[#5c674e] uppercase tracking-wider">
              System Assets & Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeExp.tech.map((techItem) => (
                <span
                  key={techItem}
                  className="px-2.5 py-1 text-[10px] md:text-xs font-mono bg-[#efe9d9] text-[#3c4233] border border-[#3c4233] rounded-sm shadow-[1px_1px_0px_rgba(60,66,51,1)] flex items-center gap-1 hover:bg-[#e6dfcb] transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfb455]"></span>
                  {techItem}
                </span>
              ))}
            </div>
          </div>

          {/* Endorsement Interactive Stamp Button */}
          <div className="pt-3 border-t border-dashed border-[#dfd8be] flex justify-end">
            <button
              onClick={() => handleEndorse(activeExp.key)}
              disabled={endorsed[activeExp.key]}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-sm border border-[#3c4233] flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_rgba(60,66,51,1)] ${endorsed[activeExp.key]
                ? 'bg-[#7d8f6d] text-[#fbf6ed] shadow-none translate-x-px translate-y-px opacity-90 cursor-default'
                : 'bg-[#dfb455] text-[#3c4233] hover:bg-[#d4ac50] active:translate-y-px active:shadow-none'
                }`}
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              {endorsed[activeExp.key] ? 'ENDORSED!' : 'ENDORSE THIS ROLE.EXE'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
