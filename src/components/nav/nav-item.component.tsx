import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './nav-item.less';

export interface INavItemProps {
  url: string;
  children?: ReactNode;
}

export const NavItemComponent: React.SFC<INavItemProps> = (props: INavItemProps) => {
  const {url} = props;
  return (
    <li className='nav-item'>
      <Link to={url} ><span className='nav-item__title'>{props.children}</span></Link>
    </li>
  );
};
