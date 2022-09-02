import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './index.module.scss';

type AppProps = {
  placeholder?: string;
  wide?: boolean;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  registerValidation?: UseFormRegisterReturn;
  value?: string;
};

const ControlInput = ({
  error,
  errorMessage,
  registerValidation,
  placeholder,
  type = 'text',
  wide = false,
  value = '',
}: AppProps) => {
  return (
    <div className={`d-flex flex-column flex-start`}>
      <input
        {...registerValidation}
        className={`${error ? styles.error : ''} ${
          wide ? styles.wideinput : styles.input
        }`}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
      />
      {errorMessage && (
        <span className={`mt-1 mb-3 error`}>{errorMessage}</span>
      )}
    </div>
  );
};

export default ControlInput;
