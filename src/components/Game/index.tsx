import React, { useState, useEffect, useRef } from "react";
import Modal from "../Modal"; // Adjust the path accordingly
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import {
  AMMO_INCREASE,
  DEFAULT_ENEMY_DAMAGE,
  MAX_BULLETS,
  MEDIKIT_HEALTH_INCREASE,
  MIN_BOTTOM_Y,
  MIN_LEFT_X,
  PLAYER_MAX_HEALTH,
  RANDOM_RANGE_INTERVAL,
  WIN_SCORE,
  audio,
} from "../../constants";
import Ammo from "../Ammo";
import Medikit from "../Medikit";
import { Area } from "../Area";
import { Hud } from "../Hud";
import FEATURES from "../../features";
import useSwipe from "../../hooks/useSwipe";

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
    [],
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

  const moveRight = () => {
    setPosition((prev) => ({
      ...prev,
      x: Math.min(MIN_LEFT_X, prev.x + 1),
    }));
  };

  const moveLeft = () => {
    setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }));
  };

  const moveDown = () => {
    setPosition((prev) => ({
      ...prev,
      y: Math.min(MIN_BOTTOM_Y, prev.y + 1),
    }));
  };

  const moveUp = () => {
    setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - 1) }));
  };

  const swipeHandlers = useSwipe({
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
    onSwipedUp: () => moveDown(),
    onSwipedDown: () => moveUp(),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (e.key === " ") {
        setIsPaused((prevPaused) => !prevPaused);
      } else if (!isPaused) {
        switch (e.key) {
          case "w":
          case "ArrowUp":
            moveUp();
            break;
          case "s":
          case "ArrowDown":
            moveDown();
            break;
          case "a":
          case "ArrowLeft":
            moveLeft();
            break;
          case "d":
          case "ArrowRight":
            moveRight();
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
  }, [isGameOver, isPaused, position]);

  useEffect(() => {
    playerPositionRef.current = position;
  }, [position]);

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
          (enemy) => enemy.x === position.x && enemy.y === position.y,
        );
        if (collision) {
          setLastDamageTime(now);
          audio.hit2.volume = 0.1;
          audio.hit2.currentTime = 0;
          audio.hit2.play();
          if (!FEATURES.ALLOW_PLAYER_IMMORTAL)
            setPlayerHealth((prevHealth) =>
              Math.max(prevHealth - DEFAULT_ENEMY_DAMAGE, 0),
            );
          if (playerHealth === 0) setIsGameOver(true);
        }
      }
    }
  }, [enemies, isGameOver, isPaused, playerHealth, position, lastDamageTime]);

  useEffect(() => {
    if (bullets < MAX_BULLETS) {
      const spawnAmmunitionInterval = setInterval(
        () => {
          if (!isGameOver && !isPaused && ammunitions.length === 0) {
            setAmmunitions((prevAmmunitions) => [
              ...prevAmmunitions,
              {
                x: Math.floor(Math.random() * MIN_LEFT_X),
                y: Math.floor(Math.random() * MIN_BOTTOM_Y),
              },
            ]);
          }
        },
        Math.floor(Math.random() * RANDOM_RANGE_INTERVAL[1]) +
          RANDOM_RANGE_INTERVAL[0],
      ); // Random interval between 2 to 7 seconds
      return () => clearInterval(spawnAmmunitionInterval);
    }
  }, [ammunitions.length, bullets, isGameOver, isPaused]);

  useEffect(() => {
    const collectAmmunition = () => {
      const index = ammunitions.findIndex(
        (ammunition) =>
          ammunition.x === position.x && ammunition.y === position.y,
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
              : prevBullets + AMMO_INCREASE,
          );
      }
    };

    collectAmmunition();
  }, [position, ammunitions, bullets]);

  useEffect(() => {
    if (playerHealth <= PLAYER_MAX_HEALTH) {
      const spawnMedikitInterval = setInterval(
        () => {
          if (!isGameOver && !isPaused && medikits.length === 0) {
            setMedikits((prevMedikits) => [
              ...prevMedikits,
              {
                x: Math.floor(Math.random() * MIN_LEFT_X),
                y: Math.floor(Math.random() * MIN_BOTTOM_Y),
              },
            ]);
          }
        },
        Math.floor(Math.random() * RANDOM_RANGE_INTERVAL[1]) +
          RANDOM_RANGE_INTERVAL[0],
      ); // Random interval between 2 to 7 seconds

      return () => clearInterval(spawnMedikitInterval);
    }
  }, [medikits.length, isGameOver, isPaused, playerHealth]);

  useEffect(() => {
    const collectMedikit = () => {
      const index = medikits.findIndex(
        (medikit) => medikit.x === position.x && medikit.y === position.y,
      );
      if (index !== -1) {
        const updatedMedikits = [...medikits];
        updatedMedikits.splice(index, 1);
        setMedikits(updatedMedikits);
        setPlayerHealth((prevHealth) =>
          prevHealth + MEDIKIT_HEALTH_INCREASE > PLAYER_MAX_HEALTH
            ? PLAYER_MAX_HEALTH
            : prevHealth + MEDIKIT_HEALTH_INCREASE,
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

    audio.shoot1.volume = 0.3;
    audio.shoot1.currentTime = 0.2;
    audio.shoot1.play();

    setBullets((prevBullets) => prevBullets - 1);

    const clickedEnemyIndex = enemies.findIndex(
      (enemy) =>
        mouseX >= enemy.x * 20 &&
        mouseX < (enemy.x + 1) * 20 &&
        mouseY >= enemy.y * 20 &&
        mouseY < (enemy.y + 1) * 20,
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
    <div {...swipeHandlers} style={{ padding: 0, position: "relative" }}>
      <Area handleMouseClick={handleMouseClick}>
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
            <Medikit key={index} medikit={medikit} />
          ))}
      </Area>
      <Hud playerHealth={playerHealth} bullets={bullets} />

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
