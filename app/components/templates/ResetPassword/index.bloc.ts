import { inject, injectable } from 'inversify';
import { computed, observable } from 'mobx';
import { IBLoC } from '../../../ioc';
import { ChangePasswordRequest } from '../../../model/HttpRequest';
import { Distributor } from '../../../model/HttpResponse';
import { AuthServiceSymbol, IAuthService } from '../../../service/auth.service';
import { AuthStoreSymbol, IAuthStore } from '../../../store/auth.store';
import { UtilFunction } from '../../../util/functions';
import Router from 'next/router';

@injectable()
export class PasswordBLoC implements IBLoC {
  @inject(AuthServiceSymbol) authService!: IAuthService;
  @inject(AuthStoreSymbol) authStore!: IAuthStore;

  @observable loading: boolean = false;

  constructor() {
    setTimeout(() => {
      this.authGuard();
    }, 100);
  }

  authGuard() {
    const query = Router.query;

    //redirect if user is not logged in and "forgot password" query string is not set
    if (!query.ref && !this.loggedIn) {
      UtilFunction.navigate('/auth');
    }
  }

  @computed get loggedIn(): boolean {
    return this.authStore.loggedIn;
  }

  async submitForm(data: any) {
    this.loading = true;
    try {
      if (
        data.password.toString().trim() !==
        data.confirmPassword.toString().trim()
      ) {
        throw new Error('Passwords Do Not Match');
      }

      let body: ChangePasswordRequest = {
        id: this.authStore.currentUser._id,
        password: data.password.toString().trim(),
        platform: 'Distributor',
      };

      let result = await this.authService.changePassword(body);

      if (result.data) {
        let querystring = {
          userid: this.authStore.currentUser._id,
          type: 'Distributor',
        };
        const searchParams = new URLSearchParams(querystring).toString();
        let newUserDetails = await this.authService.syncMe(searchParams);
        if (newUserDetails.data && newUserDetails.data?.data.length > 0) {
          //update store with new user details
          let newUser: Partial<Distributor> = newUserDetails.data?.data[0];
          this.authStore.setCurrentUser(newUser);

          UtilFunction.notification('Password updated');
          UtilFunction.navigate('/dashboard');
        }
      }
    } catch (err) {
      if (err instanceof Error) UtilFunction.notification(err.message, 'info');
      this.loading = false;
    } finally {
      this.loading = false;
    }
  }

  onParamsChange() {
    // nothing to do here
  }
}
