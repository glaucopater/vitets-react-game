import { useState } from "react";
import "./Area.css";
import CustomCursor from "../CustomCursor";
export const Area = ({
  handleMouseDown,
  handleMouseUp,
  isShooting,
  children,
}: {
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
  isShooting: boolean;
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className="area"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && <CustomCursor isShooting={isShooting} />}
      {children}
    </div>
  );
};
