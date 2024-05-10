import { useState, useEffect } from "react";
import FEATURES from "../features/";

export const useEnemies = (
  isGameOver: boolean,
  isPaused: boolean,
  playerPositionRef: { current: { x: number; y: number } }
) => {
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!FEATURES.ALLOW_ENEMIES) return;

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
    }, 2000);

    return () => clearInterval(spawnEnemyInterval);
  }, [isGameOver, enemies.length, isPaused]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isGameOver && !isPaused) {
        const newEnemies = enemies.map((enemy) => {
          const dx = playerPositionRef.current.x - enemy.x;
          const dy = playerPositionRef.current.y - enemy.y;
          const directionX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
          const directionY = dy === 0 ? 0 : dy > 0 ? 1 : -1;
          return { x: enemy.x + directionX, y: enemy.y + directionY };
        });
        setEnemies(newEnemies);
      }
    }, 1000);

    return () => clearInterval(moveInterval);
  }, [enemies, isGameOver, isPaused, playerPositionRef]);

  return { enemies, setEnemies };
};
