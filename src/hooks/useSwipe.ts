import { TouchEvent, useState } from "react";

interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
  onSwipedUp: () => void;
  onSwipedDown: () => void;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export default (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number }[]>([]);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number }[]>([]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    if (e.targetTouches.length === 2) {
      const touches = Array.from(e.targetTouches).map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      }));
      setTouchStart(touches);
      setTouchEnd([]);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.targetTouches.length === 2 && touchStart.length === 2) {
      const touches = Array.from(e.targetTouches).map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      }));
      setTouchEnd(touches);
    }
  };

  const onTouchEnd = () => {
    if (touchStart.length === 2 && touchEnd.length === 2) {
      const deltaX = touchEnd[0].x - touchStart[0].x;
      const deltaY = touchEnd[0].y - touchStart[0].y;
      const isLeftSwipe = deltaX > minSwipeDistance;
      const isRightSwipe = deltaX < -minSwipeDistance;
      const isUpSwipe = deltaY > minSwipeDistance;
      const isDownSwipe = deltaY < -minSwipeDistance;

      if (isLeftSwipe) {
        input.onSwipedLeft();
      }
      if (isRightSwipe) {
        input.onSwipedRight();
      }
      if (isUpSwipe) {
        input.onSwipedUp();
      }
      if (isDownSwipe) {
        input.onSwipedDown();
      }
    }
    setTouchStart([]);
    setTouchEnd([]);
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
