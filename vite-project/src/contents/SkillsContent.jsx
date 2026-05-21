import React, { useState } from 'react';
import { Cpu, Terminal, Layers, Code, Info, ShieldAlert, FileCode } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export default function SkillsContent() {
  // Skill sets
  const skillsData = {
    languages: [
      { name: 'Java', level: 75, file: 'JAVA.exe', desc: 'Object-oriented programming and enterprise-level applications.' },
      { name: 'C', level: 80, file: 'C.exe', desc: 'Basic syntax and structure understanding.' },
      { name: 'Python', level: 80, file: 'PYTHON.exe', desc: 'Basic syntax and structure understanding, data structures, algorithms, and AI/ML.' },
      { name: 'JavaScript', level: 92, file: 'JS_CORE.DLL', desc: 'Deep core comprehension: Event loop, prototypes, ESNext features, asynchronous architecture, and pure functions.' },
    ],
    frontend: [
      { name: 'React.js', level: 90, file: 'REACT.EXE', desc: 'Expert in state orchestration, Custom hooks, Concurrent Features, React 19, and Vite architecture.' },
      { name: 'Tailwind CSS', level: 95, file: 'TW_STYLE.CSS', desc: 'Speed and layout artisan: Highly customizable utility classes, animations, design tokens, and fluid layout models.' },
      { name: 'HTML5 / CSS3', level: 90, file: 'DOM_FLOW.HTML', desc: 'Semantic layouts, advanced grid/flexbox positioning, custom SVG animations, and responsive accessibilities.' }
    ],
    backend: [
      { name: 'Node.js', level: 80, file: 'NODE_SRV.EXE', desc: 'Server-side engine: Fast REST APIs, Express framework pipelines, file systems operations, and middleware development.' },
      { name: 'SQL', level: 75, file: 'SQL.DB', desc: 'Relational data planner: Schema architecture, structured indexation, query normalization, and clean transactions.' },
      { name: 'MongoDB', level: 80, file: 'MONGO.DB', desc: 'NoSQL document modeling: Flexible schemas, scalable data structures, query interfaces, and database management.' },
      { name: 'REST APIs', level: 88, file: 'REST_API.REQ', desc: 'Robust routing structures, authentication validation (JWT), status compliance, and request optimization.' }
    ],
    tools: [
      { name: 'Git & GitHub', level: 88, file: 'GIT_VER.EXE', desc: 'Source version controls: Advanced branching structures, commit management, pull-requests pipelines, and merge conflict resolution.' },
      { name: 'VS Code', level: 92, file: 'VSCODE.LNK', desc: 'Primary workspace: Advanced extensions pipelines, terminal tools integration, custom hotkeys, and snippet creations.' }
    ],
    computer_core: [
      { name: 'DBMS', level: 85, file: 'DBMS.SYS', desc: 'Database Management Systems: Relational schemas, query optimization, indexing, and transactional integrity.' },
      { name: 'OOPS', level: 90, file: 'OOP.OBJ', desc: 'Object-Oriented Programming: Encapsulation, inheritance, polymorphism, and solid design principles.' }
    ]

  };

  const [activeSkill, setActiveSkill] = useState(skillsData.frontend[0]);

  const selectSkill = (skill) => {
    SoundManager.playClick();
    setActiveSkill(skill);
  };

  // Helper to render vintage 8-bit character progress block
  const renderRetroProgressBar = (level) => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((level / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;

    return (
      <div className="font-mono text-xs md:text-sm text-[#5c674e] flex items-center gap-1.5 select-none">
        <span className="text-[#3c4233] font-bold">Progress:</span>
        <span className="tracking-tighter">
          {"[ "}
          <span className="text-[#e6a745] font-black">
            {"|".repeat(filledBlocks)}
          </span>
          <span className="text-[#dfd8be]">
            {".".repeat(emptyBlocks)}
          </span>
          {" ]"}
        </span>
        <span className="text-[#3c4233] font-bold ml-1">{level}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 font-sans">

      {/* Skill categories column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Programming Languages Section */}
        <div className="border border-[#3c4233] bg-[#fcf9f2] p-4 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)] flex flex-col">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c674e] border-b border-[#dfd8be] pb-2 flex items-center gap-1.5 shrink-0">
            <FileCode className="w-3.5 h-3.5" /> Languages.exe
          </h3>

          <div className="mt-3 space-y-2 flex-1">
            {skillsData.languages.map((skill) => (
              <button
                key={skill.name}
                onClick={() => selectSkill(skill)}
                className={`w-full text-left font-mono text-xs px-2.5 py-1.5 border rounded-sm transition-all duration-100 flex items-center justify-between ${activeSkill.name === skill.name
                    ? 'bg-[#5c674e] border-[#3c4233] text-[#fdfbf7] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]'
                    : 'bg-[#efe9d9] border-[#3c4233] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none'
                  }`}
              >
                <span>{skill.file}</span>
                <span className="text-[10px] opacity-75">{skill.level}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Frontend Skills Section */}
        <div className="border border-[#3c4233] bg-[#fcf9f2] p-4 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)] flex flex-col">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c674e] border-b border-[#dfd8be] pb-2 flex items-center gap-1.5 shrink-0">
            <Code className="w-3.5 h-3.5" /> Frontend.dir
          </h3>

          <div className="mt-3 space-y-2 flex-1">
            {skillsData.frontend.map((skill) => (
              <button
                key={skill.name}
                onClick={() => selectSkill(skill)}
                className={`w-full text-left font-mono text-xs px-2.5 py-1.5 border rounded-sm transition-all duration-100 flex items-center justify-between ${activeSkill.name === skill.name
                    ? 'bg-[#5c674e] border-[#3c4233] text-[#fdfbf7] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]'
                    : 'bg-[#efe9d9] border-[#3c4233] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none'
                  }`}
              >
                <span>{skill.file}</span>
                <span className="text-[10px] opacity-75">{skill.level}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Backend Skills Section */}
        <div className="border border-[#3c4233] bg-[#fcf9f2] p-4 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)] flex flex-col">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c674e] border-b border-[#dfd8be] pb-2 flex items-center gap-1.5 shrink-0">
            <Cpu className="w-3.5 h-3.5" /> Backend.sys
          </h3>

          <div className="mt-3 space-y-2 flex-1">
            {skillsData.backend.map((skill) => (
              <button
                key={skill.name}
                onClick={() => selectSkill(skill)}
                className={`w-full text-left font-mono text-xs px-2.5 py-1.5 border rounded-sm transition-all duration-100 flex items-center justify-between ${activeSkill.name === skill.name
                    ? 'bg-[#5c674e] border-[#3c4233] text-[#fdfbf7] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]'
                    : 'bg-[#efe9d9] border-[#3c4233] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none'
                  }`}
              >
                <span>{skill.file}</span>
                <span className="text-[10px] opacity-75">{skill.level}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="border border-[#3c4233] bg-[#fcf9f2] p-4 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)] flex flex-col">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c674e] border-b border-[#dfd8be] pb-2 flex items-center gap-1.5 shrink-0">
            <Layers className="w-3.5 h-3.5" /> Tools.app
          </h3>

          <div className="mt-3 space-y-2 flex-1">
            {skillsData.tools.map((skill) => (
              <button
                key={skill.name}
                onClick={() => selectSkill(skill)}
                className={`w-full text-left font-mono text-xs px-2.5 py-1.5 border rounded-sm transition-all duration-100 flex items-center justify-between ${activeSkill.name === skill.name
                    ? 'bg-[#5c674e] border-[#3c4233] text-[#fdfbf7] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]'
                    : 'bg-[#efe9d9] border-[#3c4233] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none'
                  }`}
              >
                <span>{skill.file}</span>
                <span className="text-[10px] opacity-75">{skill.level}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Computer Core Section */}
        <div className="border border-[#3c4233] bg-[#fcf9f2] p-4 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)] flex flex-col">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c674e] border-b border-[#dfd8be] pb-2 flex items-center gap-1.5 shrink-0">
            <ShieldAlert className="w-3.5 h-3.5" /> Core.sys
          </h3>

          <div className="mt-3 space-y-2 flex-1">
            {skillsData.computer_core.map((skill) => (
              <button
                key={skill.name}
                onClick={() => selectSkill(skill)}
                className={`w-full text-left font-mono text-xs px-2.5 py-1.5 border rounded-sm transition-all duration-100 flex items-center justify-between ${activeSkill.name === skill.name
                    ? 'bg-[#5c674e] border-[#3c4233] text-[#fdfbf7] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]'
                    : 'bg-[#efe9d9] border-[#3c4233] text-[#3c4233] shadow-[1px_1px_0px_0px_rgba(60,66,51,1)] hover:bg-[#e6dfcb] active:translate-y-px active:shadow-none'
                  }`}
              >
                <span>{skill.file}</span>
                <span className="text-[10px] opacity-75">{skill.level}%</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Selected Skill Details Pane */}
      <div className="border-2 border-[#3c4233] bg-[#efe9d9] p-4 rounded-sm shadow-[4px_4px_0px_0px_rgba(60,66,51,0.9)] space-y-4">

        {/* Terminal Header */}
        <div className="flex justify-between items-center text-xs font-mono border-b border-[#3c4233] pb-2">
          <span className="flex items-center gap-1 text-[#5c674e] font-bold">
            <Info className="w-4 h-4 text-[#3c4233]" /> FILE PROPERTY VIEWER
          </span>
          <span className="text-[#cc6a5c] font-bold">[{activeSkill.file}]</span>
        </div>

        {/* Skill Specs */}
        <div className="space-y-3 font-mono text-xs md:text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-dashed border-[#dfd8be] pb-2">
            <div>
              <span className="font-bold text-[#5c674e]">Component Name: </span>
              <span className="text-[#3c4233] font-bold">{activeSkill.name}</span>
            </div>
            {renderRetroProgressBar(activeSkill.level)}
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-[#5c674e] flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#3c4233]" /> FUNCTION_SUMMARY:
            </div>
            <div className="bg-[#fdfbf7] border border-[#3c4233] p-3 rounded-sm leading-relaxed text-[#3c4233]">
              {activeSkill.desc}
            </div>
          </div>
        </div>

        {/* Help Tip */}
        <div className="text-[10px] font-mono text-[#5c674e] text-center italic select-none">
          * TIP: Click any executable file in the grids above to load properties into this viewer.
        </div>
      </div>

    </div>
  );
}
