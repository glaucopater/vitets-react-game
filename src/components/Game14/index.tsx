import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal'; // Adjust the path accordingly

// infinite loop, enemies not moving or spanwing

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 9, y: 9 }); // Set initial player position to the center
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([
    { x: 1, y: 2 },
    { x: 10, y: 2 },
  ]);
  const [enemyCount, setEnemyCount] = useState(0); // Track the number of enemies
  const [isGameOver, setIsGameOver] = useState(false);
  const [bullets, setBullets] = useState<
    { x: number; y: number; speed: number; angle: number }[]
  >([]);
  const playerPositionRef = useRef({ x: 9, y: 9 });

  const resetGame = () => {
    setPosition({ x: 9, y: 9 });
    setEnemies([]);
    setEnemyCount(0); // Reset the enemy count
    setIsGameOver(false);
    setBullets([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return; // Disable movement when game is over
      switch (e.key) {
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - 1) }));
          break;
        case 'ArrowDown':
          setPosition((prev) => ({ ...prev, y: Math.min(19, prev.y + 1) }));
          break;
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }));
          break;
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: Math.min(19, prev.x + 1) }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameOver]);

  useEffect(() => {
    playerPositionRef.current = position; // Update the player position ref whenever the player position changes
  }, [position]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver && enemyCount < 5) {
        // Increment enemy count and add new enemy
        setEnemyCount((prevCount) => prevCount + 1);
        setEnemies((prevEnemies) => [
          ...prevEnemies,
          {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          },
        ]);
      }
    }, 2000); // Adjust enemy spawn rate as needed

    return () => clearInterval(interval);
  }, [enemyCount, isGameOver]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isGameOver) {
        const newEnemies = enemies.map((enemy) => {
          // Calculate the direction of movement based on the relative positions of enemy and player
          const dx = playerPositionRef.current.x - enemy.x;
          const dy = playerPositionRef.current.y - enemy.y;
          const directionX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
          const directionY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

          return {
            x: enemy.x + directionX,
            y: enemy.y + directionY,
          };
        });
        setEnemies(newEnemies);
      }
    }, 1000); // Adjust enemy movement speed as needed

    return () => clearInterval(moveInterval);
  }, [enemies, isGameOver]);

  // Check for collisions between player and enemies
  useEffect(() => {
    const collision = enemies.some(
      (enemy) => enemy.x === position.x && enemy.y === position.y
    );
    if (collision) {
      setIsGameOver(true);
    }
  }, [enemies, position]);

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isGameOver) return; // Disable shooting when game is over
    // Calculate the angle of the shot
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const dx = mouseX - position.x * 20;
    const dy = mouseY - position.y * 20;
    const angle = Math.atan2(dy, dx); // Calculate the angle between player and mouse position
    // Spawn bullet
    const bulletSpeed = 3; // Adjust bullet speed as needed
    setBullets((prevBullets) => [
      ...prevBullets,
      { x: position.x, y: position.y, speed: bulletSpeed, angle: angle },
    ]);
  };

  useEffect(() => {
    const bulletInterval = setInterval(() => {
      if (!isGameOver) {
        // Move bullets
        setBullets(
          (prevBullets) =>
            prevBullets!
              .map((bullet: any) => {
                const newX = bullet.x + bullet.speed * Math.cos(bullet.angle);
                const newY = bullet.y + bullet.speed * Math.sin(bullet.angle);
                // Check if bullet is outside game area
                if (newX < 0 || newX > 19 || newY < 0 || newY > 19) {
                  return null; // Remove bullet from list
                }
                return {
                  ...bullet,
                  x: newX,
                  y: newY,
                };
              })
              .filter(Boolean) // Filter out null values (removed bullets)
        );
      }
    }, 100); // Adjust bullet speed as needed

    return () => clearInterval(bulletInterval);
  }, [isGameOver]);

  useEffect(() => {
    // Check for collisions between bullets and enemies
    const updatedEnemies = [...enemies];
    bullets.forEach((bullet) => {
      const hitEnemyIndex = updatedEnemies.findIndex(
        (enemy) =>
          Math.abs(enemy.x - bullet.x) < 0.5 &&
          Math.abs(enemy.y - bullet.y) < 0.5
      );
      if (hitEnemyIndex !== -1) {
        updatedEnemies.splice(hitEnemyIndex, 1); // Remove hit enemy
      }
    });
    setEnemies(updatedEnemies);
  }, [bullets, enemies]);

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
        onClick={handleMouseClick}
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

        {/* Render bullets */}
        {bullets.map((bullet, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${bullet.y * 20}px`,
              left: `${bullet.x * 20}px`,
              width: '5px',
              height: '5px',
              backgroundColor: 'yellow',
            }}
          />
        ))}
      </div>

      {/* Render Modal for Game Over */}
      <Modal isOpen={isGameOver} onClose={resetGame}>
        <h2>Game Over!</h2>
        <p>Your score: {enemies.length}</p>
        <button onClick={resetGame}>Restart</button>
      </Modal>
    </div>
  );
};

export default App;
