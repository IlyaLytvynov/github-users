import { action, computed, observable } from 'mobx';

import { IProfileDetailed, IRepo } from '../types';
import { reposStore } from './repos.store';

type TUser = IProfileDetailed|undefined;

class ProfileStore {

  @observable
  private _user: TUser;

  @computed
  get selectedRepo(): IRepo|undefined {
    return reposStore.selectedRepo;
  }

  @computed
  get repos() {
    return reposStore.repos;
  }

  @computed
  get user(): TUser {
    return this._user
  }

  @action
  selectRepo(id: number) {
    reposStore.selectRepo(id)
  }

  @action
  setUser(user: IProfileDetailed|undefined): void {
    this._user = user;
  }

  @action
  reset() {
    this.setUser(undefined);
    reposStore.setRepos([]);
  }

  loadRepos() {
    return reposStore.loadRepos(this.user!.repos_url);
  }

}

const profileStore = new ProfileStore();

export {ProfileStore, profileStore}
