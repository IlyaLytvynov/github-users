import * as React from 'react';
import { ReactNode } from 'react';
import './nav.less';

export interface INavComponentProps {
  children?: ReactNode;
}

export const NavComponent: React.SFC<INavComponentProps> = (props: INavComponentProps) => {
  return (
    <nav className='nav'>
      <ul className='nav__menu'>
        {props.children}
      </ul>
    </nav>
  );
};
