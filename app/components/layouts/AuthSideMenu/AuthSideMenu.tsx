import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './AuthSideMenu.module.scss';
import { SideMenuItems, SideMenuItem } from '../../../model/sidemenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const Menu = ({ label, unfilledIcon, filledIcon, url, extraIcon }: SideMenuItem) => {
    const { pathname } = useRouter();

    let currentRouteActive = (currentRoute: string): boolean => {
        let res: boolean = false;
        if (currentRoute === pathname) return true;
        return res;
    }

    return (
        <Link href={url}>
            <a className={`text-decoration-none ps-4 py-2 my-3 d-flex align-items-center justify-content-between ${currentRouteActive(url) ? styles.linkborder : styles.linkborderNone} ${styles.link}`}>
                <img loading='lazy' src={`/dashboardMenu/${currentRouteActive(url) ? filledIcon : unfilledIcon}.svg`} alt="Logo" />
                <span className={`ms-2 flex-fill ${currentRouteActive(url) ? 'fw-800' : 'fw-500'} ${currentRouteActive(url) ? 'color-primary' : 'color-gray-400'}`}>{label}</span>
                {extraIcon && extraIcon.active && extraIcon.type === 'BADGE' && <span className={`${styles.badge} fw-700 text-09 ms-2 me-4`}>{extraIcon.value}</span>}
                {extraIcon && extraIcon.active && extraIcon.type === 'HAZARD' && <span className={`${styles.hazardIcon} ms-2 me-4`}><FontAwesomeIcon color='white' icon={faExclamationTriangle} /></span>}
            </a>
        </Link>
    )
}

const AuthSideMenu = () => {
    //change to context api for global update
    let [sSideMenuItems, setSSideMenuItems] = useState(SideMenuItems);

    //use useEffect to set extraIcons in SideMenuItems if necessary here


    return (
        <section className={`py-4 d-flex flex-column w-20`}>
            {sSideMenuItems.map((object) => <Menu url={object.url} extraIcon={object.extraIcon} id={object.id} label={object.label} filledIcon={object.filledIcon} unfilledIcon={object.unfilledIcon} key={object.id} />)}
        </section>
    )
}

export default AuthSideMenu;