import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import logo from '../../../../public/logo/logo.svg';
import mic from '../../../../public/mic.svg';
import styles from './Header.module.scss';

const Header = memo(() => {
  return (
    <header
      className={`w-100 px-5 py-3 d-flex align-items-center justify-content-between ${styles.header}`}
    >
      <div className="d-flex link align-items-center">
        <Image src={logo} alt="Logo" />
        <Link href="/">
          <a
            className={`${styles.nolinkhover} ms-2 text-decoration-none color-black fw-700 text-11`}
          >
            StoreDash Manager
          </a>
        </Link>
      </div>
      <div
        className={`${styles.rounded} hover link bg-yellow py-2 px-2 d-flex align-items-center`}
      >
        <Image src={mic} alt="Speak" />
        <span className="ms-2 fw-600">Contact Admin</span>
      </div>
    </header>
  );
});

export default Header;
