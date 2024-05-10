import { useState, useEffect, useRef } from "react";
import { MIN_LEFT_X, MIN_BOTTOM_Y } from "../constants";

export const usePlayerMovement = (initialPosition: {
  x: number;
  y: number;
}) => {
  const [position, setPosition] = useState(initialPosition);
  const playerPositionRef = useRef(initialPosition);

  useEffect(() => {
    playerPositionRef.current = position;
  }, [position]);

  const moveRight = () => {
    setPosition((prev: { x: number; y: number }) => ({
      ...prev,
      x: Math.min(MIN_LEFT_X, prev.x + 1),
    }));
  };

  const moveLeft = () => {
    setPosition((prev: { x: number; y: number }) => ({
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
