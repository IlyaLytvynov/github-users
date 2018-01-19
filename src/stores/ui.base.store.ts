import { action, observable } from 'mobx';

abstract class UiBaseStore {
  isLoading: boolean;
  abstract load(): void;
  abstract loadEnd(): void;
}

export { UiBaseStore };