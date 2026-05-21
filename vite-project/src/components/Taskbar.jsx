import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Settings, 
  Clock, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Calendar as CalendarIcon,
  ChevronUp
} from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export default function Taskbar({
  activeTheme,
  onChangeTheme,
  soundMuted,
  onToggleSound,
  onOpenWindow,
  windows = {},
  highestZIndex,
  minimizeWindow,
  restoreWindow,
  focusWindow
}) {
  const openWindows = Object.values(windows).filter(w => w.isOpen);
  const [time, setTime] = useState('');
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Live system clock interval
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => {
    SoundManager.playClick();
    setShowStartMenu(!showStartMenu);
    if (showCalendar) setShowCalendar(false);
  };

  const handleClockClick = () => {
    SoundManager.playClick();
    setShowCalendar(!showCalendar);
    if (showStartMenu) setShowStartMenu(false);
  };

  const handleSelectTheme = (themeName) => {
    SoundManager.playSuccess();
    onChangeTheme(themeName);
    setShowStartMenu(false);
  };

  const handleToggleAudio = () => {
    onToggleSound();
    // Short test chirp if unmuting
    setTimeout(() => {
      SoundManager.playClick();
    }, 50);
  };

  // Direct contact compose open
  const handleMailShortcut = (e) => {
    e.preventDefault();
    SoundManager.playOpen();
    if (onOpenWindow) onOpenWindow('contact');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#efe9d9]/80 backdrop-blur-md border-t-2 border-[#3c4233] px-3 flex items-center justify-between z-[999] select-none font-mono shadow-[0_-2px_10px_rgba(60,66,51,0.06)]">
      
      {/* 1. Start Button & System Drawer */}
      <div className="relative shrink-0">
        <button
          onClick={handleStartClick}
          className={`h-8 px-3 border border-[#3c4233] text-xs font-bold flex items-center gap-1.5 rounded-sm select-none transition-all ${
            showStartMenu
              ? 'bg-[#5c674e] border-[#3c4233] text-[#fdfbf7] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]'
              : 'bg-[#efe9d9] border-[#3c4233] text-[#3c4233] shadow-[1.5px_1.5px_0px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none'
          }`}
        >
          <Settings className={`w-3.5 h-3.5 ${showStartMenu ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          <span>START</span>
          <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-200 ${showStartMenu ? 'rotate-180' : ''}`} />
        </button>

        {/* Start Drawer Menu popup */}
        {showStartMenu && (
          <div className="absolute bottom-11 left-0 w-56 bg-[#efe9d9] border-2 border-[#3c4233] rounded-sm shadow-[4px_-4px_0px_0px_rgba(60,66,51,0.9)] overflow-hidden flex flex-col pointer-events-auto">
            {/* Start Menu Sidebar banner */}
            <div className="bg-[#5c674e] text-[#fdfbf7] text-[10px] font-bold py-1.5 px-3 border-b border-[#3c4233] flex justify-between select-none">
              <span>SYSTEM CONTROL</span>
              <span>v1.0.0</span>
            </div>

            {/* Sound Mute Settings */}
            <div className="p-2 border-b border-[#3c4233]/20">
              <button
                onClick={handleToggleAudio}
                className="w-full text-left text-xs p-2 flex items-center justify-between hover:bg-[#dfd8be] rounded-sm transition-all"
              >
                <span className="flex items-center gap-2">
                  {soundMuted ? <VolumeX className="w-4 h-4 text-[#cc6a5c]" /> : <Volume2 className="w-4 h-4 text-[#5c674e]" />}
                  <span>System Sound:</span>
                </span>
                <span className="font-bold text-[10px] text-[#3c4233]">
                  {soundMuted ? 'MUTED' : 'ACTIVE'}
                </span>
              </button>
            </div>

            {/* Desktop Theme Selection */}
            <div className="p-2">
              <div className="text-[9px] text-[#5c674e] font-bold px-2 py-1 select-none">
                DESKTOP BACKGROUNDS
              </div>
              <div className="space-y-1 mt-1">
                {[
                  { id: 'grid', label: 'Vintage Grid' },
                  { id: 'stripes', label: 'Academic Sage' },
                  { id: 'dots', label: 'Muted Sand' },
                  { id: 'dark', label: 'Amber Terminal' }
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`w-full text-left text-xs px-2 py-1.5 rounded-sm flex items-center justify-between transition-all ${
                      activeTheme === theme.id
                        ? 'bg-[#5c674e] text-[#fdfbf7] font-bold'
                        : 'hover:bg-[#dfd8be] text-[#3c4233]'
                    }`}
                  >
                    <span>{theme.label}</span>
                    {activeTheme === theme.id && <span className="text-[10px]">&bull;</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Central Dock: Active Applications */}
      <div className="flex-1 flex items-center gap-1.5 md:gap-2 px-4 overflow-x-auto scrollbar-none pointer-events-auto">
        {openWindows.map(window => {
          // If it's the top window AND it's not minimized, it's the "active" one
          const isActive = window.zIndex === highestZIndex && !window.isMinimized;
          
          return (
            <button
              key={window.id}
              onClick={() => {
                SoundManager.playClick();
                if (isActive) {
                  minimizeWindow(window.id);
                } else {
                  if (window.isMinimized) {
                    restoreWindow(window.id);
                  } else {
                    focusWindow(window.id);
                  }
                }
              }}
              className={`h-8 px-3 border border-[#3c4233] rounded-sm text-xs flex items-center gap-2 transition-all max-w-[160px] truncate shrink-0 ${
                isActive
                  ? 'bg-[#d5cdb2] text-[#3c4233] font-bold shadow-[inset_1.5px_1.5px_3px_rgba(0,0,0,0.15)]'
                  : 'bg-[#efe9d9] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb]'
              }`}
              title={window.title}
            >
              <span className="truncate">{window.title.split('\\').pop()}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Terminal Snippet */}
      <div className="shrink-0 flex items-center pr-2 pl-4 border-l border-[#3c4233]/20 font-mono text-[10px] text-[#5c674e] leading-tight select-none">
        <div>
          <span className="font-bold text-[#cc6a5c]">{'>_ '}</span>building my story<br/>
          &nbsp;&nbsp;&nbsp;one line at a time <span className="animate-pulse bg-[#5c674e]/50 w-1.5 h-2.5 inline-block align-middle ml-0.5" />
        </div>
      </div>

    </div>
  );
}
