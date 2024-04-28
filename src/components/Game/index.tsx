import React, { useState, useEffect, useRef } from "react";
import Modal from "../Modal"; // Adjust the path accordingly
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import {
  AMMO_INCREASE,
  DEFAULT_ENEMY_DAMAGE,
  MAX_BULLETS,
  MEDIKIT_HEALTH_INCREASE,
  PLAYER_MAX_HEALTH,
  RANDOM_RANGE_INTERVAL,
  WIN_SCORE,
  audio,
} from "../../constants";
import Ammo from "../Ammo";
import Medikit from "../Medikit";

const Game = () => {
  const [position, setPosition] = useState({ x: 9, y: 9 });
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);
  const [playerHealth, setPlayerHealth] = useState(PLAYER_MAX_HEALTH);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastDamageTime, setLastDamageTime] = useState<number | null>(null); // Track the last time the player took damage
  const playerPositionRef = useRef({ x: 9, y: 9 });
  const [bullets, setBullets] = useState<number>(MAX_BULLETS);
  const [ammunitions, setAmmunitions] = useState<{ x: number; y: number }[]>(
    []
  );
  const [medikits, setMedikits] = useState<{ x: number; y: number }[]>([]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (e.key === " ") {
        setIsPaused((prevPaused) => !prevPaused);
      } else if (!isPaused) {
        switch (e.key) {
          case "w":
          case "ArrowUp":
            setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - 1) }));
            break;
          case "s":
          case "ArrowDown":
            setPosition((prev) => ({ ...prev, y: Math.min(19, prev.y + 1) }));
            break;
          case "a":
          case "ArrowLeft":
            setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }));
            break;
          case "d":
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
    playerPositionRef.current = position;
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

          return {
            x: enemy.x + directionX,
            y: enemy.y + directionY,
          };
        });
        setEnemies(newEnemies);
      }
    }, 1000);

    return () => clearInterval(moveInterval);
  }, [enemies, isGameOver, isPaused]);

  useEffect(() => {
    if (!isGameOver && !isPaused && playerHealth >= 0) {
      const now = Date.now();
      if (lastDamageTime === null || now - lastDamageTime > 1000) {
        const collision = enemies.some(
          (enemy) => enemy.x === position.x && enemy.y === position.y
        );
        if (collision) {
          setLastDamageTime(now);
          audio.hit2.volume = 0.1;
          audio.hit2.currentTime = 0;
          audio.hit2.play();
          setPlayerHealth((prevHealth) =>
            Math.max(prevHealth - DEFAULT_ENEMY_DAMAGE, 0)
          );
          if (playerHealth === 0) setIsGameOver(true);
        }
      }
    }
  }, [enemies, isGameOver, isPaused, playerHealth, position, lastDamageTime]);

  useEffect(() => {
    if (bullets < MAX_BULLETS) {
      const spawnAmmunitionInterval = setInterval(() => {
        if (!isGameOver && !isPaused && ammunitions.length === 0) {
          setAmmunitions((prevAmmunitions) => [
            ...prevAmmunitions,
            {
              x: Math.floor(Math.random() * 20),
              y: Math.floor(Math.random() * 20),
            },
          ]);
        }
      }, Math.floor(Math.random() * RANDOM_RANGE_INTERVAL[1]) + RANDOM_RANGE_INTERVAL[0]); // Random interval between 2 to 7 seconds
      return () => clearInterval(spawnAmmunitionInterval);
    }
  }, [ammunitions.length, bullets, isGameOver, isPaused]);

  useEffect(() => {
    const collectAmmunition = () => {
      const index = ammunitions.findIndex(
        (ammunition) =>
          ammunition.x === position.x && ammunition.y === position.y
      );
      if (index !== -1) {
        const updatedAmmunitions = [...ammunitions];
        updatedAmmunitions.splice(index, 1);
        audio.hit1.currentTime = 0.2;
        audio.hit1.play();
        setAmmunitions(updatedAmmunitions);
        if (bullets < MAX_BULLETS)
          setBullets((prevBullets) =>
            prevBullets + AMMO_INCREASE > MAX_BULLETS
              ? MAX_BULLETS
              : prevBullets + AMMO_INCREASE
          );
      }
    };

    collectAmmunition();
  }, [position, ammunitions, bullets]);

  useEffect(() => {
    if (playerHealth <= PLAYER_MAX_HEALTH) {
      const spawnMedikitInterval = setInterval(() => {
        if (!isGameOver && !isPaused && medikits.length === 0) {
          setMedikits((prevMedikits) => [
            ...prevMedikits,
            {
              x: Math.floor(Math.random() * 20),
              y: Math.floor(Math.random() * 20),
            },
          ]);
        }
      }, Math.floor(Math.random() * RANDOM_RANGE_INTERVAL[1]) + RANDOM_RANGE_INTERVAL[0]); // Random interval between 2 to 7 seconds

      return () => clearInterval(spawnMedikitInterval);
    }
  }, [medikits.length, isGameOver, isPaused, playerHealth]);

  useEffect(() => {
    const collectMedikit = () => {
      const index = medikits.findIndex(
        (medikit) => medikit.x === position.x && medikit.y === position.y
      );
      if (index !== -1) {
        const updatedMedikits = [...medikits];
        updatedMedikits.splice(index, 1);
        setMedikits(updatedMedikits);
        setPlayerHealth((prevHealth) =>
          prevHealth + MEDIKIT_HEALTH_INCREASE > PLAYER_MAX_HEALTH
            ? PLAYER_MAX_HEALTH
            : prevHealth + MEDIKIT_HEALTH_INCREASE
        );
      }
    };

    collectMedikit();
  }, [position, ammunitions, medikits]);

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isGameOver || isPaused || bullets === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    audio.shoot1.currentTime = 0.2;
    audio.shoot1.play();
    setBullets((prevBullets) => prevBullets - 1);

    const clickedEnemyIndex = enemies.findIndex(
      (enemy) =>
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

  useEffect(() => {
    if (score >= WIN_SCORE) {
      setIsGameOver(true);
    }
  }, [score]);

  const handlePauseModalClose = () => {
    setIsPaused(false);
  };

  return (
    <div>
      <div className="hud">
        <div>Health: {playerHealth}</div>
        <div>Bullets: {bullets}</div>
      </div>
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "400px",
          border: "1px solid black",
          background: "lightgray",
          cursor: "crosshair",
        }}
        onClick={handleMouseClick}
      >
        <Player position={position} health={playerHealth} />
        {enemies.map((enemy, index) => (
          <Enemy key={index} enemy={enemy} id={index.toString()} />
        ))}
        {ammunitions.map((ammunition, index) => (
          <Ammo key={index} ammunition={ammunition} />
        ))}
        {medikits.map((medikit, index) => (
          <Medikit key={index} medikit={medikit} />
        ))}
      </div>

      <Modal isOpen={isGameOver} onClose={resetGame}>
        <h2>{score >= 20 ? "You Win!" : "Game Over!"}</h2>
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
