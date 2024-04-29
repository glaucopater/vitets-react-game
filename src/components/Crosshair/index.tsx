import { FIRE_AVATAR } from "../../constants/index";
import "./Crosshair.css";
export const Crosshairs = ({
  crosshairPos,
  isShooting,
}: {
  crosshairPos: number[];
  isShooting: boolean;
}) => {
  const top = crosshairPos[1] - 35;
  const left = crosshairPos[0] - 85;

  return (
    <>
      <div
        className="outerCrosshair"
        style={{
          top,
          left: left - 3,
        }}
      />
      <div
        className="spark"
        style={{
          display: isShooting ? "block" : "none",
          top: top - 3,
          left: left - 10,
        }}
      >
        {isShooting && (
          <span aria-label="fire" role="img" style={{ fontSize: 30 }}>
            {FIRE_AVATAR}
          </span>
        )}
      </div>
      <div
        className="innerCrosshair"
        style={{
          top: top,
          left: left,
        }}
      />
    </>
  );
};
