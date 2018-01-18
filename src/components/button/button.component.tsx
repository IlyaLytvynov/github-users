import * as React from 'react';
import * as classnames from 'classnames';
import { Component, MouseEvent } from 'react';

import './button.less';

export interface IInputComponentProps {
  placeholder: string;
  onClick: () => void;
  classNames?: string;
}

interface IRippleStyles {
  width: number;
  height: number;
  top: string;
  left: string;
}

interface IState {
  rippleStyles: IRippleStyles | undefined;
  animated: boolean;
}

export class ButtonComponent extends Component<IInputComponentProps, IState> {

  private _ripple: HTMLSpanElement | null;
  private _btnElement: HTMLButtonElement | null;
  private _timeOut: number = 0;
  private _DURATION = 200; // MS

  constructor(props: IInputComponentProps) {
    super(props);
    this.state = {
      animated: false,
      rippleStyles: undefined
    };
  }

  componentWillUnmount(): void {
    clearTimeout(this._timeOut);
  }

  onClickHandler(e: MouseEvent<HTMLElement>): void {
    this.animate(e);
    setTimeout(() => {
      this.props.onClick();
    }, this._DURATION);
  }

  render() {
    let classNames = classnames(this.props.classNames, 'button');
    let rippleClasses = classnames('ripple', {rippleEffect: this.state.animated});

    return (
      <button className={classNames}
           onClick={this.onClickHandler.bind(this)}
           ref={(node) => this._btnElement = node}>
        <span className='text'>{this.props.placeholder}</span>
        <span className={rippleClasses} ref={(node) => this._ripple = node} style={this.state.rippleStyles}> </span>
      </button>
    );
  }

  private animate(e: MouseEvent<HTMLElement>): void {
    const nativeEvent = e.nativeEvent;
    const posX = nativeEvent.offsetX;
    const posY = nativeEvent.offsetY;

    let width = this._btnElement!.offsetWidth / 10;

    let height = this._btnElement!.offsetHeight / 10;

    if (width >= height) {
      height = width;
    } else {
      width = height;
    }

    this.setState((prevState: IState) => {
      const newState = Object.assign((prevState));

      newState.rippleStyles = {
        animationDuration: `${this._DURATION + 100}ms`,
        display: 'block',
        height,
        left: posX + 'px',
        opacity: 1,
        top: posY + 'px',
        width
      };
      newState.animated = true;
      return newState;
    });

    this._timeOut = window.setTimeout(() => {
      this.setState((prevState: IState) => {
        const rippleStyles = undefined;
        const animated = false;
        return {...prevState, rippleStyles, animated};
      });
    }, this._DURATION);
  }

}


