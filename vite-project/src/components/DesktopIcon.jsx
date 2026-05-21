import React from 'react';
import { SoundManager } from '../utils/SoundManager';

export default function DesktopIcon({
  id,
  name,
  label,
  iconType = 'folder',
  onClick,
  isSelected,
  onSelect
}) {

  // Handlers for single click (highlighting) and double click (opening)
  const handlePointerDown = (e) => {
    e.stopPropagation();
    SoundManager.playClick();
    if (onSelect) onSelect();
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    SoundManager.playOpen();
    if (onClick) onClick();
  };

  // Helper to render customized retro SVGs directly
  const renderRetroSVG = () => {
    if (iconType === 'trash') {
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-sm select-none" fill="none">
          {/* Lid */}
          <rect x="12" y="10" width="24" height="4" fill="#cc6a5c" stroke="#3c4233" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 20 10 L 22 6 L 26 6 L 28 10 Z" fill="#cc6a5c" stroke="#3c4233" strokeWidth="2" strokeLinejoin="round" />
          {/* Bin Base */}
          <path d="M 14 14 L 16 42 L 32 42 L 34 14 Z" fill="#dfd8be" stroke="#3c4233" strokeWidth="2" strokeLinejoin="round" />
          {/* Grooves */}
          <line x1="20" y1="20" x2="20" y2="36" stroke="#3c4233" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="20" x2="24" y2="36" stroke="#3c4233" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="20" x2="28" y2="36" stroke="#3c4233" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    if (iconType === 'profile') {
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-sm select-none" fill="none">
          {/* Photo frame card */}
          <rect x="8" y="6" width="32" height="36" rx="2" fill="#efe9d9" stroke="#3c4233" strokeWidth="2" />
          <rect x="12" y="10" width="24" height="20" rx="1" fill="#fdfbf7" stroke="#3c4233" strokeWidth="1.5" />
          {/* Small face silhouette */}
          <circle cx="24" cy="18" r="5" fill="#5c674e" />
          <path d="M 16 28 C 16 24, 32 24, 32 28 Z" fill="#5c674e" stroke="#3c4233" strokeWidth="1.5" />
          {/* Little lines at bottom */}
          <line x1="12" y1="34" x2="36" y2="34" stroke="#3c4233" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="38" x2="28" y2="38" stroke="#3c4233" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    // Default Folder Icon
    return (
      <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-sm select-none" fill="none">
        {/* Back Tab */}
        <path d="M 4 12 C 4 10, 6 8, 8 8 L 18 8 L 22 14 L 40 14 C 42 14, 44 16, 44 18 L 44 40 C 44 42, 42 44, 40 44 L 8 44 C 6 44, 4 42, 4 40 Z" fill="#dfd8be" stroke="#3c4233" strokeWidth="2" strokeLinejoin="round" />
        {/* Front flap folder */}
        <path d="M 4 16 C 4 15, 5 14, 6 14 L 42 14 C 43 14, 44 15, 44 16 L 44 40 C 44 42, 42 44, 40 44 L 8 44 C 6 44, 4 42, 4 40 Z" fill="#e6a745" stroke="#3c4233" strokeWidth="2" strokeLinejoin="round" />
        {/* Interior Document sheet peaking out */}
        <path d="M 12 18 L 36 18 L 36 28 L 12 28 Z" fill="#fdfbf7" stroke="#3c4233" strokeWidth="1.5" />
        <line x1="16" y1="22" x2="32" y2="22" stroke="#3c4233" strokeWidth="1" />
        <line x1="16" y1="25" x2="28" y2="25" stroke="#3c4233" strokeWidth="1" />
      </svg>
    );
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={(e) => {
        // Mobile single tap to open immediately for better mobile accessibility,
        // while also selecting the item
        e.preventDefault();
        SoundManager.playOpen();
        if (onSelect) onSelect();
        if (onClick) onClick();
      }}
      className="w-[84px] py-2 flex flex-col items-center gap-1.5 cursor-pointer rounded-md select-none group transition-transform active:scale-95"
    >
      {/* Icon Frame */}
      <div 
        className={`p-1.5 rounded-md transition-all border ${
          isSelected 
            ? 'bg-[#5c674e]/15 border-[#3c4233] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]' 
            : 'border-transparent group-hover:bg-[#dfd8be]/20'
        }`}
      >
        {renderRetroSVG()}
      </div>

      {/* Label Text */}
      <span 
        className={`font-mono text-[10px] md:text-xs text-center px-1.5 py-0.5 rounded-sm select-none break-words max-w-full leading-tight border transition-colors ${
          isSelected
            ? 'bg-[#3c4233] border-[#3c4233] text-[#fdfbf7] font-semibold'
            : 'bg-[#fdfbf7] border-[#3c4233] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,0.85)]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
