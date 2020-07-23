import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as RouteConstants from '../constants/RouteConstants';

import Home from './Home';
import Apple from './apple/Apple';
import VK from './vk/fetchdata';
import Yandex from './yandex/Yandex';
import LoginCallback from './LoginCallback';

export default class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path={RouteConstants.HOME} component={Home}/>
        <Route path={RouteConstants.APPlE} component={Apple}/>
        <Route path={RouteConstants.VK} component={VK}/>
        <Route path={RouteConstants.YANDEX} component={Yandex}/>
        <Route path={RouteConstants.LOGIN_CALLBACK} component={LoginCallback}/>
      </Switch>
    );
  }
}