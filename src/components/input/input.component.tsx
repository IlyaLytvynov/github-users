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
  onBlur?: () => void;
  onSubmit?: () => void;
}

interface IState {
  isActive: boolean;
  isFocused: boolean;
}

@observer
export class InputComponent extends Component<IInputComponentProps, IState> {
  constructor(props: IInputComponentProps) {
    super(props);
    this.setTextValue = this.setTextValue.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  toggleActive(isActive: boolean): void {
    this.setState((state: IState) => {
      return {
        ...state,
        isActive
      };
    });
  }

  toggleFocus(isFocused: boolean) {
    this.setState((state: IState) => {
      return {
        ...state,
        isFocused
      };
    });
  }
  onFocus() {
    this.toggleActive(true);
    this.toggleFocus(true);
    this.props.onFocus && this.props.onFocus();
  }

  onBlur() {
    if (this.props.value.length === 0) {
      this.toggleActive(false);
    }
    this.toggleFocus(false);
    this.props.onBlur && this.props.onBlur();
  }

  componentWillMount() {
    this.state = {
      isActive: this.props.value.length > 0,
      isFocused: false
    }
  }

  componentWillReceiveProps(nextProps: IInputComponentProps) {
    debugger;
    const isActive = nextProps.value.length > 0 || this.state.isFocused;
    this.toggleActive(isActive);
  }

  render() {
    let classNames = classnames(
      'input',
      {'input_not-valid': this.props.notValid === true},
      {active: this.state.isActive}
    );

    return (
      <div className={classNames}>
        <input className='input-native-input'
               onKeyPress={this.onKeyPress}
               onInput={this.onInput}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               value={this.props.value}
               type='text'/>
        <label className='input-label'>{this.props.placeholder}</label>
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


