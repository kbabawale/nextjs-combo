import { memo } from 'react';
import { Oval } from 'react-loader-spinner';

type AppProps = {
  color?: string;
  visible?: boolean;
  height?: number;
  width?: number;
};

const Loader = memo<AppProps>(
  ({
    visible = false,
    width = 80,
    height = 80,
    color = '#7f1323',
  }: AppProps) => {
    let render = () => {
      if (visible) {
        return <Oval color={color} height={height} width={width} />;
      } else {
        return <></>;
      }
    };
    return render();
  }
);

export default Loader;
