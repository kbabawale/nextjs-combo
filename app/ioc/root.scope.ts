import { Container } from 'inversify';
import {
  AuthService,
  AuthServiceSymbol,
  IAuthService,
} from '../service/auth.service';
import {
  HttpService,
  HttpServiceSymbol,
  IHttpService,
} from '../service/http.service';
import { AuthStore, AuthStoreSymbol, IAuthStore } from '../store/auth.store';

async function configure(container: Container): Promise<void> {
  // stores
  bindStores(container);

  // services
  bindServices(container);
}

function bindServices(container: Container) {
  container.bind<IAuthService>(AuthServiceSymbol).to(AuthService);
  container.bind<IHttpService>(HttpServiceSymbol).to(HttpService);
}

function bindStores(container: Container) {
  container.bind<IAuthStore>(AuthStoreSymbol).to(AuthStore).inSingletonScope();
}

const iocConfig = { configure };
export default iocConfig;
