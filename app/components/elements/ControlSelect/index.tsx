import styles from './index.module.scss';

export type ControlSelectType = {
    options: {
        label: string;
        value: any;
        default?: boolean;
    }[];
    default?: any;
    wide?: boolean;
}

const ControlSelect = ({ options, wide = false }: ControlSelectType) => {
    return (
        <select defaultValue='' className={`${wide ? styles.wideinput : styles.input}`}>
            {options.map((x, i) => (
                <option key={i} value={x.value}>{x.label}</option>
            ))}
        </select>
    )
}

export default ControlSelect;