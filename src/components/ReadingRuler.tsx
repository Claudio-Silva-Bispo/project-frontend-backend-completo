import React, { useState, useEffect } from 'react';

interface ReadingRulerProps {
  isActive: boolean;
  onDeactivate: () => void;
}

const ReadingRuler: React.FC<ReadingRulerProps> = ({ isActive, onDeactivate }) => {
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isActive) {
        const rulerHeight = 50;
        const y = e.clientY - rulerHeight / 2;
        setPosition(y);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive) {
        const step = 10;
        if (e.key === 'ArrowUp') {
          setPosition(prevPosition => Math.max(prevPosition - step, 0));
        } else if (e.key === 'ArrowDown') {
          setPosition(prevPosition => prevPosition + step);
        } else if (e.key === 'Escape') {
          onDeactivate();
        }
      }
    };

    if (isActive) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onDeactivate]);

  return isActive ? (
    <>
      <div
        className="fixed left-0 right-0 h-20 bg-white bg-opacity-50 pointer-events-none z-50"
        style={{ top: `${position}px` }}
      ></div>
      <div className="fixed inset-0 bg-black bg-opacity-80 pointer-events-none z-40"></div>
    </>
  ) : null;
};

export default ReadingRuler;
