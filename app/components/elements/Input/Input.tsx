import styles from './Input.module.scss';

type AppProps = {
    placeholder?: string;
    type?: string;
}



const Input = ({ placeholder, type = 'text' }: AppProps) => {
    return (
        type === 'text' ? <input className={`${styles.input}`} type="text" placeholder={placeholder} /> : <input className={`${styles.input}`} type="password" placeholder={placeholder} />
    )
}

export default Input;