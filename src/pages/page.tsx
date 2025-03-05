import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      home page

      <div className={'bg-red-500'}>
        salam
      </div>

      <Link to={"/contact"}>contact</Link>
      <Link to={"/123"}>detail</Link>
    </div>
  );
};

export default HomePage;