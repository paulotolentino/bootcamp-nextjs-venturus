import { render, screen } from "@testing-library/react";
import MainMenu from "./MainMenu";

describe("MainMenu.tsx", () => {
  it("Should render MainMenu", () => {
    render(<MainMenu />);

    expect(screen.getByText("Next Blog")).toBeTruthy();
  });
});
