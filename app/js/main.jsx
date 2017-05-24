import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Template from './components/MainTemplateComponent.jsx';
import Login from './components/Login.jsx';
import UserConfig from './components/UserConfig.jsx';
import UserHome from './components/UserHome.jsx';

import configureStore from './store/configureStore';


injectTapEventPlugin();

let preloadedState = {};
let loggedUser;
let loggedUserPass;
let loggedUserName;
let loggedUserUid;

if (typeof (Storage) !== 'undefined') {
    // Code for localStorage/sessionStorage.
    loggedUser = localStorage.getItem('loggedUser') || '';
    loggedUserPass = localStorage.getItem('loggedUserPass') || '';
    loggedUserName = localStorage.getItem('loggedUserName') || '';
    loggedUserUid = localStorage.getItem('loggedUserUid') || '';

    preloadedState = {
        loggedUser,
        loggedUserPass,
        loggedUserName,
        loggedUserUid
    };
}

const storeInstance = configureStore(preloadedState);

/* <Route path="/home/" component={Template} >
    <Route path="config/" component={UserConfig} />
    <Route path="consulta/(:filter)" component={SolicitacaoList} />
    <Route path="aprovar/(:filter)" component={Aprovar} />
</Route>*/

ReactDOM.render(
  (
      <Provider store={storeInstance}>
          <HashRouter>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/login" component={Login} />
                  <Template>
                      <Route path="/home/home" component={UserHome} />
                      <Route path="/home/config/" component={UserConfig} />
                      <Route path="/home/addAnimal/" component={UserConfig} />
                      <Route path="/home/searchAnimal/" component={UserConfig} />
                      <Route path="/home/foundAnimal/" component={UserConfig} />
                  </Template>

              </Switch>
          </HashRouter>
      </Provider>
)
, document.getElementById('app'));
