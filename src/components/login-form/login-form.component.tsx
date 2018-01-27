import * as classnames from 'classnames';
import * as React from 'react';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

import './login-form.less'
import { SyntheticEvent } from 'react';

export interface IFormComponent {
  onSubmit: (username: string) => void;
  isValid: boolean;
  onFocus?: () => void;
  onInput?: () => void;
  errorMessage?: string;
  classNames?: string;
}

export interface IFormComponentState {
  username: string;
}

export class LoginFormComponent extends React.Component<IFormComponent, IFormComponentState> {
  constructor(props: IFormComponent) {
    super(props);
    this.state = {
      username: 'ilyalytvynov'
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: SyntheticEvent<HTMLElement>): void {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
    this.setUserName('');
  }

  setUserName(username: string): void {
    this.setState((state: IFormComponentState) => ({...state, username}));
  }

  handleUsernameChange(username: string): void {
    this.setUserName(username);
  }

  render() {
    const {classNames, isValid, errorMessage} = this.props;
    const computedClassNames = classnames(classNames, isValid ? '' : 'login-form_not-valid', 'login-form');

    const {username} = this.state;
    return (
      <form className={computedClassNames} onSubmit={this.handleSubmit}>
        <div className='input-wrapper'>
          <InputComponent placeholder='Name'
                          notValid={!isValid}
                          onFocus={() => this.props.onFocus && this.props.onFocus()}
                          onInput={this.handleUsernameChange} value={username}/>
          <div className='error-message'>{errorMessage}</div>
        </div>
        <div className='input-wrapper'>
          <ButtonComponent placeholder='Log in' classNames='button_submit' onClick={() => this.handleSubmit}/>
        </div>
      </form>
    );
  }
}
