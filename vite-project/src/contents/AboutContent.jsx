import React, { useState, useEffect, useRef } from 'react';
import { SoundManager } from '../utils/SoundManager';

export default function AboutContent({ isMinimized }) {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const contentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = `
Heyy, 
I’m Hinduja Simhadri — an aspiring software engineer currently surviving (and kinda enjoying) 3rd year B.Tech CSE at IIIT Bhubaneswar 👩‍💻

I used to wonder “how are websites and apps even working behind the screen?”
That curiosity slowly turned into a JEE preparation arc where I dreamed of getting into IITs/NITs with CSE… but life said *“plot twist”* and landed me in IIIT instead. And honestly? I’m grateful for it.

Right now, I’m exploring the AI/ML world and genuinely loving the process. Along with that, I try to solve at least one DSA problem every day. Not gonna lie — DSA is currently cooking me 😭
The intuition, approaches, and optimizations sometimes make my brain restart, but I still enjoy it because it’s improving the way I think and solve problems.

I also enjoy building full-stack websites end-to-end because seeing an idea turn into a real working product is just satisfying.

Outside coding, my personality is basically:

* watching movies 🎬
* listening to songs 🎧
* scrolling reels (professional procrastinator)
* doing crochet 🧶

And the things I want to do more often:

* art in any form — dance, music, drawing
* basketball & badminton 🏀🏸
* learning about stocks, crypto & finance 📈
* meeting new people and having random deep/funny conversations
* exploring new food, places, ideas, and experiences

I’m basically someone who loves tech, creativity, and discovering new things — sometimes all at once ✨


_ EOF _`;

  useEffect(() => {
    let timeoutId;
    let intervalId;

    if (!isMinimized && isTyping) {
      timeoutId = setTimeout(() => {
        intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;

            if (nextIndex % 3 === 0 && fullText[nextIndex - 1] !== ' ' && fullText[nextIndex - 1] !== '\n') {
              SoundManager.playClick();
            }

            setTypedText(fullText.slice(0, nextIndex));

            if (contentRef.current) {
              contentRef.current.scrollTop = contentRef.current.scrollHeight;
            }

            if (nextIndex > fullText.length) {
              clearInterval(intervalId);
              setIsTyping(false);
            }

            return nextIndex;
          });
        }, 35);
      }, 400);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isMinimized, isTyping]);

  return (
    <div className="h-full w-full flex flex-col bg-[#fffefc] overflow-hidden" style={{ margin: '-16px' }}>

      {/* Notepad Menu Bar */}
      <div className="bg-[#f0ebd9] border-b border-[#dfd8be] flex text-xs font-sans text-[#3c4233] px-2 py-1 select-none pointer-events-none">
        <span className="px-2 py-0.5 hover:bg-[#dfd8be] cursor-pointer">File</span>
        <span className="px-2 py-0.5 hover:bg-[#dfd8be] cursor-pointer">Edit</span>
        <span className="px-2 py-0.5 hover:bg-[#dfd8be] cursor-pointer">Format</span>
        <span className="px-2 py-0.5 hover:bg-[#dfd8be] cursor-pointer">View</span>
        <span className="px-2 py-0.5 hover:bg-[#dfd8be] cursor-pointer">Help</span>
      </div>

      {/* Text Area */}
      <div
        ref={contentRef}
        className="flex-1 overflow-auto p-4 cursor-text font-mono text-sm leading-relaxed text-[#3c4233] scrollbar-retro relative"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(223, 216, 190, 0.15) 50%)',
          backgroundSize: '100% 48px', // Slight paper lines texture
        }}
        onClick={() => {
          // Focus effect simulation
          const selection = window.getSelection();
          if (!selection.toString()) {
            const range = document.createRange();
            const lastChild = contentRef.current.lastChild;
            if (lastChild) {
              range.selectNodeContents(lastChild);
              range.collapse(false);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }}
      >
        <span className="whitespace-pre-wrap selection:bg-[#3c4233] selection:text-[#fdfbf7]">{typedText}</span>
        {isTyping && <span className="blinking-cursor ml-1"></span>}
        {!isTyping && <span className="blinking-cursor ml-1 opacity-50"></span>}
      </div>
    </div>
  );
}
