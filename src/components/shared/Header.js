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
        <Menu.Item key={RouteConstants.TRANSFER_PLAYLIST}>
          <Link to={RouteConstants.TRANSFER_PLAYLIST}>Transfer Playlist</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Header);