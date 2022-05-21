import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HTMLAttributes } from 'react';
import { ControlButtonType } from '../../../model/buttonType';
import styles from './index.module.scss';

type AppProps = {
    label: string;
    type?: ControlButtonType;
    textColor?: string;
    icon?: IconDefinition;
    style?: any;
    disabled?: boolean;
    click?: () => void;
}



const ControlButton = ({ label, click, icon, type = ControlButtonType.PRIMARY, textColor = 'white', disabled = false }: AppProps) => {


    return (
        <>
            {
                type === ControlButtonType.PRIMARY &&
                <button onClick={click} disabled={disabled} style={{ color: textColor }} className={`${styles.primary} hover link`} type="button">
                    <div>
                        {icon && <FontAwesomeIcon icon={icon} />}
                        <span className={`text-09 ms-2`}>{label}</span>
                    </div>
                </button>


            }

            {
                type === ControlButtonType.SECONDARY &&
                <button className={`${styles.secondary} hover`} type="button">
                    <div>
                        {icon && <FontAwesomeIcon icon={icon} />}
                        {label}
                    </div>
                </button>
            }
            {
                type === ControlButtonType.DANGER &&
                <button style={{ color: textColor }} className={`${styles.danger} hover`} type="button">
                    <div>
                        {icon && <FontAwesomeIcon icon={icon} />}
                        {label}
                    </div>
                </button>
            }
        </>
    )



}

export default ControlButton;