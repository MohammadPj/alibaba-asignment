import {Link} from "react-router-dom";

const ContactPage = () => {
  return (
    <div>
      contact page

      <Link to={"/"}>home</Link>
      <Link to={"/about"}>about</Link>
    </div>
  );
};

export default ContactPage;