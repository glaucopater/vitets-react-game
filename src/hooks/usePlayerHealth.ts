import { useState, useEffect } from "react";
import { DEFAULT_ENEMY_DAMAGE, PLAYER_MAX_HEALTH, audio } from "../constants";
import FEATURES from "../features";

type UsePlayerHealthProps = {
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  isPaused: boolean;
  position: { x: number; y: number };
  enemies: { x: number; y: number }[];
  setEnemies: React.Dispatch<
    React.SetStateAction<
      {
        x: number;
        y: number;
      }[]
    >
  >;
};

export const usePlayerHealth = ({
  isGameOver,
  setIsGameOver,
  isPaused,
  position,
  enemies,
}: UsePlayerHealthProps) => {
  const [playerHealth, setPlayerHealth] = useState(PLAYER_MAX_HEALTH);
  const [lastDamageTime, setLastDamageTime] = useState(0);

  useEffect(() => {
    if (!isGameOver && !isPaused && playerHealth >= 0) {
      const now = Date.now();
      if (lastDamageTime === null || now - lastDamageTime > 1000) {
        const collision = enemies.some(
          (enemy: { x: number; y: number }) =>
            enemy.x === position.x && enemy.y === position.y
        );
        if (collision) {
          setLastDamageTime(now);
          audio.hit2.volume = 0.1;
          audio.hit2.currentTime = 0;
          audio.hit2.play();
          if (!FEATURES.ALLOW_PLAYER_IMMORTAL)
            setPlayerHealth((prevHealth) =>
              Math.max(prevHealth - DEFAULT_ENEMY_DAMAGE, 0)
            );
          if (playerHealth === 0) setIsGameOver(true);
        }
      }
    }
  }, [
    enemies,
    isGameOver,
    isPaused,
    playerHealth,
    position,
    lastDamageTime,
    setIsGameOver,
  ]);

  return { playerHealth, setPlayerHealth, setLastDamageTime };
};
