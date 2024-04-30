import { render } from "@testing-library/react";
import { Enemy } from "./";
import { ENEMY_AVATARS } from "../../constants";

it("renders Enemy component without crashing", () => {
  render(<Enemy enemy={{ x: 0, y: 0 }} id={""} isPaused={false} />);
});

it("renders Enemy component with correct aria-label and role properties", () => {
  const { getByLabelText } = render(
    <Enemy enemy={{ x: 0, y: 0 }} id={""} isPaused={false} />
  );
  const enemyElement = getByLabelText("enemy");
  expect(enemyElement).toHaveAttribute("role", "img");
});

it("renders Enemy component with correct font size", () => {
  const { getByText } = render(
    <Enemy enemy={{ x: 0, y: 0 }} id={""} isPaused={false} />
  );
  const enemyElement = getByText(ENEMY_AVATARS[0]);
  expect(enemyElement).toHaveStyle({ fontSize: "20px" });
});

it.skip("renders Enemy component with correct style properties", () => {
  const { getByTestId } = render(
    <Enemy enemy={{ x: 0, y: 0 }} id={""} isPaused={false} />
  );
  const enemyElement = getByTestId("enemy");
  expect(enemyElement).toHaveStyle({
    backgroundColor: "transparent",
    position: "absolute",
  });
});
