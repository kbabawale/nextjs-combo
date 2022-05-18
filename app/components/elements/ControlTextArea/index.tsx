import styles from './index.module.scss';

type AppProps = {
    placeholder?: string;
    wide?: boolean;
}

const ControlTextArea = ({ placeholder, wide = false }: AppProps) => {
    return (
        <textarea className={`${wide ? styles.wideinput : styles.input}`} placeholder={placeholder}></textarea>
    )
}

export default ControlTextArea;