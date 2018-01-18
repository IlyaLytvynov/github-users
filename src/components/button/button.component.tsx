import * as React from 'react';
import * as classnames from 'classnames';

import './button.less';

export enum ButtonTypes {
  Submit, Danger, Default
}

interface IButtonComponentProps {
  placeholder: string;
  onClick: () => void;
  type?: ButtonTypes;
  classNames?: string;
}


export const ButtonComponent: React.SFC<IButtonComponentProps> = (props: IButtonComponentProps) =>{
    const {onClick, placeholder, type} = props;
    const classNames = classnames(props.classNames, {
      'button_submit': type === ButtonTypes.Submit,
      'button_danger': type === ButtonTypes.Danger,
      'button_default': type === ButtonTypes.Default || undefined
    }, 'button');

    return (
      <button className={classNames}
           onClick={onClick}>
        <span className='text'>{placeholder}</span>
      </button>
    );
};

