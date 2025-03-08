import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { IGetHotel } from "~/services/api/types.ts";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HotelCard from "~/features/home/components/HotelCard.tsx"; // To wrap the component with a router for Link testing

// Mocking the Icon component since it's imported in HotelCard
vi.mock("../../../components/icon/Icon.tsx", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("HotelCard component", () => {
  const hotel: IGetHotel = {
      "id": "1",
      "name": "Espinas Palace",
      "description": "Espinas Palace Hotel is a luxurious five-star hotel located in the north of Tehran...",
      "location": {
        "lng": 51.3611,
        "lat": 35.7675
      },
      "stars": 5,
      "comments": [
        {
          "user": "Ali",
          "rating": 5,
          "text": "هتل بسیار عالی با خدمات فوق‌العاده. تجربه‌ای بی‌نظیر داشتم."
        },
        {
          "user": "Sara",
          "rating": 4,
          "text": "اتاق‌ها تمیز و راحت بودند، اما قیمت کمی بالا بود."
        }
      ]
    }

  it("renders hotel name and description", () => {
    render(
      <MemoryRouter>
        <HotelCard hotel={hotel} />
      </MemoryRouter>
    );

    const hotelName = screen.getByText(/هتل Espinas Palace/);
    const hotelDescription = screen.getByText(
      /Espinas Palace Hotel is a luxurious five-star hotel located in the north of Tehran./
    );

    expect(hotelName).toBeInTheDocument();
    expect(hotelDescription).toBeInTheDocument();
  });

  it("displays the hotel and star icons", () => {
    render(
      <MemoryRouter>
        <HotelCard hotel={hotel} />
      </MemoryRouter>
    );

    const hotelIcon = screen.getByAltText("hotel icon");
    const starIcon = screen.getByAltText("star icon");

    expect(hotelIcon).toBeInTheDocument();
    expect(starIcon).toBeInTheDocument();
  });

  it("links to the correct hotel page", () => {
    render(
      <MemoryRouter>
        <HotelCard hotel={hotel} />
      </MemoryRouter>
    );

    const hotelLink = screen.getByRole("link");
    expect(hotelLink).toHaveAttribute("href", "/1");
  });

  it("displays the correct star rating", () => {
    render(
      <MemoryRouter>
        <HotelCard hotel={hotel} />
      </MemoryRouter>
    );

    const starRating = screen.getByText(/5 ستاره/);
    expect(starRating).toBeInTheDocument();
  });
});
