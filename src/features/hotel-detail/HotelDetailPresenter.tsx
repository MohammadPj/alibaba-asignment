import { FC, lazy, Suspense, useEffect, useState } from "react";
import { useGetSingleHotel } from "~/services/api/hooks.ts";
import { useParams } from "react-router-dom";
import { HotelsMapProps } from "~/features/home/components/hotel-map/HotelsMap.tsx";
import Icon from "~/components/icon/Icon.tsx";
import StarIcon from "~/assets/icons/star.svg";

const CommentCard = lazy(
  () => import("~/features/hotel-detail/components/CommentCard.tsx"),
);

const HotelDetailPresenter: FC = () => {
  const params = useParams();
  const { data: hotels } = useGetSingleHotel(params?.hotelId as string);
  const hotel = hotels?.[0];

  const [MapComponent, setMapComponent] = useState<FC<HotelsMapProps> | null>(
    null,
  );

  useEffect(() => {
    import("~/features/home/components/hotel-map/HotelsMap.tsx").then((mod) =>
      setMapComponent(() => mod.default),
    );
  }, []);

  return (
    <div className={"w-full flex flex-col gap-4"}>
      <div
        className={"w-full h-50 flex justify-center items-center bg-gray-50"}
      >
        <Suspense fallback={<div>loading map</div>}>
          {MapComponent ? <MapComponent hotels={hotels} /> : ""}
        </Suspense>
      </div>

      <p>هتل {hotel?.name}</p>

      <div className={"flex gap-2 items-center"}>
        <Icon src={StarIcon} width={12} height={12} alt={"star icon"} />
        <p className={"text-sm"}>{hotel?.stars} ستاره</p>
      </div>

      <p>توضیحات:</p>
      <p className={"text-sm text-secondary"}>{hotel?.description}</p>

      <p>نظرات:</p>

      <div className={"flex flex-col gap-2"}>
        {hotel?.comments.map((c) => (
          <Suspense>
            <CommentCard comment={c} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default HotelDetailPresenter;
