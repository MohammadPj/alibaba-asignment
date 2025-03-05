import {Link} from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      about page

      <Link to={"/"}>home</Link>
      <Link to={"/contact"}>contact</Link>
    </div>
  );
};

export default AboutPage;