import React, { useState, useEffect } from 'react';
import { X, Minus, Square, ChevronRight } from 'lucide-react';
import { usePointerDrag } from '../hooks/usePointerDrag';
import { SoundManager } from '../utils/SoundManager';

export default function Window({
  id,
  title,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  initialX = 80,
  initialY = 80,
  defaultWidth = '620px',
  defaultHeight = '480px',
  children
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMinimized, setHasMinimized] = useState(false);

  useEffect(() => {
    if (isMinimized) setHasMinimized(true);
  }, [isMinimized]);

  // Check if screen is mobile size to adjust drag behaviour
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { x, y, onPointerDown } = usePointerDrag({
    initialX: isMobile ? 0 : initialX,
    initialY: isMobile ? 0 : initialY,
    onDragStart: () => {
      if (onFocus) onFocus();
      SoundManager.playClick();
    }
  });

  if (!isOpen) return null;

  // Toggle maximize
  const handleToggleMaximize = () => {
    setIsMaximized(!isMaximized);
    SoundManager.playClick();
    if (onFocus) onFocus();
  };

  // Window styling based on responsive state & maximize status
  const getWindowStyles = () => {
    if (isMobile) {
      // On mobile, window fills the content area between header and taskbar
      return {
        zIndex: zIndex,
        position: 'fixed',
        left: '12px',
        right: '12px',
        top: '72px',
        bottom: '84px',
        width: 'auto',
        height: 'auto',
      };
    }

    if (isMaximized) {
      return {
        zIndex: zIndex,
        position: 'absolute',
        left: '20px',
        top: '60px',
        right: '20px',
        bottom: '96px',
        width: 'auto',
        height: 'auto',
      };
    }

    return {
      zIndex: zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      transform: `translate3d(${x}px, ${y}px, 0)`,
      width: defaultWidth,
      height: defaultHeight,
    };
  };

  const windowStyles = getWindowStyles();

  const animationClass = isMinimized 
    ? 'animate-window-minimize pointer-events-none' 
    : (hasMinimized ? 'animate-window-restore pointer-events-auto' : 'animate-window-open pointer-events-auto');

  return (
    <div
      style={windowStyles}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      className={`bg-[#fdfbf7] border-2 border-[#3c4233] flex flex-col rounded-sm overflow-hidden select-none transition-shadow duration-150 shadow-[4px_4px_0px_0px_rgba(60,66,51,0.9)] md:shadow-[6px_6px_0px_0px_rgba(60,66,51,0.9)] ${animationClass}`}
    >
      {/* Title Bar */}
      <div
        onPointerDown={isMobile || isMaximized ? onFocus : onPointerDown}
        className={`bg-[#5c674e] text-[#f2efe4] px-3 py-2 flex items-center justify-between border-b-2 border-[#3c4233] cursor-grab active:cursor-grabbing font-mono text-xs select-none`}
      >
        <div className="flex items-center gap-2 truncate">
          <ChevronRight className="w-3.5 h-3.5 text-[#d3cbbe]" />
          <span className="font-semibold tracking-wide truncate">{title}</span>
        </div>
        
        {/* Window controls */}
        <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              SoundManager.playClick();
              if (onMinimize) onMinimize();
            }}
            className="w-5 h-5 bg-[#eae2d3] border border-[#3c4233] text-[#3c4233] flex items-center justify-center hover:bg-[#dfd7c6] transition-colors rounded-sm shadow-[1px_1px_0px_0px_rgba(60,66,51,1)]"
            title="Minimize"
          >
            <Minus className="w-3 h-3 stroke-[2.5]" />
          </button>
          
          {/* Maximize Button (Desktop only) */}
          {!isMobile && (
            <button
              onClick={handleToggleMaximize}
              className="w-5 h-5 bg-[#eae2d3] border border-[#3c4233] text-[#3c4233] flex items-center justify-center hover:bg-[#dfd7c6] transition-colors rounded-sm shadow-[1px_1px_0px_0px_rgba(60,66,51,1)]"
              title={isMaximized ? "Restore Window" : "Maximize Window"}
            >
              <Square className="w-2.5 h-2.5 stroke-[2.5]" />
            </button>
          )}

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              SoundManager.playClose();
              onClose();
            }}
            className="w-5 h-5 bg-[#cc6a5c] border border-[#3c4233] text-[#f2efe4] flex items-center justify-center hover:bg-[#b85b4d] transition-colors rounded-sm shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] font-bold ml-0.5"
            title="Close Window"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Window Workspace/Content */}
      <div className="flex-1 overflow-auto p-4 md:p-6 text-[#3c4233] font-sans pointer-events-auto relative scrollbar-retro">
        {children}
      </div>

      {/* Optional window status bar */}
      <div className="bg-[#f0ebd9] border-t border-[#d6cea6] px-3 py-1 flex items-center justify-between text-[10px] font-mono text-[#626858] select-none select-none">
        <span>System Status: Operational</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
