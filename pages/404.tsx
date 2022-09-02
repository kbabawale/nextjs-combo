import Image from 'next/image';
import { memo } from 'react';
import notfound from '../public/notfound.svg';

const Custom404 = memo(() => {
  return (
    <div
      className={`d-flex flex-column h-90 align-items-center justify-content-center border`}
    >
      <Image className="" src={notfound} alt="404" />
      <span className="text-2 text-uppercase fw-700 color-primary mt-5">
        Page not found
      </span>
    </div>
  );
});

export default Custom404;
