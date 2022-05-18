import styles from './index.module.scss';

type AppProps = {
    placeholder?: string;
    wide?: boolean;
}

const ControlInput = ({ placeholder, wide = false }: AppProps) => {
    return (
        <input className={`${wide ? styles.wideinput : styles.input}`} type="text" placeholder={placeholder} />
    )
}

export default ControlInput;