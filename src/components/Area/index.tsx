import { useState } from "react";
import { Crosshairs } from "../Crosshair";
import "./Area.css";
export const Area = ({
  handleMouseDown,
  handleMouseUp,
  isShooting,
  children,
}: {
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
  isShooting: boolean
  children: React.ReactNode;
}) => {
  const [crosshairPos, setCrosshairPos] = useState([0, 0]);

  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCrosshairPos([e.clientX, e.clientY])
  }



  return (
    <div className="area" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
      onMouseMove={handleOnMouseMove}
    >
      <Crosshairs
        isShooting={isShooting}
        crosshairPos={crosshairPos}
      />
      {children}
    </div>
  );
};
