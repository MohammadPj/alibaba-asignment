import { FC, lazy, Suspense } from "react";
import TextField from "../../components/input/TextField.tsx";
import { debounce } from "~/utils/helpers.ts";
import { useSearchParams } from "react-router-dom";
import LoadingComponent from "~/components/loading-components/LoadingComponent.tsx";

const HotelList = lazy(() => import("./components/HotelList.tsx"));

const HomePresenter: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (value: string) => {
    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const debounceSearch = debounce(handleSearch, 1000);

  return (
    <div className={"w-full flex flex-col gap-4"}>
      <div className={"flex justify-between items-center"}>
        <h2 className={"text-lg font-bold"}>رزرو هتل در تهران</h2>

        <div>
          <TextField
            placeholder={"جستجو ..."}
            withoutHelperText
            inputProps={{
              onChange: (e) => debounceSearch(e.target.value),
              defaultValue: searchParams.get("search") || "",
            }}
          />
        </div>
      </div>

      <Suspense fallback={<LoadingComponent />}>
        <HotelList />
      </Suspense>
    </div>
  );
};

export default HomePresenter;
