import Router from 'next/router';
import { INotifyOptions, Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

type NotifyType = 'success' | 'failure' | 'info';
export class UtilFunction {
  static navigate = (location: string) => {
    Router.push(location);
  };
  static notification = (
    msg: string,
    type: NotifyType = 'success',
    position: INotifyOptions['position'] = 'right-top'
  ) => {
    switch (type) {
      case 'success':
        Notify.success(msg, {
          useIcon: false,
          timeout: 5000,
          position,
          clickToClose: true,
        });
        break;
      case 'failure':
        Notify.failure(msg, {
          useIcon: false,
          timeout: 5000,
          position,
          clickToClose: true,
        });
        break;
      case 'info':
        Notify.info(msg, {
          useIcon: false,
          timeout: 5000,
          position,
          clickToClose: true,
        });
        break;
    }
  };
  static showloader = () => {
    Loading.standard({
      svgColor: '#fff',
    });
  };
  static hideloader = () => {
    Loading.remove();
  };
}
