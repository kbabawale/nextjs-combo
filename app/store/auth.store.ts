import { injectable } from 'inversify';
import { action, autorun, makeObservable, observable } from 'mobx';
import { ChangeEmailPayload } from '../model/HttpRequest';
import { AdminRequests, Distributor } from '../model/HttpResponse';
import { autoSave } from './persistStore';

export interface IAuthStore {
  token: { access_token: string; refresh_token: string };
  setToken: (token: { access_token: string; refresh_token: string }) => void;
  setCurrentUser: (user: Partial<Distributor>) => void;
  currentUser: Distributor;
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

export const AuthStoreSymbol = Symbol.for('IAuthStore');

@injectable()
export class AuthStore implements IAuthStore {
  @observable token: { access_token: string; refresh_token: string } = {
    access_token: '',
    refresh_token: '',
  };
  @observable currentUser!: Distributor;
  @observable loggedIn: boolean = false;

  constructor() {
    makeObservable(this);
    autoSave(this, 'AuthStore');
  }

  @action setToken(token: { access_token: string; refresh_token: string }) {
    this.token = token;
  }

  @action setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  @action setCurrentUser(user: Partial<Distributor>) {
    this.currentUser = { ...this.currentUser, ...user };
  }
}
