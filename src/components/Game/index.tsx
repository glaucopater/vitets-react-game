import React, { useState, useEffect, useRef } from "react";
import Modal from "../Modal"; // Adjust the path accordingly
import { Player } from "../Player";
import { Enemy } from "../Enemy";

const Game: React.FC = () => {
  const [position, setPosition] = useState({ x: 9, y: 9 }); // Set initial player position to the center
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0); // Track player's score
  const [isPaused, setIsPaused] = useState(false); // Track game pause state
  const playerPositionRef = useRef({ x: 9, y: 9 });

  const resetGame = () => {
    setPosition({ x: 9, y: 9 });
    setEnemies([]);
    setIsGameOver(false);
    setScore(0); // Reset player's score
    setIsPaused(false); // Reset pause state
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return; // Disable movement when game is over
      if (e.key === " ") {
        // Toggle pause when spacebar is pressed
        setIsPaused((prevPaused) => !prevPaused);
      } else if (!isPaused) {
        // Allow movement only when game is not paused
        switch (e.key) {
          case "ArrowUp":
            setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - 1) }));
            break;
          case "ArrowDown":
            setPosition((prev) => ({ ...prev, y: Math.min(19, prev.y + 1) }));
            break;
          case "ArrowLeft":
            setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }));
            break;
          case "ArrowRight":
            setPosition((prev) => ({ ...prev, x: Math.min(19, prev.x + 1) }));
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameOver, isPaused]);

  useEffect(() => {
    playerPositionRef.current = position; // Update the player position ref whenever the player position changes
  }, [position]);

  useEffect(() => {
    const spawnEnemyInterval = setInterval(() => {
      if (!isGameOver && enemies.length < 5 && !isPaused) {
        setEnemies((prevEnemies) => [
          ...prevEnemies,
          {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          },
        ]);
      }
    }, 2000); // Spawn enemy every 2 seconds

    return () => clearInterval(spawnEnemyInterval);
  }, [isGameOver, enemies.length, isPaused]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isGameOver && !isPaused) {
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
  }, [enemies, isGameOver, isPaused]);

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
    if (isGameOver || isPaused) return; // Disable shooting when game is over or paused
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    // Check if any enemy is clicked
    const clickedEnemyIndex = enemies.findIndex(
      (enemy) =>
        mouseX >= enemy.x * 20 &&
        mouseX < (enemy.x + 1) * 20 &&
        mouseY >= enemy.y * 20 &&
        mouseY < (enemy.y + 1) * 20
    );
    if (clickedEnemyIndex !== -1) {
      // Remove clicked enemy
      const updatedEnemies = [...enemies];
      updatedEnemies.splice(clickedEnemyIndex, 1);
      setEnemies(updatedEnemies);
      setScore((prevScore) => prevScore + 1); // Increase player's score
    }
  };

  // Check for winning condition
  useEffect(() => {
    if (score >= 20) {
      setIsGameOver(true); // Set game over when player's score reaches 20
    }
  }, [score]);

  const handlePauseModalClose = () => {
    setIsPaused(false); // Close the pause modal and remove the pause
  };

  return (
    <div>
      <h1>Move the character with arrow keys</h1>
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "400px",
          border: "1px solid black",
          background: "lightgray",
          cursor: "crosshair", // Change cursor to crosshair within the game area
        }}
        onClick={handleMouseClick} // Handle mouse clicks to shoot enemies
      >
        {/* Render player */}
        <Player position={position} isGameOver={isGameOver} />

        {/* Render enemies */}
        {enemies.map((enemy, index) => (
          <Enemy key={index} enemy={enemy} />
        ))}
      </div>

      {/* Render Modal for Game Over or Winning */}
      <Modal isOpen={isGameOver} onClose={resetGame}>
        <h2>{score >= 20 ? "You Win!" : "Game Over!"}</h2>
        <p>Your score: {score}</p>
        <button onClick={resetGame}>Restart</button>
      </Modal>

      {/* Render Modal for Pause */}
      <Modal isOpen={isPaused} onClose={handlePauseModalClose}>
        <h2>Game Paused</h2>
        <button onClick={handlePauseModalClose}>Resume</button>
      </Modal>
    </div>
  );
};

export default Game;
