import { useState, useEffect } from 'react';

// 0,0 -> 18, 18

// 401.47 x 401.47

const convertPositionToPixels0 = (position: { x: number; y: number }) => {
  if (position.x === 0 && position.y === 0) return { x: 2600 / 18, y: 900 / 18 };
  if (position.x === 0 && position.y === 1) return { x: 2600 / 18, y: 1000 / 18 };
  if (position.x === 1 && position.y === 0) return { x: 2800 / 18, y: 900 / 18 };
  if (position.x === 1 && position.y === 1) return { x: 2800 / 18, y: 1000 / 18 };
  if (position.x === 18 && position.y === 0) return { x: 9400 / 18, y: 900 / 18 };
  if (position.x === 18 && position.y === 18) return { x: 9000 / 18, y: 8000 / 18 };
  if (position.x === 0 && position.y === 18) return { x: 2600 / 18, y: 8000 / 18 };

  return { x: Math.ceil((position.x * 530) / 18), y: Math.ceil((position.y * 620) / 18) };
};

const convertPositionToPixels1 = (position: { x: number; y: number; }) => {
  const { x, y } = position;
  const xOffset = x === 0 ? 2600 : x === 18 ? 9400 : 2600 + (x * 100);
  const yOffset = y === 0 ? 900 : y === 18 ? 8000 : 900 + (y * 100);

  return {
    x: xOffset / 18,
    y: yOffset / 18,
  };
};

const convertPositionToPixels = (position: { x: number; y: number }) => {
  const baseX = 2600;
  const baseY = 900;
  const incrementX = 200; // Difference in base x values for neighboring positions
  const incrementY = 100; // Difference in base y values for neighboring positions

  // Scale factor for dividing the computed values
  const scaleFactor = 18;

  const x = (baseX + position.x * incrementX) / scaleFactor;
  const y = (baseY + position.y * incrementY) / scaleFactor;

  return { x, y };
};

// Example usag

const useLineToMouse = ({
  startingPosition,
}: {
  startingPosition: { x: number; y: number };
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number }>(
    convertPositionToPixels(startingPosition),
  );

  useEffect(() => {
    console.log('useEffect', startingPosition, convertPositionToPixels(startingPosition));
    setPlayerPosition(convertPositionToPixels(startingPosition));
  }, [startingPosition]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // clearInterval(intervalId);
    };
  }, []);

  console.log(startingPosition);

  return { mousePosition, playerPosition };
};

export default useLineToMouse;
