import { FC } from "react";
import "./loading.css"

const LoadingComponent: FC = () => {
  return (
    <div className="loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default LoadingComponent;
