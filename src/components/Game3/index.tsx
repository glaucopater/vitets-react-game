import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);
  const maxEnemies = 5; // Maximum number of enemies on screen

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (enemies.length < maxEnemies) {
        const newEnemies = [...enemies];
        newEnemies.push({
          x: Math.floor(Math.random() * 20), // Adjust as needed
          y: Math.floor(Math.random() * 20), // Adjust as needed
        });
        setEnemies(newEnemies);
      }
    }, 2000); // Adjust enemy spawn rate as needed

    return () => clearInterval(interval);
  }, [enemies, maxEnemies]);

  // Move enemies closer to the player
  useEffect(() => {
    const moveEnemies = () => {
      const newEnemies = enemies.map((enemy) => ({
        x: enemy.x + (position.x < enemy.x ? -1 : position.x > enemy.x ? 1 : 0),
        y: enemy.y + (position.y < enemy.y ? -1 : position.y > enemy.y ? 1 : 0),
      }));
      setEnemies(newEnemies);
    };

    const moveInterval = setInterval(moveEnemies, 1000); // Adjust enemy movement speed as needed

    return () => clearInterval(moveInterval);
  }, [enemies, position]);

  // Check for collisions between player and enemies
  useEffect(() => {
    const collision = enemies.some(
      (enemy) => enemy.x === position.x && enemy.y === position.y
    );
    if (collision) {
      alert('Game Over!'); // You can replace this with your own game over logic
      // Reset player position or any other necessary state here
      setPosition({ x: 0, y: 0 });
    }
  }, [enemies, position]);

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
        {/* Render player */}
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

        {/* Render enemies */}
        {enemies.map((enemy, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${enemy.y * 20}px`,
              left: `${enemy.x * 20}px`,
              width: '20px',
              height: '20px',
              backgroundColor: 'blue',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
