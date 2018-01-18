import * as React from 'react';

import './modal.less';
import { ReactNode, SyntheticEvent } from 'react';

interface IModalComponentProps {
  visible: boolean;
  onClick: () => void;
  children?: ReactNode;
}

export class ModalComponent extends React.Component<IModalComponentProps> {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(): void {
    this.props.onClick();
  }
  render() {
    if (this.props.visible) {
      return <div className='modal__overlay' onClick={this.clickHandler}>
        <div className='modal__content' onClick={(e: SyntheticEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}>
          <div className='modal__close-btn' onClick={this.clickHandler}>close</div>
          {this.props.children}
        </div>
      </div>
    }

    return null;
  }
}
