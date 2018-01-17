import { action, observable } from 'mobx';

class CommonUiStore {
  @observable
  isLoading: boolean = false;

  @observable
  modalVisible: boolean = false;

  @action
  load() {
    this.isLoading = true;
  }

  @action
  loadEnd() {
    this.isLoading = false;
  }

  @action
  openModal() {
    this.modalVisible = true;
  }

  @action
  closeModal() {
    this.modalVisible = false;
  }

}

const commonUiStore = new CommonUiStore();

export {commonUiStore, CommonUiStore};