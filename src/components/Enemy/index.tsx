export const Enemy = ({ enemy }: { enemy: { x: number; y: number } }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${enemy.y * 20}px`,
        left: `${enemy.x * 20}px`,
        width: "20px",
        height: "20px",
        backgroundColor: "transparent",
      }}
    >
      👽
    </div>
  );
};
