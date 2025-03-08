import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CssFilterConverter from "css-filter-converter";
import Icon from "~/components/icon/Icon.tsx";

vi.mock("css-filter-converter", () => ({
  default: {
    hexToFilter: vi.fn(() => ({ color: "brightness(0) saturate(100%)" }))
  }
}));

describe("Icon component", () => {
  it("renders an image with the given alt text", () => {
    render(<Icon src="/logo.png" alt="Logo" />);
    const imgElement = screen.getByAltText("Logo");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "/logo.png");
  });

  it("applies the correct filter when a color is provided", () => {
    render(<Icon src="/icon.png" alt="Colored Icon" color="#ff0000" />);
    const imgElement = screen.getByAltText("Colored Icon");
    expect(CssFilterConverter.hexToFilter).toHaveBeenCalledWith("#ff0000");
    expect(imgElement).toHaveStyle("filter: brightness(0) saturate(100%)");
  });

  it("applies custom styles correctly", () => {
    render(
      <Icon
        src="/custom.png"
        alt="Custom Styled Icon"
        style={{ borderRadius: "10px", width: "50px" }}
      />
    );
    const imgElement = screen.getByAltText("Custom Styled Icon");
    expect(imgElement).toHaveStyle("border-radius: 10px");
    expect(imgElement).toHaveStyle("width: 50px");
  });

  it("respects the height prop", () => {
    render(<Icon src="/height.png" alt="Height Icon" height="40px" />);
    const imgElement = screen.getByAltText("Height Icon");
    expect(imgElement).toHaveStyle("height: 40px");
  });
});