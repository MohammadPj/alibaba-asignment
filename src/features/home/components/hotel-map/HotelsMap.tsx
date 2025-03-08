"use client";
import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HotelMarker from "~/features/home/components/hotel-map/HotelMarker.tsx";
import {IGetHotel} from "~/services/api/types.ts";

export interface HotelsMapProps {
  hotels?: IGetHotel[];
}

const HotelsMap: FC<HotelsMapProps> = ({hotels}) => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <div className={"w-full h-50 overflow-hidden"}>
        <MapContainer
          center={hotels?.[0]?.location || { lat: 35.7219, lng: 51.3347 }}
          style={{
            height: 200,
          }}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {hotels?.map((hotel) => <HotelMarker hotel={hotel} />)}
          {/*<LocationMarker />*/}
        </MapContainer>
        ,
      </div>
    );

  return null;
};

export default HotelsMap;
