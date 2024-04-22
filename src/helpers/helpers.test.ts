import { getPlayerNextLeft } from "./index";

describe("getPlayerNextLeft", () => {
  it("returns x when nextX is less than or equal to 0 + size", () => {
    const x = 5;
    const playerMovementUnit = 2;
    const size = 3;
    expect(getPlayerNextLeft(x, playerMovementUnit, size)).toBe(x);
  });

  it("returns nextX when nextX is greater than 0 + size", () => {
    const x = 5;
    const playerMovementUnit = 2;
    const size = 1;
    expect(getPlayerNextLeft(x, playerMovementUnit, size)).toBe(
      x - playerMovementUnit
    );
  });
});
