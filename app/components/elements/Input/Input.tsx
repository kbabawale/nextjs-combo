import { memo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

type AppProps = {
  placeholder?: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  registerValidation?: UseFormRegisterReturn;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

const Input = memo<AppProps>(
  ({
    placeholder,
    error,
    errorMessage,
    registerValidation,
    onKeyDown,
    type = 'text',
  }: AppProps) => {
    return (
      <div className={`d-flex flex-column flex-start`}>
        <input
          {...registerValidation}
          className={`${error ? styles.error : ''} ${styles.input}`}
          type={type}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
        {errorMessage && (
          <span className={`mt-1 mb-3 error`}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default Input;
