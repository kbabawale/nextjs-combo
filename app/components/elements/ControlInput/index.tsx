import styles from './index.module.scss';

type AppProps = {
    placeholder?: string;
    wide?: boolean;
    type?: string;
}

const ControlInput = ({ placeholder, type = 'text', wide = false }: AppProps) => {
    return (
        <input className={`${wide ? styles.wideinput : styles.input}`} type={type} placeholder={placeholder} />
    )
}

export default ControlInput;