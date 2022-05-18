import styles from './index.module.scss';

export type ControlSelectType = {
    options: {
        label: string;
        value: any;
        default?: boolean;
    }[];
    wide?: boolean;
}

const ControlSelect = ({ options, wide = false }: ControlSelectType) => {
    return (
        <select className={`${wide ? styles.wideinput : styles.input}`}>
            {options.map(x => (
                <option selected={x.default} value={x.value}>{x.label}</option>
            ))}
        </select>
    )
}

export default ControlSelect;