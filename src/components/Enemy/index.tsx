import { ENEMY_AVATAR } from "../../constants";

export const Enemy = ({
  enemy,
  id,
}: {
  enemy: { x: number; y: number };
  id: string;
}) => {
  return (
    <div
      id={`enemy-${id}`}
      data-testid={`enemy-${id}`}
      style={{
        position: "absolute",
        top: `${enemy.y * 20}px`,
        left: `${enemy.x * 20}px`,
        width: "20px",
        height: "20px",
        backgroundColor: "transparent",
      }}
    >
      <span aria-label="enemy" role="img" style={{ fontSize: 20 }}>
        {ENEMY_AVATAR}
      </span>
    </div>
  );
};
