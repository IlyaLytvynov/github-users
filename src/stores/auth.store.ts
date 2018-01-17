import { action, observable } from 'mobx';

import { commonUiStore } from './common.ui.store';
import { profileStore } from './profile.store';

import { IProfileDetailed } from '../types';
import { config } from '../configs/app.config';
import { AuthApi } from '../components/apis/auth.api';

class AuthStore {
  private authApi: AuthApi;

  @observable
  isAuthenticated: boolean;

  @observable
  loginError: string|undefined;

  constructor(authApi: AuthApi) {
    this.authApi = authApi;
  }

  login(username: string) {
    commonUiStore.load();
    return this.authApi.login(username)
      .then((resp: IProfileDetailed) => {
        this.authenticate();
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
  authenticate() {
    this.isAuthenticated = true;
  }

  @action
  resetErrors () {
    this.setLoginError(undefined);
  }

  @action
  logout() {
    this.isAuthenticated = false;
    profileStore.reset();
  }

  @action
  private setLoginError(errText: string|undefined) {
    this.loginError = errText;
  }

  @action
  private loadFinished(): void {
    commonUiStore.loadEnd()
  }
}

const authStore = new AuthStore(new AuthApi());

export {authStore, AuthStore};