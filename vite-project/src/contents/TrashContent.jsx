import React, { useState } from 'react';
import { Trash2, FileWarning, ShieldAlert, Sparkles, Terminal, FileText, Ban } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export default function TrashContent() {
  const trashFiles = [
    {
      id: 'imposter',
      name: 'Imposter_Syndrome.exe',
      title: 'CRITICAL ERROR: Sector Failure',
      body: 'Action forbidden! System detected Imposter_Syndrome.exe trying to execute. Fortunately, our self-confidence firewall intercepted it and deleted it permanently. Boosted motivation levels by 500%!',
      sound: 'error',
      icon: ShieldAlert,
      badge: 'DELETED'
    },
    {
      id: 'perfect',
      name: 'Perfect_Code.dat',
      title: 'File Contents: Perfect_Code.dat',
      body: 'This document contains 0 bytes. Why? Because perfect code does not exist, and embracing imperfect iteration is where the magic happens! Write code, break it, fix it, ship it.',
      sound: 'success',
      icon: Sparkles,
      badge: 'EMPTY'
    },
    {
      id: 'boring',
      name: 'Boring_Resumes.doc',
      title: 'Notice: Document Obsolete',
      body: 'Why read a plain black-and-white static text sheet when you are literally navigating through an interactive, vintage-notebook retro laptop operating system? Close this and continue exploring the folders!',
      sound: 'click',
      icon: FileText,
      badge: 'ARCHIVED'
    },
    {
      id: 'old_js',
      name: 'Boring_Meetings.lnk',
      title: 'Alert: Item Purged',
      body: 'This link has been redirected to: "Coding alone with coffee, lo-fi beats, and absolute peace". Much better for system memory throughput!',
      sound: 'success',
      icon: Ban,
      badge: 'PURGED'
    }
  ];

  const [activeItem, setActiveItem] = useState(null);

  const openFile = (file) => {
    if (file.sound === 'error') {
      SoundManager.playError();
    } else if (file.sound === 'success') {
      SoundManager.playSuccess();
    } else {
      SoundManager.playClick();
    }
    setActiveItem(file);
  };

  return (
    <div className="space-y-6 font-sans relative">

      {/* Visual top bar of trash bin */}
      <div className="bg-[#efe9d9] border border-[#3c4233] px-3 py-2.5 rounded-sm flex items-center justify-between text-xs font-mono select-none">
        <span className="flex items-center gap-1.5 font-bold text-[#5c674e]">
          <Trash2 className="w-4 h-4 text-[#3c4233]" /> RECYCLER_DIRECTORY
        </span>
        <span className="text-[#cc6a5c] font-bold">WARNING: CORRUPTED DATA SAMPLES</span>
      </div>

      {/* Grid of Trash Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {trashFiles.map((file) => {
          const FileIcon = file.icon;
          return (
            <button
              key={file.id}
              onDoubleClick={() => openFile(file)}
              onClick={() => openFile(file)} // Mobile compatibility: single click to view
              className="border border-dashed border-[#3c4233]/40 bg-[#fdfbf7]/50 hover:bg-[#fcf9f2] hover:border-[#3c4233] p-4 rounded-sm transition-all duration-100 flex flex-col items-center gap-2 group text-center pointer-events-auto"
            >
              <div className="w-10 h-10 bg-[#dfd8be] border border-[#3c4233]/40 rounded-sm flex items-center justify-center text-[#5c674e] group-hover:bg-[#efe9d9] group-hover:border-[#3c4233] transition-colors relative shadow-sm">
                <FileIcon className="w-5 h-5 text-[#cc6a5c] group-hover:scale-105 transition-transform" />
                <span className="absolute -top-1.5 -right-1.5 text-[8px] px-1 bg-[#cc6a5c] text-[#fdfbf7] font-mono border border-[#3c4233]/50 scale-90 rounded-sm">
                  {file.badge}
                </span>
              </div>
              <span className="font-mono text-[10px] md:text-xs text-[#3c4233] truncate w-full">
                {file.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Double click instruction helper */}
      <div className="text-[10px] font-mono text-[#5c674e]/80 text-center italic select-none">
        * Mobile: Tap once to execute. Desktop: Double-click to launch corrupted bin payloads.
      </div>

      {/* Retro Alert Dialogue popup modal */}
      {activeItem && (
        <div className="absolute inset-0 bg-[#3c4233]/15 flex items-center justify-center p-4 z-50 pointer-events-auto">
          <div className="bg-[#efe9d9] border-2 border-[#3c4233] w-full max-w-sm rounded-sm shadow-[4px_4px_0px_0px_rgba(60,66,51,1)] overflow-hidden">
            {/* Header */}
            <div className={`text-[#f2efe4] font-mono text-[11px] font-bold px-2 py-1 flex items-center justify-between border-b-2 border-[#3c4233] ${activeItem.sound === 'error' ? 'bg-[#cc6a5c]' : 'bg-[#5c674e]'
              }`}>
              <span className="flex items-center gap-1">
                <FileWarning className="w-3.5 h-3.5" /> {activeItem.title}
              </span>
              <button
                onClick={() => {
                  SoundManager.playClick();
                  setActiveItem(null);
                }}
                className="w-4 h-4 bg-[#eae2d3] border border-[#3c4233] text-[9px] text-[#3c4233] flex items-center justify-center hover:bg-[#dfd7c6] rounded-sm shadow-sm"
              >
                X
              </button>
            </div>
            {/* Body */}
            <div className="p-4 flex gap-3.5 items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-[#3c4233] shadow-sm select-none ${activeItem.sound === 'error' ? 'bg-[#cc6a5c] text-[#f2efe4]' : 'bg-[#e6a745] text-[#3c4233]'
                }`}>
                !
              </div>
              <div className="font-mono text-xs text-[#3c4233] leading-relaxed select-text text-left">
                {activeItem.body}
              </div>
            </div>
            {/* Footer */}
            <div className="bg-[#dfd8be] border-t border-[#3c4233]/30 px-3 py-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  SoundManager.playClick();
                  setActiveItem(null);
                }}
                className="px-5 py-1 text-xs font-mono font-bold retro-btn rounded-sm"
              >
                [ ACKNOWLEDGE ]
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
