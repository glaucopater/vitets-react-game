const ALLOW_ENEMIES =
  import.meta.env.VITE_ALLOW_ENEMIES === "true" ? true : false;
const ALLOW_POWERUPS =
  import.meta.env.VITE_ALLOW_POWERUPS === "true" ? true : false;
const ALLOW_PLAYER_IMMORTAL =
  import.meta.env.VITE_ALLOW_PLAYER_IMMORTAL === "true" ? true : false;

export default {
  ALLOW_ENEMIES,
  ALLOW_POWERUPS,
  ALLOW_PLAYER_IMMORTAL,
};

console.log({
  ALLOW_ENEMIES,
  ALLOW_POWERUPS,
  ALLOW_PLAYER_IMMORTAL,
});
