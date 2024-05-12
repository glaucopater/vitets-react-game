import {
  ENEMY_MAX_SPEED,
  PLAYER_AVATAR,
  PLAYER_AVATAR_DEAD,
  PLAYER_AVATAR_SICK,
  audio,
} from "../constants";
export const hasWindow = typeof window !== "undefined";

export function getWindowDimensions() {
  const width = hasWindow ? window.innerWidth : 0;
  const height = hasWindow ? window.innerHeight : 0;

  return {
    width,
    height,
  };
}

export const getWindowSize = () => {
  return { width: window.pageXOffset, height: window.pageYOffset };
};

//generate random rgb number in range
// r
// g
// b
export const getRandomRGBColor = () => {
  return `rgb(${~~(Math.random() * 105) + 150}, ${~~(Math.random() * 80)}, ${~~(
    Math.random() * 32
  )})`;
};

export const getRandomSpeed = (stride: number) => {
  return stride + ~~(Math.random() * 10);
};

export const getRandomPosition = (size: number) => {
  const { height, width } = getWindowDimensions();
  const X = Math.random() < 0.5 ? 0 : width - size * 2;
  const Y = ~~(Math.random() * (height - size * 2));
  return [X, Y];
};

export const getRandomMove = (speed = ENEMY_MAX_SPEED) => {
  return ~~(Math.random() * speed);
};

export const getPlayerAvatar = (health: number) => {
  if (health === 0) return PLAYER_AVATAR_DEAD;
  if (health < 50) return PLAYER_AVATAR_SICK;
  return PLAYER_AVATAR;
};

export const getPlayerNextUp = (
  y: number,
  playerMovementUnit: number,
  size: number
) => {
  const nextY = y - playerMovementUnit;
  return nextY <= 0 + size ? y : nextY;
};

export const getPlayerNextDown = (
  y: number,
  playerMovementUnit: number,
  size: number
) => {
  const nextY = y + playerMovementUnit;

  return nextY >= getWindowDimensions().height - size * 30 ? y : nextY;
};

export const getPlayerNextRight = (
  x: number,
  playerMovementUnit: number,
  size: number
) => {
  const nextX = x + playerMovementUnit;
  return nextX >= getWindowDimensions().width - size * 10 ? x : nextX;
};

export const getPlayerNextLeft = (
  x: number,
  playerMovementUnit: number,
  size: number
) => {
  const nextX = x - playerMovementUnit;
  return nextX <= 0 + size ? x : nextX;
};

export function playSound(
  soundName: string,
  volume: number = 0.3,
  startTime: number = 0
) {
  const sound = audio[soundName as keyof typeof audio];
  if (sound) {
    sound.volume = volume;
    sound.currentTime = startTime;
    sound.play();
  } else {
    console.warn(`Sound "${soundName}" not found.`);
  }
}
