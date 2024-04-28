import hit_1 from "../assets/audio/hit1.wav";
import hit_2 from "../assets/audio/hit2.wav";
import shoot from "../assets/audio/shoot1.wav";

export const PLAYER_AVATAR = "🤨";
export const PLAYER_AVATAR_SICK = "🥵";
export const PLAYER_AVATAR_DEAD = "💀";
export const ENEMY_AVATAR = "👽";
export const FIRE_AVATAR = "🔥";
export const MEDIKIT_AVATAR = "💊";
export const AMMO_AVATAR = "🔫";

// min is 2 for movement
export const ENEMY_MAX_SPEED = 2;
export const DAMAGE_AREA_SIZE = 5;

export const DEFAULT_ENEMY_SIZE = 30;
export const DEFAULT_ENEMY_DAMAGE = 25;
export const DEFAULT_ENEMY_STRIDE = 7;

export const ENEMY_INCREMENT_PER_STAGE = 1;
export const ENEMY_INITIAL_COUNT = 1;
export const INITIAL_STAGE = 0;

export const WIN_SCORE = 20;
export const PLAYER_MAX_HEALTH = 100;

export const MAX_BULLETS = 20;
export const MEDIKIT_HEALTH_INCREASE = 5;
export const AMMO_INCREASE = 5;

export const RANDOM_RANGE_INTERVAL = [5000, 2000];

export const audio = {
  shoot1: new Audio(shoot),
  hit1: new Audio(hit_1),
  hit2: new Audio(hit_2),
};

export const MIN_LEFT_X = 18;
export const MIN_BOTTOM_Y = 18;
