import { action, computed, IObservableArray, observable } from 'mobx';

import { ProfileApi } from '../components/apis/profile.api';
import { IProfileDetailed, IReposResponse } from '../types';


class ProfileStore {
  private api: ProfileApi;

  @observable
  user: IProfileDetailed|undefined;

  @observable
  repos: Array<IReposResponse> = [];

  constructor(api: ProfileApi) {
    this.api = api;
  }


  @action
  setUser(user: IProfileDetailed|undefined): void {
    console.log(user);
    this.user = user;
  }

  @action
  setRepos(resp: Array<IReposResponse>): void {
    this.repos = resp;
  }

  loadRepos(): void {
    if(this.user !== undefined) {
      this.api.loadRepos(this.user.repos_url)
        .then(this.setRepos.bind(this));
    }
  }
  @action
  reset() {
    this.setUser(undefined);
    this.setRepos([]);
  }
}

const profileStore = new ProfileStore(new ProfileApi());

export {ProfileStore, profileStore}
