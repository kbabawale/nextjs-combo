import { inject, injectable } from 'inversify';
import { AuthStoreSymbol, IAuthStore } from '../store/auth.store';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { UtilFunction } from '../util/functions';

export interface IHttpService {
  get<T, U>(url: string): Promise<ResponseObj<T, U>>;
  post<T, U>(url: string, body: any): Promise<ResponseObj<T, U>>;
  put<T, U>(url: string, body: any): Promise<ResponseObj<T, U>>;
}

export interface ResponseObj<T, M = any> {
  message: string;
  data?: T;
  meta?: M;
}

type HttpOptions = {
  headers: {
    Accept: string;
    Authorization?: string;
  };
};

export const HttpServiceSymbol = Symbol.for('IHttpService');

@injectable()
export class HttpService implements IHttpService {
  @inject(AuthStoreSymbol) authStore!: IAuthStore;

  allowedRoutes: string[] = [
    '/auth/login',
    '/auth/otp/verify',
    '/auth/otp',
    '/auth/otp',
  ];

  async post<T, U = any>(url: string, body: any): Promise<ResponseObj<T, U>> {
    let options: HttpOptions = {
      headers: {
        Accept: 'application/json',
      },
    };

    axios.interceptors.request.use(
      (config) => {
        return this.requestInterceptor(config);
      },
      (error) => {
        console.error(error, 'Interceptor Error');
        UtilFunction.notification('An Error Occurred', 'failure');
      }
    );

    axios.interceptors.response.use(undefined, (error: AxiosError) => {
      this.responseInterceptor<T>(error);
    });

    let { data } = await axios.post<ResponseObj<T, U>>(url, body, options);
    return data;
  }

  async get<T, U = any>(url: string): Promise<ResponseObj<T, U>> {
    let options: HttpOptions = {
      headers: {
        Accept: 'application/json',
      },
    };

    axios.interceptors.request.use(
      (config) => {
        return this.requestInterceptor(config);
      },
      (error) => {
        console.error(error, 'Interceptor Error');
        UtilFunction.notification('An Error Occurred', 'failure');
      }
    );

    axios.interceptors.response.use(undefined, (error: AxiosError) => {
      this.responseInterceptor<T>(error);
    });

    let { data } = await axios.get<ResponseObj<T, U>>(url, options);

    return data;
  }

  async put<T, U = any>(url: string, body: any): Promise<ResponseObj<T, U>> {
    let options: HttpOptions = {
      headers: {
        Accept: 'application/json',
      },
    };

    axios.interceptors.request.use(
      (config) => {
        return this.requestInterceptor(config);
      },
      (error) => {
        UtilFunction.notification('An Error Occurred', 'failure');
      }
    );

    axios.interceptors.response.use(undefined, (error: AxiosError) => {
      this.responseInterceptor<T>(error);
    });

    let { data } = await axios.put<ResponseObj<T, U>>(url, body, options);
    return data;
  }

  private getAuthorization() {
    if (this.authStore.token) {
      return `Bearer ${this.authStore.token.access_token}`;
    } else {
      return ``;
    }
  }

  private responseInterceptor<T>(error: AxiosError) {
    if (error.code?.toUpperCase() != 'ERR_NETWORK') {
      if (error.response?.status == 401) {
        this.authStore.setToken({ access_token: '', refresh_token: '' });
        this.authStore.setLoggedIn(false);

        UtilFunction.notification(
          'Session Expired. Please Login Again',
          'failure'
        );
        UtilFunction.navigate('/auth');
      } else if (error.response?.status == 406) {
        UtilFunction.notification('An Unexpected Error Occurred', 'failure');
      } else {
        let errorMessage = error.response?.data as ResponseObj<T>;
        errorMessage.message.length > 50
          ? UtilFunction.notification(
              'Server Error. Please Try Again',
              'failure'
            )
          : UtilFunction.notification(errorMessage.message, 'failure');
      }
    } else {
      UtilFunction.notification('Network Error', 'failure');
    }
  }

  private requestInterceptor(config: AxiosRequestConfig) {
    let currentAPIRoute = config.url
      ?.substring(config.url.indexOf('v1'))
      .replace('v1', '');

    let token = this.getAuthorization();

    if (
      token &&
      currentAPIRoute &&
      config.headers &&
      !this.allowedRoutes.includes(currentAPIRoute)
    )
      config.headers.Authorization = token;
    return config;
  }
}
