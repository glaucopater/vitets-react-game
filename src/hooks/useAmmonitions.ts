/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  MAX_BULLETS,
  AMMO_INCREASE,
  RANDOM_RANGE_INTERVAL,
  audio,
  MIN_LEFT_X,
  MIN_BOTTOM_Y,
} from "../constants";

type UseAmmunitionProps = {
  isGameOver: boolean;
  isPaused: boolean;
  position: any;
  bullets: any;
  setBullets: any;
};

export const useAmmunition = ({
  isGameOver,
  isPaused,
  position,
  bullets,
  setBullets,
}: UseAmmunitionProps) => {
  const [ammunitions, setAmmunitions] = useState<{ x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    if (bullets < MAX_BULLETS) {
      const spawnAmmunitionInterval = setInterval(() => {
        if (!isGameOver && !isPaused && ammunitions.length === 0) {
          setAmmunitions((prevAmmunitions) => [
            ...prevAmmunitions,
            {
              x: Math.floor(Math.random() * MIN_LEFT_X),
              y: Math.floor(Math.random() * MIN_BOTTOM_Y),
            },
          ]);
        }
      }, Math.floor(Math.random() * RANDOM_RANGE_INTERVAL[1]) + RANDOM_RANGE_INTERVAL[0]);

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
          setBullets((prevBullets: number) =>
            prevBullets + AMMO_INCREASE > MAX_BULLETS
              ? MAX_BULLETS
              : prevBullets + AMMO_INCREASE
          );
      }
    };
    collectAmmunition();
  }, [position, ammunitions, bullets, setBullets]);

  return { ammunitions, setAmmunitions };
};