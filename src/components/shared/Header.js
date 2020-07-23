import React from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import * as RouteConstants from '../../constants/RouteConstants';

class Header extends React.Component {
  render () {
    return (
      <Menu id='menu' onClick={this.handleClick} selectedKeys={[this.props.location.pathname]} mode="horizontal">
        <Menu.Item key={RouteConstants.HOME}>
          <Link to={RouteConstants.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item key={RouteConstants.APPlE}>
          <Link to={RouteConstants.APPlE}>Apple Music</Link>
        </Menu.Item>
        <Menu.Item key={RouteConstants.VK}>
          <Link to={RouteConstants.VK}>Boom (VK)</Link>
        </Menu.Item>
        <Menu.Item key={RouteConstants.YANDEX}>
          <Link to={RouteConstants.YANDEX}>Yandex</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Header);