import {Link, useParams} from "react-router-dom";

const HotelDetailPage = () => {
  const params = useParams()

  console.log('params', params)

  return (
    <div>
      <p>hotel detail</p>
      <Link to={"/"}>home page</Link>
    </div>
  );
};

export default HotelDetailPage;
