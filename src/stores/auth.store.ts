import { AuthApi } from '../components/apis/auth.api';
import { action, observable } from 'mobx';
import { IProfileDetailed } from '../types';
import { profileStore } from './profile.store';
import { config } from '../configs/app.config';
import { commonUiStore } from './common.ui.store';

class AuthStore {
  private authApi: AuthApi;

  @observable
  loginError: string|undefined;

  constructor(authApi: AuthApi) {
    this.authApi = authApi;
  }

  login(username: string) {
    console.log(username);
    commonUiStore.load();
    return this.authApi.login(username)
      .then((resp: IProfileDetailed) => {
        profileStore.setUser(resp);
      })
      .catch((errorResponse: XMLHttpRequest) => {
        if (errorResponse.status === 404) {
          this.setLoginError(config.errorMessage);
          throw Error(errorResponse.statusText + errorResponse.status);
        } else {
          throw Error(errorResponse.statusText + errorResponse.status);
        }
      })
      .finally(() => {
        this.loadFinished();
      });
  }

  @action
  private setLoginError(errText: string|undefined) {
    this.loginError = errText;
  }

  @action
  resetErrors () {
    this.setLoginError(undefined);
  }

  @action
  private loadFinished(): void {
    commonUiStore.loadEnd()
  }

  @action
  logout() {
    profileStore.reset();
  }
}

const authStore = new AuthStore(new AuthApi());

export {authStore, AuthStore};