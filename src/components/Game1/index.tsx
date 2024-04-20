import React, { useState, useEffect } from 'react';

const Game1: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: prev.y - 1 }));
          break;
        case 'ArrowDown':
          setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
          break;
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
          break;
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <h1>Move the character with arrow keys</h1>
      <div
        style={{
          position: 'relative',
          width: '400px',
          height: '400px',
          border: '1px solid black',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: `${position.y * 20}px`,
            left: `${position.x * 20}px`,
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
          }}
        />
      </div>
    </div>
  );
};

export default Game1;
