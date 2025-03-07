import {FC} from 'react';
import {IGetHotel} from "~/services/api/types.ts";
import {Marker} from "react-leaflet";
import L from "leaflet";
import "../../../../assets/icons/hotel.svg"
import HotelIcon from "~/assets/icons/hotel-marker.png"

interface HotelMarkerProps {
  hotel: IGetHotel
}

const HotelMarker: FC<HotelMarkerProps> = ({hotel}) => {

  const customIcon = new L.Icon({
    iconUrl: HotelIcon, // لینک تصویر آیکون
    iconSize: [40, 40], // اندازه آیکون (عرض و ارتفاع)
    iconAnchor: [20, 40], // نقطه‌ی لنگر (مرکز آیکون نسبت به موقعیت جغرافیایی)
    popupAnchor: [0, -40], // محل نمایش پاپ‌آپ نسبت به آیکون
  });

  return (
    <Marker position={hotel.location} icon={customIcon}>

    </Marker>
  );
};

export default HotelMarker;