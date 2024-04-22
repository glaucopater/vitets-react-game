import { render, screen } from "@testing-library/react";
import { Player } from ".";
import { getPlayerAvatar } from "../../helpers";

it("renders Player component without crashing", () => {
  render(<Player position={{ x: 0, y: 0 }} isGameOver={false} />);
});

it("renders Player component with correct aria-label and role properties", () => {
  render(<Player position={{ x: 0, y: 0 }} isGameOver={false} />);
  const playerElement = screen.getByLabelText("player");
  expect(playerElement).toHaveAttribute("role", "img");
});

it("renders Player component with correct font size", () => {
  render(<Player position={{ x: 0, y: 0 }} isGameOver={false} />);
  const playerElement = screen.getByText(getPlayerAvatar(false));
  expect(playerElement).toHaveStyle({ fontSize: "30px" });
});

it("renders Player component with correct avatar when game is over", () => {
  render(<Player position={{ x: 0, y: 0 }} isGameOver={true} />);
  const playerElement = screen.getByText(getPlayerAvatar(true));
  expect(playerElement).toBeInTheDocument();
});
