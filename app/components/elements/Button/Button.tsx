import { memo } from 'react';
import { ButtonType } from '../../../model/buttonType';
import Loader from '../Loader';
import styles from './Button.module.scss';

type AppProps = {
  label: string;
  type?: ButtonType;
  textColor?: string;
  wide?: boolean;
  click?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button = memo<AppProps>(
  ({
    label,
    click,
    disabled,
    loading,
    type = ButtonType.PRIMARY,
    textColor = 'white',
    wide = false,
  }: AppProps) => {
    return type === ButtonType.PRIMARY ? (
      <button
        disabled={disabled}
        onClick={click}
        style={{ color: textColor }}
        className={`${wide ? styles.wide : ''} ${styles.primary} hover`}
        type="button"
      >
        {loading ? (
          <Loader color={'#FFFFFF'} visible={true} height={30} width={30} />
        ) : (
          <span>{label}</span>
        )}
      </button>
    ) : (
      <button
        disabled={disabled}
        onClick={click}
        style={{ color: textColor, border: '1px solid #D1D5DB' }}
        className={`${wide ? styles.wide : ''} ${styles.secondary} hover`}
        type="button"
      >
        {loading ? (
          <Loader height={30} width={30} visible={true} />
        ) : (
          <span>{label}</span>
        )}
      </button>
    );
  }
);

export default Button;
