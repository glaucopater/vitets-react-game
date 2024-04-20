import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

const Game4: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const maxEnemies = 5; // Maximum number of enemies on screen
  const areaWidth = 20; // Width of the delimited area
  const areaHeight = 20; // Height of the delimited area

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - 1) }));
          break;
        case 'ArrowDown':
          setPosition((prev) => ({
            ...prev,
            y: Math.min(areaHeight - 1, prev.y + 1),
          }));
          break;
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }));
          break;
        case 'ArrowRight':
          setPosition((prev) => ({
            ...prev,
            x: Math.min(areaWidth - 1, prev.x + 1),
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [areaWidth, areaHeight]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (enemies.length < maxEnemies) {
        const newEnemies = [...enemies];
        newEnemies.push({
          x: Math.floor(Math.random() * areaWidth),
          y: Math.floor(Math.random() * areaHeight),
        });
        setEnemies(newEnemies);
      }
    }, 2000); // Adjust enemy spawn rate as needed

    return () => clearInterval(interval);
  }, [enemies, maxEnemies, areaWidth, areaHeight]);

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
      // Show modal for game over
      // Replace the below line with the modal logic of your library
      // Reset player position or any other necessary state here

      setIsGameOver(true);
      setPosition({ x: 0, y: 0 });
    }
  }, [enemies, position]);

  return (
    <div>
      <h1>Move the character with arrow keys</h1>
      <div
        style={{
          position: 'relative',
          width: `${areaWidth * 20}px`,
          height: `${areaHeight * 20}px`,
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
      {/* Render Modal for Game Over */}
      <Modal isOpen={isGameOver} onClose={() => setIsGameOver(false)}>
        <h2>Game Over!</h2>
        <p>Your score: {enemies.length}</p>
      </Modal>
    </div>
  );
};

export default Game4;
