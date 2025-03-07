"use client";
import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGetHotels } from "~/services/api/hooks.ts";
import HotelMarker from "~/features/home/components/hotel-map/HotelMarker.tsx";

const HotelsMap: FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { data: hotels } = useGetHotels();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <div className={"w-full h-50 overflow-hidden"}>
        <MapContainer
          center={{ lat: 35.7219, lng: 51.3347 }}
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
