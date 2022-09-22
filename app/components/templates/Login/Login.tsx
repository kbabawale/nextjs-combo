import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/logo/logo.svg';
import Input from '../../elements/Input/Input';
import Button from '../../elements/Button/Button';
import { ButtonType } from '../../../model/buttonType';
import { useForm } from 'react-hook-form';
import React, { memo, PropsWithChildren, useCallback } from 'react';
import { LoginBLoC } from './Login.bloc';
import ioc from '../../../ioc';
import { Observer } from 'mobx-react-lite';

type FormType = {
  email: string;
  password: string;
};

const Login = memo<PropsWithChildren<Object>>((props) => {
  const bloc = ioc.useBLoC(LoginBLoC, props);

  const onSubmitForm = useCallback(
    (data: any) => bloc.submitForm(data),
    [bloc]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  return (
    <Observer>
      {() => (
        <div className={`d-flex flex-column`}>
          <main
            className={`mt-5 d-flex flex-column flex-fill justify-content-center align-items-center text-left`}
          >
            <Image
              width={150}
              height={150}
              className=""
              src={logo}
              alt="Logo"
            />
            <span className={`fw-600 text-12`}>Brand</span>
            <form className={`d-flex flex-column w-30 mx-auto`}>
              <span className={`mt-5 fw-800 color-black text-15`}>Log in</span>
              <span className={`my-2 fw-400 text-11`}>
                Enter email and password to log in
              </span>

              <Input
                error={!!errors.email}
                errorMessage={errors.email ? errors.email.message : ''}
                registerValidation={register('email', {
                  required: 'Provide Email Address',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid Email Address',
                  },
                })}
                type="email"
                placeholder="Enter email"
              />
              <Input
                error={!!errors.email}
                errorMessage={errors.password ? errors.password.message : ''}
                registerValidation={register('password', {
                  required: 'Provide Password',
                  minLength: {
                    value: 6,
                    message: 'Password should be a minimum of 6 characters',
                  },
                })}
                // onKeyDown={(e) => {
                //   if (e.code.toUpperCase() === 'ENTER') {
                //     // console.log(e.code, e.key);
                //     e.preventDefault();
                //     // e.stopPropagation();
                //     handleSubmit(onSubmitForm);
                //   }
                // }}
                type="password"
                placeholder="Enter Password"
              />
              <Button
                loading={bloc.loading}
                click={handleSubmit(onSubmitForm)}
                textColor="white"
                label="Log in"
                type={ButtonType.PRIMARY}
              />

              <Link href="/auth/reset-password?ref=forgot">
                <a className="mt-2">Forgot Password</a>
              </Link>
            </form>
          </main>
        </div>
      )}
    </Observer>
  );
});

export default Login;
