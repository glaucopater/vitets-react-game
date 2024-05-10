/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { MIN_LEFT_X, MIN_BOTTOM_Y } from "../constants";

export const usePlayerMovement = (initialPosition: any) => {
  const [position, setPosition] = useState(initialPosition);
  const playerPositionRef = useRef(initialPosition);

  useEffect(() => {
    playerPositionRef.current = position;
  }, [position]);

  const moveRight = () => {
    setPosition((prev: { x: number }) => ({
      ...prev,
      x: Math.min(MIN_LEFT_X, prev.x + 1),
    }));
  };

  const moveLeft = () => {
    setPosition((prev: { x: number }) => ({
      ...prev,
      x: Math.max(0, prev.x - 1),
    }));
  };

  const moveDown = () => {
    setPosition((prev: { y: number }) => ({
      ...prev,
      y: Math.min(MIN_BOTTOM_Y, prev.y + 1),
    }));
  };

  const moveUp = () => {
    setPosition((prev: { y: number }) => ({
      ...prev,
      y: Math.max(0, prev.y - 1),
    }));
  };

  return {
    position,
    playerPositionRef,
    moveRight,
    moveLeft,
    moveDown,
    moveUp,
    setPosition,
  };
};
