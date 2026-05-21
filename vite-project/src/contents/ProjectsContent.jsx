import React, { useState } from 'react';
import { Folder, FolderOpen, FileText, Globe, Terminal, ArrowRight, Monitor } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export default function ProjectsContent() {
  // Categories and projects data
  const projectCategories = [
    { id: 'fullstack', name: 'FullStack.fld', icon: Folder }
  ];

  const projectsData = {
    fullstack: [
      {
        id: 'videosync',
        name: 'videosync.exe',
        title: 'VideoSync',
        tagline: 'Real-time collaborative synchronized video player & chat room',
        desc: 'A robust full-stack co-watching application allowing multiple users to stream and control video playback in perfect synchronization. Implements WebSockets for instantaneous, low-latency room syncing (play, pause, seek actions) and features an integrated real-time text chat so friends can interact seamlessly while watching.',
        tech: ['React.js', 'Node.js', 'Express', 'Socket.io', 'HTML5 Video', 'Tailwind CSS'],
        link: 'https://github.com/Hinduja-25/VideoSync',
        github: 'https://github.com/Hinduja-25/VideoSync',
        color: '#4ea3a1'
      },
      {
        id: 'wanderlust',
        name: 'wanderlust.exe',
        title: 'Wanderlust',
        tagline: 'Full-featured travel booking & lodging marketplace dashboard',
        desc: 'A complete end-to-end accommodation rental platform inspired by Airbnb. Features multi-user authentication, cloud-hosted image uploading, interactive geological map integrations for listing locations, and robust database CRUD models for user reviews, listings, and ratings.',
        tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'EJS Templates', 'Mapbox API', 'Bootstrap'],
        link: 'https://github.com/Hinduja-25/Wanderlust',
        github: 'https://github.com/Hinduja-25/Wanderlust',
        color: '#e67e22'
      }
    ],
  };


  const [activeCategory, setActiveCategory] = useState('fullstack');
  const [activeProject, setActiveProject] = useState(projectsData.fullstack[0]);

  const selectCategory = (catId) => {
    SoundManager.playClick();
    setActiveCategory(catId);
    setActiveProject(projectsData[catId][0]);
  };

  const selectProject = (proj) => {
    SoundManager.playClick();
    setActiveProject(proj);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6 font-sans">

      {/* Left Sidebar: File Explorer Directories */}
      <div className="w-full md:w-56 shrink-0 flex flex-col gap-4">
        <div className="border border-[#3c4233] bg-[#fcf9f2] p-3 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)]">
          <div className="text-[10px] font-mono text-[#5c674e] font-bold border-b border-[#dfd8be] pb-1.5 mb-2 select-none uppercase tracking-wider">
            Folders Directory
          </div>
          <div className="space-y-1.5">
            {projectCategories.map((cat) => {
              const IsActive = activeCategory === cat.id;
              const IconComponent = IsActive ? FolderOpen : Folder;
              return (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(cat.id)}
                  className={`w-full text-left font-mono text-xs px-2.5 py-2 border rounded-sm transition-all duration-100 flex items-center gap-2 ${IsActive
                    ? 'bg-[#5c674e] border-[#3c4233] text-[#fdfbf7] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] font-semibold'
                    : 'bg-[#efe9d9] border-[#3c4233] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none'
                    }`}
                >
                  <IconComponent className={`w-4 h-4 shrink-0 ${IsActive ? 'text-[#e6a745]' : 'text-[#5c674e]'}`} />
                  <span className="truncate">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* File items inside directory */}
        <div className="border border-[#3c4233] bg-[#fcf9f2] p-3 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)] flex-1 min-h-[140px] md:min-h-0">
          <div className="text-[10px] font-mono text-[#5c674e] font-bold border-b border-[#dfd8be] pb-1.5 mb-2 select-none uppercase tracking-wider flex justify-between">
            <span>Files List</span>
            <span className="opacity-75">{projectsData[activeCategory].length} Items</span>
          </div>
          <div className="space-y-1.5">
            {projectsData[activeCategory].map((proj) => {
              const IsActive = activeProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => selectProject(proj)}
                  className={`w-full text-left font-mono text-xs px-2 py-1.5 border rounded-sm transition-all duration-100 flex items-center gap-2 ${IsActive
                    ? 'bg-[#e6a745] border-[#3c4233] text-[#3c4233] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] font-semibold'
                    : 'bg-[#fdfbf7] border-[#3c4233] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] hover:bg-[#efe9d9] active:translate-y-px active:shadow-none'
                    }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#5c674e] shrink-0" />
                  <span className="truncate">{proj.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Explorer Window: Details Viewer */}
      <div className="flex-1 border-2 border-[#3c4233] bg-[#fdfbf7] rounded-sm p-4 md:p-5 shadow-[4px_4px_0px_0px_rgba(60,66,51,0.9)] flex flex-col min-w-0">

        {/* Mock vintage monitor header */}
        <div className="flex justify-between items-center text-xs font-mono border-b border-[#dfd8be] pb-3 mb-4 select-none shrink-0">
          <span className="text-[#5c674e] font-bold flex items-center gap-1.5">
            <Monitor className="w-4 h-4 text-[#3c4233]" /> PREVIEW_TERMINAL.EXE
          </span>
          <span className="text-[#e6a745] bg-[#3c4233] px-2 py-0.5 rounded-sm font-semibold text-[10px]">
            ACTIVE SOURCE
          </span>
        </div>

        {/* Project View Detail */}
        <div className="flex-1 space-y-4 md:space-y-5 overflow-auto pr-1 scrollbar-retro">
          <div className="border-b border-dashed border-[#dfd8be] pb-3">
            <h3 className="text-xl font-bold text-[#3c4233] font-mono uppercase tracking-tight">
              {activeProject.title}
            </h3>
            <p className="text-xs text-[#5c674e] font-mono mt-0.5 italic">
              {activeProject.tagline}
            </p>
          </div>

          {/* Styled CSS Retro CRT Screen Graphic Mockup */}
          <div
            style={{ borderColor: activeProject.color }}
            className="w-full h-36 md:h-44 bg-[#23291b] border-4 rounded-sm shadow-inner relative overflow-hidden flex flex-col items-center justify-center p-4 crt-scanlines"
          >
            <div className="absolute top-2 left-3 font-mono text-[9px] text-[#7d8f6d] tracking-widest select-none uppercase">
              // RAM BUFFER: 0x88F0B
            </div>

            <div className="text-center space-y-1.5 z-20">
              <span
                style={{ color: activeProject.color }}
                className="text-xs md:text-sm font-mono font-bold tracking-widest block uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              >
                ::: {activeProject.name} :::
              </span>
              <span className="text-[10px] md:text-xs text-[#a4ba8d] font-mono max-w-xs block leading-normal line-clamp-2 select-none">
                {activeProject.tagline}
              </span>
            </div>

            {/* Retro grid lines drawing in monitor */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40"></div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-mono font-bold text-[#5c674e] uppercase flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> Project_Manifest.txt
            </h4>
            <p className="text-xs md:text-sm leading-relaxed text-[#3c4233] bg-[#fcf9f2] border border-[#3c4233] p-3 rounded-sm font-sans">
              {activeProject.desc}
            </p>
          </div>

          {/* Tech tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-[#5c674e] uppercase">
              Dependencies & Tech
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] md:text-xs font-mono bg-[#efe9d9] text-[#3c4233] border border-[#3c4233] rounded-sm shadow-[1px_1px_0px_0px_rgba(60,66,51,1)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Links */}
        <div className="mt-4 pt-3 border-t border-[#dfd8be] flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={activeProject.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => SoundManager.playSuccess()}
            className="flex-1 retro-btn text-xs font-mono py-2 rounded-sm flex items-center justify-center gap-1.5 text-center font-bold"
          >
            <Globe className="w-4 h-4" /> LAUNCH_PROJECT.EXE
          </a>
          <a
            href={activeProject.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => SoundManager.playSuccess()}
            className="flex-1 retro-btn text-xs font-mono py-2 rounded-sm flex items-center justify-center gap-1.5 text-center font-bold"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current stroke-none">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>VIEW_SOURCE.BAT</span>
          </a>
        </div>

      </div>

    </div>
  );
}
