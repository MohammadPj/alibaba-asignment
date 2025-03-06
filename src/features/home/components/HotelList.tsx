import { FC, useMemo } from "react";
import { useGetHotels } from "~/services/api/hooks.ts";
import HotelCard from "./HotelCard.tsx";
import { useSearchParams } from "react-router-dom";

const HotelList: FC = () => {
  const [searchParams] = useSearchParams();
  const { data: hotels } = useGetHotels();

  const search = searchParams.get("search");

  const filteredHotel = useMemo(
    () =>
      search
        ? hotels?.filter(
            (hotel) => hotel?.name?.toLowerCase()?.search(search) > -1,
          )
        : hotels,
    [search, hotels],
  );

  return (
    <div className={"flex flex-col gap-4 w-full"}>
      {filteredHotel?.map((hotel) => <HotelCard hotel={hotel} />)}
    </div>
  );
};

export default HotelList;
