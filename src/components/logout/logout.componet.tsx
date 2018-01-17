import * as React from 'react';
import { inject } from 'mobx-react';
import { History } from 'history';

import { AuthStore } from '../../stores';

export interface ILogoutComponentProps {
  history: History;
  authStore?: AuthStore;
}

@inject('authStore')
class LogoutComponent extends React.Component<ILogoutComponentProps> {

  componentDidMount() {
    this.props.authStore!.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <h1 className='loading-text'>
        Logging out...
      </h1>
    );
  }
}

export { LogoutComponent };