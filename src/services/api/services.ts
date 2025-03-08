import {IGetHotel} from "./types.ts";
import {fetchWithEtag} from "~/services/core/fetchWithEtag.ts";

export const getHotels = (): Promise<IGetHotel[]> => fetchWithEtag("/hotels")

export const getSingleHotel = (id: string): Promise<IGetHotel[]> => fetchWithEtag("/hotels", {params: {id} })