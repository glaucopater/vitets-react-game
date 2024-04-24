import { getPlayerAvatar } from "../../helpers";

export const Player = ({
  position,
  health,
}: {
  position: { x: number; y: number };
  health: number;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y * 20}px`,
        left: `${position.x * 20}px`,
        width: "20px",
        height: "20px",
        backgroundColor: "transparent",
      }}
    >
      <span aria-label="player" role="img" style={{ fontSize: 30 }}>
        {getPlayerAvatar(health)}
      </span>
    </div>
  );
};
