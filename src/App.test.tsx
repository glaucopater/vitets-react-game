import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders App component without crashing", () => {
  render(<App />);
});

it("displays 'Made with love by GP' text", () => {
  render(<App />);
  expect(screen.getByText("Made with love by GP")).toBeTruthy();
});
