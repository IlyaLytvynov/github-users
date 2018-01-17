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
  constructor() {
    super();
    this.state = {
      username: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: SyntheticEvent<HTMLElement>) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
    this.setUserName('');
  }

  setUserName(username: string) {
    this.setState((state) => {
      return {
        ...state,
        username
      };
    });
  }

  handleUsernameChange(username: string) {
    this.props.onInput && this.props.onInput();
    this.setUserName(username);
  }

  render() {
    const {classNames, isValid} = this.props;
    const computedClassNames = classnames(classNames, isValid ? '' : 'login-form_not-valid', 'login-form');

    return (
      <form className={computedClassNames} onSubmit={this.handleSubmit}>
        <div className='input-wrapper'>
          <InputComponent placeholder='Name'
                          notValid={!isValid}
                          onFocus={() => this.props.onFocus && this.props.onFocus()}
                          onInput={this.handleUsernameChange} value={this.state.username}/>
        </div>
        <div className='input-wrapper error-message'>
          {this.props.errorMessage}
        </div>
        <div className='input-wrapper'>
          <ButtonComponent placeholder='Log in' classNames='button_submit' onClick={() => this.handleSubmit}/>
        </div>
      </form>
    );
  }
}
