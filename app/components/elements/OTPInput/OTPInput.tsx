import { useState, useRef } from 'react';
import styles from './OTPInput.module.scss';

type AppProps = {
    placeholder?: string;
}



const OTPInput = ({ placeholder }: AppProps) => {

    const [validity, setValidity] = useState<boolean>(true);

    const inputOne = useRef<HTMLInputElement>(null);
    const inputTwo = useRef<HTMLInputElement>(null);
    const inputThree = useRef<HTMLInputElement>(null);
    const inputFour = useRef<HTMLInputElement>(null);

    const focusFn = (index: number) => {
        switch (index) {
            case 1:
                if (inputOne.current?.value.trim()) inputTwo.current?.focus();
                break;
            case 2:
                if (inputTwo.current?.value.trim()) inputThree.current?.focus();
                break;
            case 3:
                if (inputThree.current?.value.trim()) inputFour.current?.focus();
                break;
            case 4:
            default:
                if (inputFour.current?.value.trim()) processOTP();
        }
    }

    const processOTP = () => {
        let one = inputOne.current?.value.trim();
        let two = inputTwo.current?.value.trim();
        let three = inputThree.current?.value.trim();
        let four = inputFour.current?.value.trim();

        let code: number = Number(`${one}${two}${three}${four}`);

        if (code === 1111) {
            setValidity(false);
        } else {
            setValidity(true);
        }




    }
    return (
        <div className={`w-100 d-flex align-items-center justify-content-between`}>
            <input ref={inputOne} onChange={() => focusFn(1)} maxLength={1} className={`${styles.input} ${validity ? styles.valid : styles.invalid}`} type="text" placeholder={placeholder} />
            <input ref={inputTwo} onChange={() => focusFn(2)} maxLength={1} className={`${styles.input} ${validity ? styles.valid : styles.invalid}`} type="text" placeholder={placeholder} />
            <input ref={inputThree} onChange={() => focusFn(3)} maxLength={1} className={`${styles.input} ${validity ? styles.valid : styles.invalid}`} type="text" placeholder={placeholder} />
            <input ref={inputFour} onChange={() => focusFn(4)} maxLength={1} className={`${styles.input} ${validity ? styles.valid : styles.invalid}`} type="text" placeholder={placeholder} />
        </div>
    )
}

export default OTPInput;