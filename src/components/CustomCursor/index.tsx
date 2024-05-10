import { useState, useEffect } from "react";
import "./CustomCursor.css";
import { FIRE_AVATAR, TARGET_AVATAR } from "../../constants";
import "./CustomCursor.css";

export const CustomCursor = ({ isShooting }: { isShooting: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        left: position.x - 20,
        top: position.y - 25,
      }}
    >
      <span
        aria-label="fire"
        role="img"
        style={{
          fontSize: 30,
          opacity: isShooting ? 1 : 0.5,
        }}
      >
        {isShooting ? FIRE_AVATAR : TARGET_AVATAR}
      </span>
    </div>
  );
};

export default CustomCursor;
