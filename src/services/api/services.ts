import {http} from "../core/http.ts";
import {IGetHotel} from "./types.ts";

export const getHotels = (): Promise<IGetHotel[]> => http.get("/hotels")