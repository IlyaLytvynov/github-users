import * as React from 'react';
import { NavComponent } from '../nav/nav.component';
import { config } from './header.configs';

import './header.less';
import { Logo } from '../logo/logo.component';
import { NavItemComponent } from '../nav/nav-item.component';

export class HeaderComponent extends React.Component {
  render() {
    const navItems = config.navbarItems.map((navitemConfig: any, i) => {
      return <NavItemComponent key={i} url={navitemConfig.url}>{navitemConfig.title}</NavItemComponent>;
    });

    return <header className='app-header'>
      <div className='app-header__content content-wrapper'>
        <div className='app-header__logo logo'>
          <Logo />
        </div>
        <div className='app-header__nav'>
          <NavComponent>
            {navItems}
          </NavComponent>
        </div>
      </div>
    </header>
  }
}