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
  // container.bind<IFinanceService>(FinanceServiceSymbol).to(FinanceService)
  // container.bind<IUserService>(UserServiceSymbol).to(UserService)
  // container.bind<ISupportService>(SupportServiceSymbol).to(SupportService)

  // has inner state
  // container.bind<IWalletService>(WalletServiceSymbol).to(WalletService).inSingletonScope()
  // container.bind<IActivityService>(ActivityServiceSymbol).to(ActivityService).inSingletonScope()
  // container.bind<IWizardService>(WizardServiceSymbol).to(WizardService).inSingletonScope()
  // container.bind<IDeviceService>(DeviceServiceSymbol).to(DeviceService).inSingletonScope()
  // container.bind<IPINService>(PINServiceSymbol).to(PINService).inSingletonScope()
  // container.bind<ISplashService>(SplashServiceSymbol).to(SplashService).inSingletonScope()
}

function bindStores(container: Container) {
  container.bind<IAuthStore>(AuthStoreSymbol).to(AuthStore).inSingletonScope();
}

const iocConfig = { configure };
export default iocConfig;
