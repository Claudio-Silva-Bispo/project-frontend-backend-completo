import React, { useEffect, useState } from 'react';

interface TextZoomProps {
  isActive: boolean;
}

const TextZoom: React.FC<TextZoomProps> = ({ isActive }) => {
  const [zoomedText, setZoomedText] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.innerText) {
        setZoomedText(target.innerText);
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseLeave = () => {
      setZoomedText(null);
    };

    if (isActive) {
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave, true);
    } else {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    }

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [isActive]);

  return zoomedText ? (
    <div
      className="fixed bg-[#0A9DDA] text-white text-2xl p-10 border border-gray-300 shadow-lg z-50 rounded-lg"
      style={{ top: position.y, left: position.x }}
    >
      {zoomedText}
    </div>
  ) : null;
};

export default TextZoom;
