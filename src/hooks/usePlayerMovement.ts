import { useState, useEffect, useRef } from "react";
import { MIN_LEFT_X, MIN_BOTTOM_Y } from "../constants";
import { Position } from "../types";

export const usePlayerMovement = (initialPosition: Position) => {
  const [position, setPosition] = useState(initialPosition);
  const playerPositionRef = useRef(initialPosition);

  useEffect(() => {
    playerPositionRef.current = position;
  }, [position]);

  const moveRight = () => {
    setPosition((prev: Position) => ({
      ...prev,
      x: Math.min(MIN_LEFT_X, prev.x + 1),
    }));
  };

  const moveLeft = () => {
    setPosition((prev: Position) => ({
      ...prev,
      x: Math.max(0, prev.x - 1),
    }));
  };

  const moveDown = () => {
    setPosition((prev: { y: number; x: number }) => ({
      ...prev,
      y: Math.min(MIN_BOTTOM_Y, prev.y + 1),
    }));
  };

  const moveUp = () => {
    setPosition((prev: { y: number; x: number }) => ({
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
