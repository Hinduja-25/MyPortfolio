import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * A custom hook to handle pointer (mouse & touch) dragging of elements.
 * 
 * @param {object} params
 * @param {number} params.initialX - Starting X position on desktop
 * @param {number} params.initialY - Starting Y position on desktop
 * @param {function} params.onDragStart - Fired when dragging starts (useful to raise z-index)
 * @param {function} params.onDragEnd - Fired when dragging ends
 * @returns {object} { x, y, setPosition, onPointerDown }
 */
export function usePointerDrag({ initialX, initialY, onDragStart, onDragEnd }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: initialX, y: initialY });

  // Update position if initial coordinates change (e.g., resizing screen or resetting)
  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  const handlePointerDown = useCallback((e) => {
    // Only drag with primary pointer button
    if (e.button !== undefined && e.button !== 0) return;

    // Prevent text selection and general page scrolling when dragging
    // We handle it selectively to allow inputs inside the window to function
    const targetTagName = e.target.tagName.toLowerCase();
    if (targetTagName === 'input' || targetTagName === 'textarea' || targetTagName === 'button') {
      return;
    }

    if (onDragStart) onDragStart();

    dragStartRef.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = { ...position };

    const handlePointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.x;
      const deltaY = moveEvent.clientY - dragStartRef.current.y;
      
      let newX = startPosRef.current.x + deltaX;
      let newY = startPosRef.current.y + deltaY;

      // Desktop boundaries checking
      const minVisible = 80; // keep at least 80px visible
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (newX < -minVisible) newX = -minVisible;
      if (newX > screenWidth - minVisible) newX = screenWidth - minVisible;
      
      // Limit top drag so window bar is not lost under browser top bar
      if (newY < 0) newY = 0; 
      if (newY > screenHeight - 60) newY = screenHeight - 60;

      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      if (onDragEnd) onDragEnd();
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }, [position, onDragStart, onDragEnd]);

  return {
    x: position.x,
    y: position.y,
    setPosition,
    onPointerDown: handlePointerDown
  };
}
