import styles from './index.module.scss';

type AppProps = {
    wide?: boolean;
}

const ControlDate = ({ wide = false }: AppProps) => {
    return (
        <input className={`${wide ? styles.wideinput : styles.input}`} type="date" />
    )
}

export default ControlDate;