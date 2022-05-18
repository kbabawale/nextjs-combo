
import { AlertType } from '../../../model/AlertType';
import styles from './Alert.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

type AppProps = {
    label: string;
    title: string;
    type?: AlertType;
    link: {
        url: string;
        label: string;
    };
}

const Alert = ({ title, label, link, type = AlertType.DANGER }: AppProps) => {
    return (
        type === AlertType.DANGER ?
            <div className={`${styles.dangerbody} d-flex align-items-center`}>
                <div className={`${styles.side}`}>&nbsp;</div>

                <FontAwesomeIcon className='ms-5' icon={faExclamationTriangle} />
                <span className={`ms-2 fw-800`}>{title}:</span>
                <span className={`ms-2`}>{label}</span>

                <Link href={`${link.url}`}><a className={`${styles.farright} color-safety-blue text-decoration-underline`}>{link.label}</a></Link>
            </div>

            :
            <div className={`${styles.infobody} d-flex align-items-center`}>
                <div className={`${styles.side}`}>&nbsp;</div>

                <FontAwesomeIcon className='ms-5' icon={faInfoCircle} />
                <span className={`ms-2 fw-800`}>{title}:</span>
                <span className={`ms-2`}>{label}</span>

                <Link href={`${link.url}`}><a className={`${styles.farright} color-safety-blue text-decoration-underline`}>{link.label}</a></Link>
            </div>
    )
}

export default Alert;