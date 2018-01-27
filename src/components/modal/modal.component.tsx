import * as React from 'react';
import * as classnames from 'classnames';
import { ReactNode, SyntheticEvent } from 'react';

import './modal.less';

interface IModalComponentProps {
  visible: boolean;
  onClick: () => void;
  children?: ReactNode;
}

export class ModalComponent extends React.Component<IModalComponentProps> {
  constructor(props: IModalComponentProps) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(): void {
    this.props.onClick();
  }

  render() {
    const classNames = classnames('modal', {'showed': this.props.visible});

    return <div className={classNames}>
      <div className='modal__overlay showed' onClick={this.clickHandler}>
        <div className='modal__content' onClick={(e: SyntheticEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}>
          <div className='modal__close-btn' onClick={this.clickHandler}>close</div>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}
