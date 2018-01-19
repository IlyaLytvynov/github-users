import { action, observable } from 'mobx';
import { UiBaseStore } from './ui.base.store';

class ReposUiStore extends UiBaseStore {
  @observable
  isLoading: boolean = true;

  @action
  load(): void {
    this.isLoading = true;
  }

  @action
  loadEnd(): void {
    this.isLoading = false;
  }
}

const reposUiStore = new ReposUiStore();

export {reposUiStore, ReposUiStore};