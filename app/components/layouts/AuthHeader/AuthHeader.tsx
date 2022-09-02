import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/logo/logo.svg';
import mic from '../../../../public/mic.svg';
import ellipsis from '../../../../public/ellipsis.svg';
import notification from '../../../../public/notification.svg';
import styles from './AuthHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { memo, useRef, useState } from 'react';

const SearchResultDelivery = () => {
  return (
    <div
      className={`my-2 px-2 py-1 w-100 d-flex align-items-center justify-content-between ${styles.highlight}`}
    >
      <div className={`d-flex align-items-center`}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'red',
          }}
        ></div>
        <div className={`ms-2 d-flex flex-column`}>
          <span className={`fw-700 text-11`}>Temisan Okafor</span>
          <div className={`d-flex align-items-center`}>
            <span className={`color-gray-600`}>Nissan</span>
            <div className={`bg-chipAccent px-2 py-1 rounded ms-2`}>
              <span className={`ms-1 color-black text-09 fw-700`}>XYZ-233</span>
            </div>
          </div>
        </div>
      </div>
      <span>AX7352-863</span>
      <div className={`d-flex align-items-center justify-content-center`}>
        <div
          className={`mx-1 d-flex align-items-center justify-content-center fw-700 text-12`}
          style={{
            width: '30px',
            height: '30px',
            background: '#276EF1',
            color: 'white',
          }}
        >
          4
        </div>
        <div
          className={`mx-1 d-flex align-items-center justify-content-center fw-700 text-12`}
          style={{
            width: '30px',
            height: '30px',
            background: '#276EF1',
            color: 'white',
          }}
        >
          4
        </div>
        <div
          className={`mx-1 d-flex align-items-center justify-content-center fw-700 text-12`}
          style={{
            width: '30px',
            height: '30px',
            background: '#276EF1',
            color: 'white',
          }}
        >
          4
        </div>
        <div
          className={`mx-1 d-flex align-items-center justify-content-center fw-700 text-12`}
          style={{
            width: '30px',
            height: '30px',
            background: '#276EF1',
            color: 'white',
          }}
        >
          4
        </div>
      </div>
      <span
        className={`link hover color-safety-blue text-decoration-underline fw-700`}
      >
        View details
      </span>
    </div>
  );
};

const AuthHeader = memo(() => {
  const [search, setSearch] = useState<boolean>(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const searchFn = () => {
    let ele = searchRef.current?.value.trim();
    if (ele && ele.length > 0) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };

  const focusFn = () => {
    let ele = searchRef.current?.value.trim();
    if (ele && ele.length > 0) {
      setSearch(true);
    }
  };

  const blurFn = () => setSearch(false);

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
      <div className={`${styles.search} flex-fill mx-5 py-2 px-4`}>
        <FontAwesomeIcon color="#9CA3AF" icon={faSearch} />
        <input
          type="search"
          onBlur={blurFn}
          onFocus={focusFn}
          ref={searchRef}
          onChange={searchFn}
          placeholder="Search driver names, pick-up codes or order numbers"
        />
        <div
          className={`${search ? 'd-flex' : 'd-none'} ${
            styles.suggestions
          } w-100 flex-column align-items-center border`}
        >
          <SearchResultDelivery />
          <SearchResultDelivery />
          <SearchResultDelivery />
        </div>
      </div>
      <div className={`d-flex align-items-center`}>
        <Link className={`linkB`} href="/">
          <a title="Contact" className={`${styles.nolinkhover} mx-4`}>
            <Image src={mic} alt="Contact" />
          </a>
        </Link>
        <Link href="/">
          <a title="Notifications" className={`${styles.nolinkhover} mx-4`}>
            <Image src={notification} alt="Notification" />
          </a>
        </Link>
        <div className={`link d-flex align-items-center`}>
          <div className={`${styles.profileimage}`}></div>
          <div className={`d-flex flex-column ms-2 me-4`}>
            <span className={`fw-700 color-black `}>Emeka Adewale</span>
            <span className={`color-gray-500 text-09`}>
              eadewale@company.com
            </span>
          </div>
          <Image src={ellipsis} alt="Options" />
        </div>
      </div>
    </header>
  );
});

export default AuthHeader;
