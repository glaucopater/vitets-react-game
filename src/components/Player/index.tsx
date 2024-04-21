import { getPlayerAvatar } from "../../helpers";

export const Player = ({
  position,
  isGameOver,
}: {
  position: { x: number; y: number };
  isGameOver: boolean;
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
        {getPlayerAvatar(isGameOver)}
      </span>
    </div>
  );
};
