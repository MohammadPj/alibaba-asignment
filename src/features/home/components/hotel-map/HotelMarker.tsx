import {FC} from 'react';
import {IGetHotel} from "~/services/api/types.ts";
import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import "../../../../assets/icons/hotel.svg"
import HotelMarkerIcon from "~/assets/icons/hotel-marker.png"
import HotelIcon from "~/assets/icons/hotel.svg"
import StarIcon from "~/assets/icons/star.svg"
import Icon from "~/components/icon/Icon.tsx";
import {Link} from "react-router-dom";

interface HotelMarkerProps {
  hotel: IGetHotel
}

const HotelMarker: FC<HotelMarkerProps> = ({hotel}) => {

  const customIcon = new L.Icon({
    iconUrl: HotelMarkerIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <Marker position={hotel.location} icon={customIcon}>
      <Popup>
        <div style={{direction: "rtl"}} className={'flex items-center w-40 gap-2'}>
          <Icon src={HotelIcon} width={32} height={32} />

          <div className={'flex flex-col justify-between'}>
            <Link to={`/${hotel.id}`}>
            <p style={{margin: 0}}>{hotel?.name}</p>
            </Link>

            <div className={'flex items-center gap-2'}>
              <Icon src={StarIcon} width={12} height={12} />
              {hotel.stars} ستاره
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default HotelMarker;