
import { AlertType } from '../../../model/AlertType';
import styles from './Alert.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

type AppProps = {
    label: string;
    title: string;
    type?: AlertType;
    link?: {
        url: string;
        label: string;
    };
    dismiss?: () => void;
}

const Alert = ({ title, label, link, dismiss, type = AlertType.DANGER }: AppProps) => {

    let switchFn = () => {
        switch (type) {
            case AlertType.DANGER:
                return (
                    <div className={`${styles.dangerbody} d-flex align-items-center`}>
                        <div className={`${styles.side}`}>&nbsp;</div>

                        <FontAwesomeIcon className='ms-5' icon={faExclamationTriangle} />
                        <span className={`ms-2 fw-800`}>{title}:</span>
                        <span className={`ms-2`}>{label}</span>

                        {link ?
                            <Link href={`${link?.url}`}><a className={`${styles.farright} color-safety-blue text-decoration-underline`}>{link?.label}</a></Link>
                            :
                            <span className={`${styles.farright} link hover`} onClick={() => { dismiss?.() }}><FontAwesomeIcon icon={faClose} /></span>
                        }
                    </div>
                )
            case AlertType.INFO:
                return (
                    <div className={`${styles.infobody} d-flex align-items-center`}>
                        <div className={`${styles.side}`}>&nbsp;</div>

                        <FontAwesomeIcon className='ms-5' icon={faInfoCircle} />
                        <span className={`ms-2 fw-800`}>{title}:</span>
                        <span className={`ms-2`}>{label}</span>

                        {link ?
                            <Link href={`${link?.url}`}><a className={`${styles.farright} color-safety-blue text-decoration-underline`}>{link?.label}</a></Link>
                            :
                            <span className={`${styles.farright} hover link`} onClick={() => { dismiss?.() }}><FontAwesomeIcon icon={faClose} /></span>
                        }
                    </div>
                )
            case AlertType.WARNING:
                return (
                    <div className={`${styles.infobody_warning} d-flex align-items-center`}>
                        <div className={`${styles.side_warning}`}>&nbsp;</div>

                        <FontAwesomeIcon className='ms-5' icon={faInfoCircle} />
                        <span className={`ms-2`}>{label}</span>

                    </div>
                )
            default:
                return (<></>)
        }
    }


    return (
        switchFn()
    )


}

export default Alert;