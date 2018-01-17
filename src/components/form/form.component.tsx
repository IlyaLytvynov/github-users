import * as React from 'react';
import { FormEvent, SyntheticEvent } from 'react';

export interface IFormComponent {
  onSubmit: (state: IFormComponentState) => void;
}

export interface IFormComponentState {
  username: string;
}

export class FormComponent extends React.Component<IFormComponent, IFormComponentState> {
  constructor() {
    super();
    this.state = {
      username: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: SyntheticEvent<HTMLElement>) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  handleUsernameChange(e: SyntheticEvent<HTMLInputElement>) {
    const username = e.currentTarget.value;
    this.setState((state) => {
      return {...state, username};
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' onChange={this.handleUsernameChange}/>
        <input type='submit' value='submit'/>
        {this.props.children}
      </form>
    );
  }
}
