import React from "react";
import { MEDIKIT_AVATAR } from "../../constants";

interface MedikitProps {
  medikit: { x: number; y: number };
}

const Medikit = ({ medikit }: MedikitProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${medikit.x * 20}px`,
        top: `${medikit.y * 20}px`,
        width: "20px",
        height: "20px",
      }}
    >
      <span aria-label="medikit" role="img" style={{ fontSize: 20 }}>
        {MEDIKIT_AVATAR}
      </span>
    </div>
  );
};

export default Medikit;
