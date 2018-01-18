import { action, observable } from 'mobx';

class CommonUiStore {
  @observable
  isLoading: boolean = false;

  @observable
  modalVisible: boolean = false;

  @action
  load(): void {
    this.isLoading = true;
  }

  @action
  loadEnd(): void {
    this.isLoading = false;
  }

  @action
  openModal(): void {
    this.modalVisible = true;
  }

  @action
  closeModal(): void {
    this.modalVisible = false;
  }

}

const commonUiStore = new CommonUiStore();

export {commonUiStore, CommonUiStore};