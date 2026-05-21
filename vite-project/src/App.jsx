import React, { useState, useEffect } from 'react';
import { Terminal, Calendar, Monitor, VolumeX, Sparkles, Coffee } from 'lucide-react';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import ScrapbookHero from './components/ScrapbookHero';

// Content Views
import AboutContent from './contents/AboutContent';
import SkillsContent from './contents/SkillsContent';
import ProjectsContent from './contents/ProjectsContent';
import ExperienceContent from './contents/ExperienceContent';
import ContactContent from './contents/ContactContent';
import AchievementsContent from './contents/AchievementsContent';

// Audio Synthesizer Utility
import { SoundManager } from './utils/SoundManager';

export default function App() {
  // Global States
  const [activeTheme, setActiveTheme] = useState('grid');
  const [soundMuted, setSoundMuted] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState(null);

  // Stacking zIndex focus state
  const [highestZIndex, setHighestZIndex] = useState(10);

  // Storing windows registries
  const [windows, setWindows] = useState({
    about: { id: 'about', title: 'C:\\Hinduja\\about_me.txt', isOpen: false, isMinimized: false, zIndex: 10, defaultWidth: '640px', defaultHeight: '520px', initialX: 80, initialY: 40 },
    skills: { id: 'skills', title: 'C:\\Hinduja\\skills.sys', isOpen: false, isMinimized: false, zIndex: 10, defaultWidth: '660px', defaultHeight: '500px', initialX: 130, initialY: 60 },
    projects: { id: 'projects', title: 'C:\\Hinduja\\projects.dir', isOpen: false, isMinimized: false, zIndex: 10, defaultWidth: '760px', defaultHeight: '540px', initialX: 100, initialY: 80 },
    experience: { id: 'experience', title: 'C:\\Hinduja\\experience.log', isOpen: false, isMinimized: false, zIndex: 10, defaultWidth: '650px', defaultHeight: '500px', initialX: 160, initialY: 100 },
    contact: { id: 'contact', title: 'C:\\Hinduja\\contact.exe', isOpen: false, isMinimized: false, zIndex: 10, defaultWidth: '650px', defaultHeight: '490px', initialX: 120, initialY: 90 },
    achievements: { id: 'achievements', title: 'C:\\Hinduja\\achievements.dir', isOpen: false, isMinimized: false, zIndex: 10, defaultWidth: '700px', defaultHeight: '540px', initialX: 140, initialY: 70 }
  });

  // Sound sync initializer
  useEffect(() => {
    SoundManager.setMuted(soundMuted);
  }, [soundMuted]);

  // Welcome chime on first user click anywhere (due to browser interaction security)
  useEffect(() => {
    const playIntroChime = () => {
      SoundManager.playSuccess();
      window.removeEventListener('click', playIntroChime);
    };
    window.addEventListener('click', playIntroChime);
    return () => window.removeEventListener('click', playIntroChime);
  }, []);

  // Theme configuration styles mapping
  const getThemeClass = () => {
    switch (activeTheme) {
      case 'stripes':
        return 'vintage-stripes-paper';
      case 'dots':
        return 'vintage-dot-paper';
      case 'dark':
        // Dark retro command CLI CRT monitor theme
        return 'bg-[#0b0e0a] crt-scanlines text-[#8cb865]';
      case 'grid':
      default:
        return 'vintage-grid-paper';
    }
  };

  // Open/Launch window
  const openWindow = (windowId) => {
    setWindows((prev) => {
      const nextZ = highestZIndex + 1;
      setHighestZIndex(nextZ);
      return {
        ...prev,
        [windowId]: {
          ...prev[windowId],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ
        }
      };
    });
  };

  // Close Window
  const closeWindow = (windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: false,
        isMinimized: false
      }
    }));
  };

  // Focus (Raise Stacking order)
  const focusWindow = (windowId) => {
    const currentWindowZ = windows[windowId].zIndex;
    if (currentWindowZ === highestZIndex) return; // Already on top

    setWindows((prev) => {
      const nextZ = highestZIndex + 1;
      setHighestZIndex(nextZ);
      return {
        ...prev,
        [windowId]: {
          ...prev[windowId],
          zIndex: nextZ
        }
      };
    });
  };

  const minimizeWindow = (windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: true
      }
    }));
  };

  const restoreWindow = (windowId) => {
    setWindows((prev) => {
      const nextZ = highestZIndex + 1;
      setHighestZIndex(nextZ);
      return {
        ...prev,
        [windowId]: {
          ...prev[windowId],
          isMinimized: false,
          zIndex: nextZ
        }
      };
    });
  };

  const toggleSound = () => {
    setSoundMuted(!soundMuted);
  };

  const handleDesktopClick = () => {
    // Deselect highlighted folder if clicking empty space
    setSelectedIconId(null);
  };

  return (
    <div
      onPointerDown={handleDesktopClick}
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-300 ${getThemeClass()}`}
    >

      {/* Visual background decorations for amber dark theme */}
      {activeTheme === 'dark' && (
        <div className="absolute inset-0 bg-[#0d1209]/20 pointer-events-none z-10" />
      )}

      {/* TOP DESKTOP HEADER & LOGO BRANDING */}
      {/* <div className="absolute top-4 left-0 right-0 flex flex-col items-center select-none pointer-events-none z-0">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-[0.2em] font-sans text-center opacity-85 select-none text-[#3c4233]/70 dark:text-[#8cb865]/60 flex items-center gap-1.5 uppercase">
          PORTFOLIO
        </h1>
        <div className="text-[10px] md:text-xs font-mono tracking-wider opacity-60 mt-1 select-none text-[#5c674e] dark:text-[#8cb865]/50">
          SYSTEM.OS v1.0.4 // ELAINE PAULA HERNANDEZ
        </div>
      </div> */}

      {/* SYMMETRIC DESKTOP FOLDER ICONS GRID */}
      <div className="absolute inset-x-6 top-24 bottom-20 flex justify-between pointer-events-none select-none z-20">

        {/* Left-hand column folders */}
        <div className="flex flex-col gap-6 items-start pointer-events-auto">
          <DesktopIcon
            id="about"
            name="about"
            label="About_Me.txt"
            iconType="profile"
            isSelected={selectedIconId === 'about'}
            onSelect={() => setSelectedIconId('about')}
            onClick={() => openWindow('about')}
          />
          <DesktopIcon
            id="projects"
            name="projects"
            label="Projects.dir"
            iconType="folder"
            isSelected={selectedIconId === 'projects'}
            onSelect={() => setSelectedIconId('projects')}
            onClick={() => openWindow('projects')}
          />
          <DesktopIcon
            id="skills"
            name="skills"
            label="Skills.sys"
            iconType="folder"
            isSelected={selectedIconId === 'skills'}
            onSelect={() => setSelectedIconId('skills')}
            onClick={() => openWindow('skills')}
          />
        </div>

        {/* Right-hand column folders */}
        <div className="flex flex-col gap-6 items-end pointer-events-auto">
          <DesktopIcon
            id="experience"
            name="experience"
            label="Experience.log"
            iconType="folder"
            isSelected={selectedIconId === 'experience'}
            onSelect={() => setSelectedIconId('experience')}
            onClick={() => openWindow('experience')}
          />
          <DesktopIcon
            id="contact"
            name="contact"
            label="Contact.exe"
            iconType="folder"
            isSelected={selectedIconId === 'contact'}
            onSelect={() => setSelectedIconId('contact')}
            onClick={() => openWindow('contact')}
          />
          <DesktopIcon
            id="achievements"
            name="achievements"
            label="Achievements.dir"
            iconType="folder"
            isSelected={selectedIconId === 'achievements'}
            onSelect={() => setSelectedIconId('achievements')}
            onClick={() => openWindow('achievements')}
          />
        </div>

      </div>

      {/* SCRAPBOOK HERO SECTION */}
      <ScrapbookHero />



      {/* POPUP & DRAGGABLE APPLICATION WINDOWS CONTAINER */}
      <div className="absolute inset-0 pointer-events-none z-30 select-none">

        {/* About Me Window */}
        <Window
          id="about"
          title={windows.about.title}
          isOpen={windows.about.isOpen}
          isMinimized={windows.about.isMinimized}
          zIndex={windows.about.zIndex}
          initialX={windows.about.initialX}
          initialY={windows.about.initialY}
          defaultWidth={windows.about.defaultWidth}
          defaultHeight={windows.about.defaultHeight}
          onClose={() => closeWindow('about')}
          onMinimize={() => minimizeWindow('about')}
          onFocus={() => focusWindow('about')}
        >
          <AboutContent isMinimized={windows.about.isMinimized} />
        </Window>

        {/* Skills Window */}
        <Window
          id="skills"
          title={windows.skills.title}
          isOpen={windows.skills.isOpen}
          isMinimized={windows.skills.isMinimized}
          zIndex={windows.skills.zIndex}
          initialX={windows.skills.initialX}
          initialY={windows.skills.initialY}
          defaultWidth={windows.skills.defaultWidth}
          defaultHeight={windows.skills.defaultHeight}
          onClose={() => closeWindow('skills')}
          onMinimize={() => minimizeWindow('skills')}
          onFocus={() => focusWindow('skills')}
        >
          <SkillsContent />
        </Window>

        {/* Projects Window */}
        <Window
          id="projects"
          title={windows.projects.title}
          isOpen={windows.projects.isOpen}
          isMinimized={windows.projects.isMinimized}
          zIndex={windows.projects.zIndex}
          initialX={windows.projects.initialX}
          initialY={windows.projects.initialY}
          defaultWidth={windows.projects.defaultWidth}
          defaultHeight={windows.projects.defaultHeight}
          onClose={() => closeWindow('projects')}
          onMinimize={() => minimizeWindow('projects')}
          onFocus={() => focusWindow('projects')}
        >
          <ProjectsContent />
        </Window>

        {/* Experience Terminal Window */}
        <Window
          id="experience"
          title={windows.experience.title}
          isOpen={windows.experience.isOpen}
          isMinimized={windows.experience.isMinimized}
          zIndex={windows.experience.zIndex}
          initialX={windows.experience.initialX}
          initialY={windows.experience.initialY}
          defaultWidth={windows.experience.defaultWidth}
          defaultHeight={windows.experience.defaultHeight}
          onClose={() => closeWindow('experience')}
          onMinimize={() => minimizeWindow('experience')}
          onFocus={() => focusWindow('experience')}
        >
          <ExperienceContent />
        </Window>

        {/* Contact Composer Notepad Window */}
        <Window
          id="contact"
          title={windows.contact.title}
          isOpen={windows.contact.isOpen}
          isMinimized={windows.contact.isMinimized}
          zIndex={windows.contact.zIndex}
          initialX={windows.contact.initialX}
          initialY={windows.contact.initialY}
          defaultWidth={windows.contact.defaultWidth}
          defaultHeight={windows.contact.defaultHeight}
          onClose={() => closeWindow('contact')}
          onMinimize={() => minimizeWindow('contact')}
          onFocus={() => focusWindow('contact')}
        >
          <ContactContent />
        </Window>

        {/* Achievements Folder Window */}
        <Window
          id="achievements"
          title={windows.achievements.title}
          isOpen={windows.achievements.isOpen}
          isMinimized={windows.achievements.isMinimized}
          zIndex={windows.achievements.zIndex}
          initialX={windows.achievements.initialX}
          initialY={windows.achievements.initialY}
          defaultWidth={windows.achievements.defaultWidth}
          defaultHeight={windows.achievements.defaultHeight}
          onClose={() => closeWindow('achievements')}
          onMinimize={() => minimizeWindow('achievements')}
          onFocus={() => focusWindow('achievements')}
        >
          <AchievementsContent />
        </Window>


      </div>

      {/* SYSTEM BOTTOM TASKBAR & CLOCK */}
      <Taskbar
        activeTheme={activeTheme}
        onChangeTheme={setActiveTheme}
        soundMuted={soundMuted}
        onToggleSound={toggleSound}
        onOpenWindow={openWindow}
        windows={windows}
        highestZIndex={highestZIndex}
        minimizeWindow={minimizeWindow}
        restoreWindow={restoreWindow}
        focusWindow={focusWindow}
      />

    </div>
  );
}
