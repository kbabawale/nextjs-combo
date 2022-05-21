import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import DefaultLayout from '../app/components/templates/DefaultLayout'
import { useRouter } from 'next/router';
import AuthLayout from '../app/components/templates/AuthLayout';
import { Provider } from "react-redux";
import { store } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  let isAuthRoute = (): boolean => {
    let res: boolean = false;
    if (pathname.indexOf('auth') > -1) return true;
    return res;
  }

  return (
    isAuthRoute() ? (
      <Provider store={store}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </Provider>
    ) :
      (
        <Provider store={store}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </Provider>
      )

  )
}

export default MyApp;