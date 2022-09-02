import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import DefaultLayout from '../app/components/templates/DefaultLayout';
import { useRouter } from 'next/router';
import AuthLayout from '../app/components/templates/AuthLayout';
import { memo, useEffect, useState } from 'react';
import { Container } from 'inversify';
import 'reflect-metadata';
import ioc from '../app/ioc';
import iocConfig from '../app/ioc/root.scope';

async function bootstrap(): Promise<void> {
  const container = new Container();
  ioc.setContainer(container);
  await iocConfig.configure(container);
}

const MyApp = memo(({ Component, pageProps }: AppProps) => {
  const [ready, setReady] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    bootstrap().then(() => setReady(true));
  }, [setReady]);

  if (!ready) {
    return null;
  }

  let isAuthRoute = (): boolean => {
    let res: boolean = false;
    if (pathname.indexOf('auth') > -1) return true;
    return res;
  };

  return isAuthRoute() ? (
    <>
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    </>
  ) : (
    <>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </>
  );
});

export default MyApp;
