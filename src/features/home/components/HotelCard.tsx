import React, { FC } from "react";
import { IGetHotel } from "~/services/api/types.ts";
import Icon from "../../../components/icon/Icon.tsx";
import HotelIcon from "~/assets/icons/hotel.svg";
import StarIcon from "~/assets/icons/star.svg";
import { Link } from "react-router-dom";

interface HotelCardProps {
  hotel: IGetHotel;
}

const HotelCard: FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div
      className={
        "flex w-full h-50 bg-white border border-gray-400 rounded-lg overflow-hidden"
      }
    >
      <div
        className={
          "flex items-center justify-center h-full w-70 border-gray-400 border-l bg-gray-100"
        }
      >
        <Icon src={HotelIcon} width={48} height={48} alt={"hotel icon"} />
      </div>

      <div className={"flex flex-col p-6 justify-between grow"}>
        <Link to={"#"}>
          <h6 className={"font-bold"}> هتل {hotel.name}</h6>
        </Link>

        <p className={'text-sm text-gray-500'}>{hotel.description}</p>

        <div className={"flex gap-2 items-center"}>
          <Icon src={StarIcon} width={12} height={12} alt={"star icon"} />
          <p className={"text-sm"}>{hotel.stars} ستاره</p>
        </div>
      </div>

    </div>
  );
};

export default React.memo(HotelCard);
