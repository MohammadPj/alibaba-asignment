import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as service from "~/services/api/services";
import { vi } from "vitest";
import {useGetHotels} from "~/services/api/hooks.ts";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGetHotels hook", () => {
  it("fetches and returns hotel data correctly", async () => {
    const getHotelsSpy = vi.spyOn(service, "getHotels").mockResolvedValue([
      {
        id: "1",
        name: "Hotel One",
        description: "A nice hotel",
        location: { lat: 35.6895, lng: 139.6917 },
        stars: 5,
        comments: [{ user: "John", rating: 4, text: "Great place!" }],
      },
    ]);

    const { result } = renderHook(() => useGetHotels(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([
      {
        id: "1",
        name: "Hotel One",
        description: "A nice hotel",
        location: { lat: 35.6895, lng: 139.6917 },
        stars: 5,
        comments: [{ user: "John", rating: 4, text: "Great place!" }],
      },
    ]);

    getHotelsSpy.mockRestore();
  });
});