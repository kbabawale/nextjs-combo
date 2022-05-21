import { ButtonType } from '../../../model/buttonType';
import styles from './Button.module.scss';

type AppProps = {
    label: string;
    type?: ButtonType;
    textColor?: string;
    wide?: boolean;
    click?: () => void;
}



const Button = ({ label, click, type = ButtonType.PRIMARY, textColor = 'white', wide = false }: AppProps) => {
    return (
        type === ButtonType.PRIMARY ? <button onClick={click} style={{ color: textColor }} className={`${wide ? styles.wide : ''} ${styles.primary} hover`} type="button">{label}</button> : <button onClick={click} style={{ color: textColor }} className={`${wide ? styles.wide : ''} ${styles.secondary} hover`} type="button">{label}</button>
    )
}

export default Button;