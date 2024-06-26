/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { getPlayerAvatar } from "../../helpers";
import "./Player.css";

type PlayerProps = {
  position: { x: number; y: number };
  health: number;
  isPaused: boolean;
  setRefPlayerPosition: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;

  refPlayerPosition: HTMLDivElement | null;
};

export const Player = ({
  position,
  health,
  isPaused,
  setRefPlayerPosition,
  refPlayerPosition,
}: PlayerProps) => {
  const ref = useRef<HTMLDivElement>(refPlayerPosition);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      setRefPlayerPosition(ref.current);
    }
  }, [position, setRefPlayerPosition]);

  return (
    <div
      ref={ref}
      className={"player" + (!(isPaused || health <= 0) ? " breath" : "")}
      style={{
        top: `${position.y * 20}px`,
        left: `${position.x * 20}px`,
      }}
    >
      <span aria-label="player" role="img" style={{ fontSize: 30 }}>
        {getPlayerAvatar(health)}
      </span>
    </div>
  );
};
