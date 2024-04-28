import { getPlayerAvatar } from "../../helpers";
import "./Player.css";
export const Player = ({
  position,
  health,
  isPaused,
}: {
  position: { x: number; y: number };
  health: number;
  isPaused: boolean;
}) => {
  return (
    <div
      className={"player" + (!(isPaused || health <= 0) ? " breath" : "")}
      style={{
        top: `${position.y * 20}px`,
        left: `${position.x * 20}px`,
      }}
    >
      <span aria-label="player" role="img" style={{ fontSize: 30 }}>
        {getPlayerAvatar(health)}
      </span>
    </div>
  );
};
