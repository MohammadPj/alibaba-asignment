import { useQuery } from "@tanstack/react-query";
import { getHotels } from "./services.ts";

export const useGetHotels = () =>
  useQuery({ queryKey: ["hotels"], queryFn: getHotels, staleTime: 15 * 60 * 1000 });
