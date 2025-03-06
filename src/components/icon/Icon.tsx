import { FC, InputHTMLAttributes } from "react";
import CssFilterConverter from "css-filter-converter";

interface IconProps extends InputHTMLAttributes<HTMLImageElement> {
  color?: string
}

const Icon: FC<IconProps> = ({ alt, ...props }) => {

  return (
    <img
      {...props}
      alt={alt}
      style={{
        filter: props.color ? CssFilterConverter.hexToFilter(props.color).color! : "",
        height: props.height,
        ...props?.style,
      }}
    />
  );
};

export default Icon;
