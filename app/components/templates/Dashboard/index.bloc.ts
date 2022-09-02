import { inject, injectable } from 'inversify';
import { action, computed, observable } from 'mobx';
import { IBLoC } from '../../../ioc';
import { AuthServiceSymbol, IAuthService } from '../../../service/auth.service';
import { AuthStoreSymbol, IAuthStore } from '../../../store/auth.store';
import { UtilFunction } from '../../../util/functions';

@injectable()
export class DashboardBLoC implements IBLoC {
  @inject(AuthServiceSymbol) authService!: IAuthService;
  @inject(AuthStoreSymbol) authStore!: IAuthStore;

  @observable loading: boolean = false;

  constructor() {
    setTimeout(() => {
      this.authGuard();
    }, 100);
  }

  authGuard() {
    if (!this.loggedIn) {
      UtilFunction.navigate('/auth');
    }
  }

  @computed get loggedIn(): boolean {
    return this.authStore.loggedIn;
  }

  onParamsChange() {
    // nothing to do here
  }
}
