import * as  React from 'react';
import { inject, observer } from 'mobx-react';
import { History } from 'history';

import { CommonUiStore, ProfileStore } from '../../stores';
import { ProfileComponent } from '../profile/profile.component';
import { ReposListComponent } from '../repos-list/repos-list.component';
import { ModalComponent } from '../modal/modal.component';
import { IRepo } from '../../types';
import { RepoDetailsComponent } from '../repo-details/repo-details.component';

import './profile-page.less';

export interface IProfilePageProps {
  history: History;
  profileStore?: ProfileStore;
  commonUiStore?: CommonUiStore;
}

export interface IProfilePageState {
  selectedRepo: IRepo|undefined;
}
@inject('profileStore', 'commonUiStore')
@observer
export class ProfilePageComponent extends React.Component<IProfilePageProps, IProfilePageState> {
  private store: ProfileStore;
  private commonUiStore: CommonUiStore;

  constructor(props: IProfilePageProps) {
    super();
    this.store = props.profileStore!;
    this.commonUiStore = props.commonUiStore!;
    this.onRepoClick = this.onRepoClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      selectedRepo: undefined
    }
  }

  componentDidMount(): void {
    this.store.loadRepos();
  }

  onRepoClick(id: number): void {
    this.setState((state: IProfilePageState) => {
      const selectedRepo = this.store.getRepo(id);
      return {...state, selectedRepo};
    });
    this.commonUiStore.openModal();
  }

  closeModal(): void {
    this.commonUiStore.closeModal();
    this.setState((state: IProfilePageState) => {
      const selectedRepo = undefined;
      return {...state, selectedRepo};
    });
  }

  render() {
    const {user, repos} = this.store;
    const {modalVisible} = this.commonUiStore;
    const {selectedRepo} = this.state;
    let selectedRepoComponent;

    if(selectedRepo !== undefined) {
      selectedRepoComponent = <RepoDetailsComponent repoData={selectedRepo}/>
    }
    if (user === undefined) {
      this.props.history.push('/login');
      return null;
    }

    return (
      <div className='page-content content-wrapper'>
        <ProfileComponent profileData={user}/>
        <ReposListComponent repos={repos} onClick={this.onRepoClick}/>
        <ModalComponent visible={modalVisible} onClick={this.closeModal}>
          {selectedRepoComponent}
        </ModalComponent>
      </div>
    );
  }
}
