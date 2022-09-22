import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/logo/logo.svg';
import Input from '../../elements/Input/Input';
import Button from '../../elements/Button/Button';
import { ButtonType } from '../../../model/buttonType';
import { PasswordAction } from '../../../model/PasswordAction';
import { memo, PropsWithChildren, useCallback } from 'react';
import { PasswordBLoC } from './index.bloc';
import ioc from '../../../ioc';
import { useForm } from 'react-hook-form';

type AppProps = {
  type?: PasswordAction;
  buttonText: string;
  heading: string;
  subHeading: string;
};

type FormType = {
  password: string;
  confirmPassword: string;
};

const Password = memo<AppProps>((props) => {
  const bloc = ioc.useBLoC(PasswordBLoC, props);

  const onSubmitForm = useCallback(
    (data: any) => bloc.submitForm(data),
    [bloc]
  );
  let {
    buttonText,
    heading,
    subHeading,
    type = PasswordAction.RESETPASSWORD,
  }: AppProps = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  return (
    <div className={`d-flex flex-column`}>
      <main
        className={`mt-5 d-flex flex-column flex-fill justify-content-center align-items-center text-left`}
      >
        <Image width={50} height={50} className="" src={logo} alt="Logo" />
        <span className={`fw-600 text-12`}>Brand</span>

        <form className={`d-flex flex-column w-30 mx-auto`}>
          <span className={`mt-5 fw-800 color-black text-15`}>{heading}</span>
          <span className={`my-2 fw-400 text-11`}>{subHeading}</span>

          <Input
            type="password"
            placeholder="Enter password"
            error={!!errors.password}
            errorMessage={errors.password ? errors.password.message : ''}
            registerValidation={register('password', {
              required: 'Provide New Password',
              minLength: {
                value: 6,
                message: 'Minimum of 6 characters',
              },
            })}
          />
          {type === PasswordAction.SETNEWPASSWORD && (
            <Input
              type="password"
              placeholder="Re-enter password"
              error={!!errors.confirmPassword}
              errorMessage={
                errors.confirmPassword ? errors.confirmPassword.message : ''
              }
              registerValidation={register('confirmPassword', {
                required: 'Provide New Password Again',
                minLength: {
                  value: 6,
                  message: 'Minimum of 6 characters',
                },
              })}
            />
          )}
          <Button
            loading={bloc.loading}
            click={handleSubmit(onSubmitForm)}
            textColor="white"
            label={buttonText}
            type={ButtonType.PRIMARY}
          />

          {type === PasswordAction.RESETPASSWORD && (
            <Link href="/">
              <a className="mt-2">Back to login</a>
            </Link>
          )}
        </form>
      </main>
    </div>
  );
});

export default Password;
