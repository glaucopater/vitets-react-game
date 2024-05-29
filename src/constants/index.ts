export const PLAYER_AVATAR = "🤨";
export const PLAYER_AVATAR_SICK = "🥵";
export const PLAYER_AVATAR_DEAD = "💀";
export const ENEMY_AVATARS = ["👽", "👾"];
export const FIRE_AVATAR = "🔥";
export const TARGET_AVATAR = "💢";
export const POWERUPS_AVATARS = [
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍒",
  "🍑",
  "🍍",
  "🍰",
  "🍭",
];
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

export const MIN_LEFT_X = 18;
export const MIN_BOTTOM_Y = 18;

import powerup from "../assets/audio/power-up-sparkle-1-177983.mp3";
import loadAmmo from "../assets/audio/rifle-or-shotgun-reload-6787.mp3";
import shotgun from "../assets/audio/080902_shotgun-39753.mp3";
import damage from "../assets/audio/male_hurt7-48124.mp3";

export const audio = {
  powerup: new Audio(powerup),
  loadAmmo: new Audio(loadAmmo),
  shotgun: new Audio(shotgun),
  damage: new Audio(damage),
};
