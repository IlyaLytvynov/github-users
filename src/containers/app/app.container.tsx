import * as React from 'react';
import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { authStore, profileStore,commonUiStore } from '../../stores';

import { HeaderComponent } from '../../components/header/header.component';
import { LoginPageComponent } from '../../components/login-page/login-page.component';
import { ProfilePageComponent } from '../../components/profile-page/profile-page.component';
import { LogoutComponent } from '../../components/logout/logout.componet';

const stores = {
  authStore, profileStore, commonUiStore
};

export class AppContainer extends Component<{}, {}> {
  render() {
    return (
      <Provider {...stores} >
        <HashRouter>
          <div className='app-wrapper'>
            <HeaderComponent/>
            <Switch>
              <Route exact path='/login' render={({...props}) => <LoginPageComponent {...props}/>}/>}/>
              <Route exact path='/profile' render={({...props}) => <ProfilePageComponent {...props} />}/>
              <Route exact path='/logout' render={({...props}) => <LogoutComponent {...props}/>}/>
              <Redirect to='/login'/>
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
