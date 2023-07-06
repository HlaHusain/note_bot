import { Image } from "./Image";

export const Logo = ({ width = 50, height = 50, src, ...rest }) => {
  return <Image {...rest} width={width} height={height} src={src} />;
};
