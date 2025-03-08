import { useQuery } from "@tanstack/react-query";
import { getHotels, getSingleHotel } from "./services.ts";

export const useGetHotels = () =>
  useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
    staleTime: 15 * 60 * 1000,
  });

export const useGetSingleHotel = (id: string) =>
  useQuery({
    queryKey: ["single-hotel", id],
    queryFn: () => getSingleHotel(id),
    staleTime: 15 * 60 * 1000,
  });
