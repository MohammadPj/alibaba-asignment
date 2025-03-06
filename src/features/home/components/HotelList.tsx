import {FC} from 'react';
import {useGetHotels} from "../../../services/api/hooks.ts";

const HotelList: FC = () => {

  const {data: hotels} = useGetHotels()
  console.log('hotels', hotels)

  return (
    <div className={'flex flex-col gap-4'}>

    </div>
  );
};

export default HotelList;