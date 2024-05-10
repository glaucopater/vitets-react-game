import Modal from "../Modal";
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import Ammo from "../Ammo";
import PowerUp from "../PowerUp";
import { Area } from "../Area";
import { Hud } from "../Hud";
import FEATURES from "../../features";
import { usePlayerHealth } from "../../hooks/usePlayerHealth";
import { useEnemies } from "../../hooks/useEnemies";
import { useAmmunition } from "../../hooks/useAmmonitions";
import { useMedikits } from "../../hooks/useMedikits";
import { useKeyboardEvents } from "../../hooks/useKeyboardEvents";
import { useGameState } from "../../hooks/useGameState";
import { usePlayerMovement } from "../../hooks/usePlayerMovement";
import { useState } from "react";
import { MAX_BULLETS, WIN_SCORE } from "../../constants";

const Game = () => {
  const initialPosition = { x: 9, y: 9 };
  const {
    position,
    playerPositionRef,
    moveRight,
    moveLeft,
    moveDown,
    moveUp,
    setPosition,
  } = usePlayerMovement(initialPosition);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [bullets, setBullets] = useState(MAX_BULLETS);

  const { enemies, setEnemies } = useEnemies(
    isGameOver,
    isPaused,
    playerPositionRef
  );
  const { playerHealth, setPlayerHealth, setLastDamageTime } = usePlayerHealth({
    isGameOver,
    setIsGameOver,
    isPaused,
    position,
    enemies,
    setEnemies,
  });
  const {
    score,
    isShooting,
    resetGame,
    pauseGame,
    handleMouseDown,
    handleMouseUp,
    handlePauseModalClose,
  } = useGameState({
    isGameOver,
    setIsGameOver,
    setBullets,
    setEnemies,
    setPlayerHealth,
    setLastDamageTime,
    setIsPaused,
    setPosition,
    isPaused,
    bullets,
    enemies,
  });

  const { ammunitions } = useAmmunition({
    isGameOver,
    isPaused,
    position,
    bullets,
    setBullets,
  });

  const { medikits } = useMedikits({
    isGameOver,
    isPaused,
    position,
    playerHealth,
    setPlayerHealth,
  });

  useKeyboardEvents({
    isGameOver,
    isPaused,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    pauseGame,
  });

  return (
    <div style={{ padding: 0, position: "relative" }}>
      <Area
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        isShooting={isShooting}
      >
        <Player position={position} health={playerHealth} isPaused={isPaused} />
        {FEATURES.ALLOW_ENEMIES &&
          enemies.map((enemy, index) => (
            <Enemy
              key={index}
              enemy={enemy}
              id={index.toString()}
              isPaused={isPaused}
            />
          ))}
        {FEATURES.ALLOW_POWERUPS &&
          ammunitions.map((ammunition, index) => (
            <Ammo key={index} ammunition={ammunition} />
          ))}
        {FEATURES.ALLOW_POWERUPS &&
          medikits.map((medikit, index) => (
            <PowerUp key={index} powerupPosition={medikit} />
          ))}
      </Area>
      <Hud playerHealth={playerHealth} bullets={bullets} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => moveUp()}>Up</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <button onClick={() => moveLeft()}>Left</button>
        <button onClick={() => moveRight()}>Right</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => moveDown()}>Down</button>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <button style={{ width: "100%" }} onClick={() => pauseGame()}>
          Pause
        </button>
      </div>

      <Modal isOpen={isGameOver} onClose={resetGame}>
        <h2>{score >= WIN_SCORE ? "You Win!" : "Game Over!"}</h2>
        <p>Your score: {score}</p>
        <button onClick={resetGame}>Restart</button>
      </Modal>

      <Modal isOpen={isPaused} onClose={handlePauseModalClose}>
        <h2>Game Paused</h2>
        <button onClick={handlePauseModalClose}>Resume</button>
      </Modal>
    </div>
  );
};

export default Game;
