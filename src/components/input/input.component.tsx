import * as React from 'react';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';

import { Component, SyntheticEvent, KeyboardEvent } from 'react';

import './input.less';

export interface IColors {
  primary?: string;
  notValid?: string;
  placeholder?: string;
  background?: string;
  text?: string;
  active?: string;
}

export interface IInputComponentProps {
  placeholder: string;
  onInput: (text: string) => void;
  value: string;
  colors?: IColors;
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

    this.state = {
      isActive: this.props.value.length > 0,
      isFocused: false
    };

    this.setTextValue = this.setTextValue.bind(this);
    this.onInput = this.onInput.bind(this);
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

  componentWillReceiveProps(nextProps: IInputComponentProps) {
    const isActive = nextProps.value.length > 0 || this.state.isFocused;
    this.toggleActive(isActive);
  }

  generateColor(): string | undefined {
    if (!this.props.colors) {
      return undefined
    }
    const {
      primary,
      notValid,
      active
    } = this.props.colors;

    if (this.state.isActive) {
      return active
    }

    if (this.props.notValid) {
      return notValid
    }

    return primary;
  }

  render() {
    let classNames = classnames(
      'input',
      {active: this.state.isActive}
    );


    const inputStyles = {
      color: this.generateColor(),
      borderColor: this.generateColor()
    };
    const labelStyles = {color: this.generateColor()};


    return (
      <div className={classNames}>
        <input className='input-native-input'
               onInput={this.onInput}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               value={this.props.value}
               type='text'
               style={inputStyles}
        />
        <label className='input-label' style={labelStyles}>{this.props.placeholder}</label>
      </div>
    );
  }

  private setTextValue(text: string): void {
    this.props.onInput(text);
  }

  private onInput(e: SyntheticEvent<HTMLInputElement>): void {
    this.setTextValue(e.currentTarget.value);
  }

}
