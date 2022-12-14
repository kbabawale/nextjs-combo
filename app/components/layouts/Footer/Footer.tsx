import Link from 'next/link';
import { memo } from 'react';

const Footer = memo(() => {
  return (
    <footer
      className={`mb-4 w-100 d-flex align-items-center justify-content-center text-center position-absolute bottom-0`}
    >
      <div className={`w-50 text-09 color-gray-600 fw-500`}>
        Brand Manager, Brand, Brand are registered products of Brand LLC read{' '}
        <Link href="/">
          <a>Terms & Conditions</a>
        </Link>{' '}
        or contact{' '}
        <Link href="/">
          <a>Brand Support</a>
        </Link>{' '}
        for enquiries
      </div>
    </footer>
  );
});

export default Footer;
