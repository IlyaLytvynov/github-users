import * as React from 'react';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';

import { Component, SyntheticEvent, KeyboardEvent } from 'react';

import './input.less';

export interface IInputComponentProps {
  placeholder: string;
  onInput: (text: string) => void;
  value: string;
  classNames?: string;
  notValid?: boolean;
  onFocus?: () => void;
  onSubmit?: () => void;
}

interface IState {
  isActive: boolean;
}

@observer
export class InputComponent extends Component<IInputComponentProps, IState> {
  private nativeInput: HTMLInputElement | null;

  constructor() {
    super();
    this.setTextValue = this.setTextValue.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  render() {
    let classNames = classnames(
      'input',
      {'input_not-valid': this.props.notValid === true},
      {active: this.props.value.length > 0}
    );

    return (
      <div className={classNames}>
        <div className='input-label'>{this.props.placeholder}</div>
        <input className='input-native-input'
               onKeyPress={this.onKeyPress}
               onInput={this.onInput}
               onFocus={() => this.props.onFocus && this.props.onFocus()}
               value={this.props.value}
               ref={(input) => {
                 this.nativeInput = input;
               }}
               type='text'/>
        <div className='input-underline'></div>
      </div>
    );
  }

  private setTextValue(text: string): void {
    this.props.onInput(text);
  }

  private onInput(e: SyntheticEvent<HTMLInputElement>): void {
    this.setTextValue(e.currentTarget.value);
  }

  private onKeyPress(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.charCode === 13 && this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

}


