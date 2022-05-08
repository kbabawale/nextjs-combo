import { ButtonType } from '../../../model/buttonType';
import styles from './Button.module.scss';

type AppProps = {
    label: string;
    type?: ButtonType;
    textColor?: string;
}



const Button = ({ label, type = ButtonType.PRIMARY, textColor = 'white' }: AppProps) => {
    return (
        type === ButtonType.PRIMARY ? <button style={{ color: textColor }} className={`${styles.primary} hover`} type="button">{label}</button> : <button style={{ color: textColor }} className={`${styles.secondary} hover`} type="button">{label}</button>
    )
}

export default Button;