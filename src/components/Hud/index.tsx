export const Hud = ({
  playerHealth,
  bullets,
}: {
  playerHealth: number;
  bullets: number;
}) => {
  return (
    <div className="hud">
      <div>Health: {playerHealth}</div>
      <div>Bullets: {bullets}</div>
    </div>
  );
};
