/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MAX_BULLETS, WIN_SCORE } from "../constants";
import { PLAYER_MAX_HEALTH, audio } from "../constants";

type UseGameStateProps = {
  isGameOver: boolean;
  setIsGameOver: any;
  setEnemies: any;
  setPlayerHealth: any;
  setPosition: any;
  setIsPaused: any;
  setLastDamageTime: any;
  setBullets: any;
  isPaused: boolean;
  bullets: any;
  enemies: any;
};

export const useGameState = ({
  isGameOver,
  setIsGameOver,
  setEnemies,
  setPlayerHealth,
  setPosition,
  setIsPaused,
  setLastDamageTime,
  setBullets,
  isPaused,
  bullets,
  enemies,
}: UseGameStateProps) => {
  const [score, setScore] = useState(0);
  const [isShooting, setIsShooting] = useState(false);

  const resetGame = () => {
    setPosition({ x: 9, y: 9 });
    setEnemies([]);
    setIsGameOver(false);
    setPlayerHealth(PLAYER_MAX_HEALTH);
    setScore(0);
    setIsPaused(false);
    setLastDamageTime(null);
    setBullets(MAX_BULLETS);
  };

  const pauseGame = () => {
    setIsPaused((prevPaused: any) => !prevPaused);
  };

  const handleMouseDown = (e: {
    currentTarget: { getBoundingClientRect: () => any };
    clientX: number;
    clientY: number;
  }) => {
    if (isGameOver || isPaused || bullets === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setIsShooting(true);
    audio.shoot1.volume = 0.3;
    audio.shoot1.currentTime = 0.2;
    audio.shoot1.play();
    setBullets((prevBullets: number) => prevBullets - 1);
    const clickedEnemyIndex = enemies.findIndex(
      (enemy: { x: number; y: number }) =>
        mouseX >= enemy.x * 20 &&
        mouseX < (enemy.x + 1) * 20 &&
        mouseY >= enemy.y * 20 &&
        mouseY < (enemy.y + 1) * 20
    );
    if (clickedEnemyIndex !== -1) {
      const updatedEnemies = [...enemies];
      updatedEnemies.splice(clickedEnemyIndex, 1);
      setEnemies(updatedEnemies);
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleMouseUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsShooting(false);
  };

  useEffect(() => {
    if (score >= WIN_SCORE) {
      setIsGameOver(true);
    }
  }, [score]);

  const handlePauseModalClose = () => {
    setIsPaused(false);
  };

  return {
    isGameOver,
    score,
    isPaused,
    bullets,
    isShooting,
    resetGame,
    pauseGame,
    handleMouseDown,
    handleMouseUp,
    handlePauseModalClose,
  };
};
