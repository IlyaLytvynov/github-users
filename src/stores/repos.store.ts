import { action, computed, observable } from 'mobx';
import { IRepo } from '../types';
import { ReposApi } from '../components/apis/profile.api';
import { reposUiStore } from './repos.ui.store';

type TRepoCollection = Array<IRepo>;
type TRepo = IRepo | undefined;

class ReposStore {
  private api: ReposApi;

  @observable
  private _repos: TRepoCollection = [];

  @observable
  private _selectedRepo: TRepo;

  constructor(api: ReposApi) {
    this.api = api
  }

  @computed
  get repos(): TRepoCollection {
    return this._repos;
  }

  @computed
  get selectedRepo(): TRepo {
    return this._selectedRepo;
  }

  @action
  setRepos(resp: Array<IRepo>): void {
    this._repos = resp;
  }

  @action
  selectRepo(id: number) {
    this._selectedRepo = this._repos.filter((repo: IRepo) => repo.id === id)[0];
  }

  loadRepos(url: string): Promise<IRepo> {
    reposUiStore.load();
    return this.api.loadRepos(url)
      .then(this.setRepos.bind(this))
      .catch((resp: XMLHttpRequest) => {
        throw Error(resp.responseType + ' ' + resp.responseText)
      })
      .finally(() => {
        setTimeout(() => {
          reposUiStore.loadEnd()
        }, 2000);
      });
  }
}

const reposStore = new ReposStore(new ReposApi());

export { reposStore, ReposStore };