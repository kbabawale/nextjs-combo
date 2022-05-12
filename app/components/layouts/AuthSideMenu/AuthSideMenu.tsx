import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './AuthSideMenu.module.scss';
import { SideMenuItems, SideMenuItem } from '../../../model/sidemenu';

const Menu = ({ label, unfilledIcon, filledIcon, active, url }: SideMenuItem) => {
    const { pathname } = useRouter();

    let currentRouteActive = (currentRoute: string): boolean => {
        let res: boolean = false;
        if (currentRoute === pathname) return true;
        return res;
    }

    return (
        <Link href={url}>
            <a className={`text-decoration-none ps-4 py-2 my-3 d-flex align-items-center ${currentRouteActive(url) ? styles.linkborder : styles.linkborderNone} ${styles.link}`}>
                <img loading='lazy' src={`/dashboardMenu/${currentRouteActive(url) ? filledIcon : unfilledIcon}.svg`} alt="Logo" />
                <span className={`ms-2 ${currentRouteActive(url) ? 'fw-800' : 'fw-500'} ${currentRouteActive(url) ? 'color-primary' : 'color-gray-400'}`}>{label}</span>
            </a>
        </Link>
    )
}

const AuthSideMenu = () => {
    return (
        <section className={`py-4 d-flex flex-column w-20`}>
            {SideMenuItems.map((object) => <Menu url={object.url} id={object.id} label={object.label} filledIcon={object.filledIcon} unfilledIcon={object.unfilledIcon} key={object.id} />)}
        </section>
    )
}

export default AuthSideMenu;