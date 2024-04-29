import { FIRE_AVATAR } from "../../constants/index";
import "./Crosshair.css";
export const Crosshairs = ({ crosshairPos, isShooting }: { crosshairPos: number[], isShooting: boolean }) => {



  const top = crosshairPos[1] - 25;
  const left = crosshairPos[0] - 75;

  return (
    <>
      <div
        className="outerCrosshair"
        style={{
          top,
          left
        }}
      />
      <div
        className="spark"
        style={{
          display: isShooting ? "block" : "none",
          top: top - 5,
          left: left - 10
        }}
      >
        {isShooting &&
          <span aria-label="fire" role="img" style={{ fontSize: 30 }}>
            {FIRE_AVATAR}
          </span>}
      </div>
      <div
        className="innerCrosshair"
        style={{
          top,
          left
        }}
      />
    </>
  );
}


