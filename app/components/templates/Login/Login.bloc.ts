import { inject, injectable } from 'inversify';
import { action, computed, observable } from 'mobx';
import { IBLoC } from '../../../ioc';
import { LoginRequest } from '../../../model/HttpRequest';
import { AuthServiceSymbol, IAuthService } from '../../../service/auth.service';
import { AuthStoreSymbol, IAuthStore } from '../../../store/auth.store';
import { UtilFunction } from '../../../util/functions';

@injectable()
export class LoginBLoC implements IBLoC {
  @inject(AuthServiceSymbol) authService!: IAuthService;
  @inject(AuthStoreSymbol) authStore!: IAuthStore;

  @observable loading: boolean = false;

  constructor() {
    setTimeout(() => {
      this.redirectGuard();
    }, 100);
  }

  redirectGuard() {
    if (this.loggedIn) {
      UtilFunction.navigate('/dashboard');
    }
  }

  @computed get loggedIn(): boolean {
    return this.authStore.loggedIn;
  }

  async submitForm(data: any) {
    this.loading = true;

    try {
      let body: LoginRequest = {
        ...data,
        platform: 'Distributor',
      };
      let result = await this.authService.signIn(body);
      //take care of tokens and redirect
      if (result.meta?.authToken) {
        this.authStore.setToken(result.meta.authToken);
        if (result.data) {
          this.authStore.setCurrentUser(result.data);
          this.authStore.setLoggedIn(true);
          //if user is new and hasnt changed password, prompt him to
          if (!result.data.firstPasswordReset) {
            UtilFunction.navigate('/auth/set-new-password');
          } else {
            UtilFunction.navigate('/dashboard');
          }
        }
      }
    } catch (err) {
    } finally {
      this.loading = false;
    }
  }

  onParamsChange() {
    // nothing to do here
  }
}
