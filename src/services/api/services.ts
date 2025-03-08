import {http} from "../core/http.ts";
import {IGetHotel} from "./types.ts";

export const getHotels = (): Promise<IGetHotel[]> => http.get("/hotels")

export const getSingleHotel = (id: string): Promise<IGetHotel[]> => http.get("/hotels", {params: {id} })