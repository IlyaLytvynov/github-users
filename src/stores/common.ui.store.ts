import { action, observable } from 'mobx';

class CommonUiStore {
  @observable
  isLoading: boolean = false;

  @action
  load() {
    this.isLoading = true;
  }

  @action
  loadEnd() {
    this.isLoading = false;
  }
}

const commonUiStore = new CommonUiStore();

export {commonUiStore, CommonUiStore};