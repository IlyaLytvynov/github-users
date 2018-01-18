import { action, computed, IObservableArray, observable } from 'mobx';

import { ProfileApi } from '../components/apis/profile.api';
import { IProfileDetailed, IRepo } from '../types';


class ProfileStore {
  private api: ProfileApi;

  @observable
  user: IProfileDetailed|undefined;

  @observable
  repos: Array<IRepo> = [];

  constructor(api: ProfileApi) {
    this.api = api;
  }


  @action
  setUser(user: IProfileDetailed|undefined): void {
    this.user = user;
  }

  @action
  setRepos(resp: Array<IRepo>): void {
    this.repos = resp;
  }

  @action
  getRepo(id: number): IRepo {
    return this.repos.filter((repo: IRepo) => repo.id === id)[0];
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
