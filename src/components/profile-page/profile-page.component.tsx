import * as  React from 'react';
import { inject, observer } from 'mobx-react';
import { History } from 'history';

import './profile-page.less';
import { ProfileStore } from '../../stores';
import { ProfileComponent } from '../profile/profile.component';
import { ReposListComponent } from '../repos-list/repos-list.component';

export interface IProfilePageProps {
  history: History;
  profileStore?: ProfileStore;
}

@inject('profileStore')
@observer
export class ProfilePageComponent extends React.Component<IProfilePageProps, {}> {
  private store: ProfileStore;

  constructor(props: IProfilePageProps) {
    super();
    this.store = props.profileStore!
  }

  componentDidMount() {
    this.store.loadRepos();
  }

  componentWillUnmount() {
    this.store.reset();
  }
  render() {
    const {user, repos} = this.store;

    if(user === undefined) {
      this.props.history.push('/login');
      return null;
    }

    return (
      <div className='page-content content-wrapper'>
        <ProfileComponent profileData={user} />
        <ReposListComponent repos={repos}/>
      </div>
    );
  }
}