import * as React from 'react';
import { LoginFormComponent } from '../login-form/login-form.component';
import { inject, observer } from 'mobx-react';
import { History } from 'history';
import { AuthStore, CommonUiStore } from '../../stores';
import { LoaderComponent } from '../loader/loader.component';

import {config} from '../../configs/app.config';

interface ILoginPageComponentProps {
  history: History;
  authStore?: AuthStore;
  commonUiStore?: CommonUiStore
}

@inject('authStore', 'commonUiStore')
@observer
export class LoginPageComponent extends React.Component<ILoginPageComponentProps> {
  private store: AuthStore;
  private uiStore: CommonUiStore;

  constructor(props: ILoginPageComponentProps) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.store = props.authStore!;
    this.uiStore = props.commonUiStore!;
  }


  onSubmit(username: string) {
    this.store.login(username).then(() => {
      this.props.history.replace('/profile');
    });
  }

  render() {
    const isValid = this.store.loginError === undefined;
    const errorMessage = !isValid ? this.store.loginError : '';
    const {isLoading} = this.uiStore;
    return (
      <div className='login-page'>
        <LoaderComponent visible={isLoading} />
        <LoginFormComponent
          isValid={isValid}
          onFocus={() => this.store.resetErrors()}
          errorMessage={errorMessage}
          onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}