import * as React from 'react';
import './nav.less';

export interface INavComponentProps {
  children?: any;
}

const NavComponent: React.SFC<INavComponentProps> = (props: INavComponentProps) => {
  return (
    <nav className='nav'>
      <ul className='nav__menu'>
        {props.children}
      </ul>
    </nav>
  );
};

export { NavComponent }
