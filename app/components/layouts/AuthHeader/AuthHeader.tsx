import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../public/logo/logo.svg';
import mic from '../../../../public/mic.svg';
import ellipsis from '../../../../public/ellipsis.svg';
import notification from '../../../../public/notification.svg';
import styles from './AuthHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AuthHeader = () => {
    return (
        <header className={`w-100 px-5 py-3 d-flex align-items-center justify-content-between ${styles.header}`}>
            <div className='d-flex link align-items-center'>
                <Image src={logo} alt="Logo" />
                <Link href="/">
                    <a className={`${styles.nolinkhover} ms-2 text-decoration-none color-black fw-700 text-11`}>StoreDash Manager</a>
                </Link>
            </div>
            <div className={`${styles.search} flex-fill mx-5 py-1 px-4`}>
                <FontAwesomeIcon color='#9CA3AF' icon={faSearch} />
                <input type="search" placeholder='Search driver names, pick-up codes or order numbers' />
            </div>
            <div className={`d-flex align-items-center`}>
                <Link className={`linkB`} href="/">
                    <a title='Contact' className={`${styles.nolinkhover} mx-4`}><Image src={mic} alt="Contact" /></a>
                </Link>
                <Link href="/">
                    <a title='Notifications' className={`${styles.nolinkhover} mx-4`}><Image src={notification} alt="Notification" /></a>
                </Link>
                <div className={`link d-flex align-items-center`}>
                    <div className={`${styles.profileimage}`}></div>
                    <div className={`d-flex flex-column ms-2 me-4`}>
                        <span className={`fw-700 color-black `}>Emeka Adewale</span>
                        <span className={`color-gray-500 text-09`}>eadewale@company.com</span>
                    </div>
                    <Image src={ellipsis} alt="Options" />
                </div>
            </div>

        </header>
    )
}

export default AuthHeader;