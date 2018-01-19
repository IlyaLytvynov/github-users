import * as React from 'react';
import { LoginFormComponent } from '../login-form/login-form.component';
import { inject, observer } from 'mobx-react';
import { History } from 'history';
import { AuthStore, CommonUiStore } from '../../stores';
import { LoaderComponent } from '../loader/loader.component';

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
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.store = props.authStore!;
    this.uiStore = props.commonUiStore!;
  }


  onSubmit(username: string): void {
    this.uiStore.load();
    this.store.login(username).then(() => {
      this.props.history.replace('/profile');
    });
  }

  render() {
    const isValid = this.store.loginError === undefined;
    const errorMessage = !isValid ? this.store.loginError : '';

    return (
      <div className='login-page page-content content-wrapper'>
        <LoginFormComponent
          isValid={isValid}
          onFocus={() => this.store.resetErrors()}
          errorMessage={errorMessage}
          onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}
