import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      home page

      <Link to={"/contact"}>contact</Link>
      <Link to={"/about"}>about</Link>
    </div>
  );
};

export default HomePage;