import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Icon24More from '@vkontakte/icons/dist/28/more';
import '@vkontakte/vkui/dist/vkui.css';

import * as RouteConstants from '../../constants/RouteConstants';

class Header extends React.Component {
  render () {
    return (
      <Layout.Header id="header">
        <h1>Apple Music 2 Spotify</h1>
        <Menu
          id='menu'
          overflowedIndicator={<Icon24More width={"35"} height={"35"} style={{marginBottom: '13px', marginLeft: 'auto'}}/>}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[this.props.location.pathname]}
          style={{lineHeight: '64px'}}
        >
          <Menu.Item key={RouteConstants.HOME}>
            <Link to={RouteConstants.HOME}>Home</Link>
          </Menu.Item>
          <Menu.Item key={RouteConstants.TRANSFER_PLAYLIST}>
            <Link to={RouteConstants.TRANSFER_PLAYLIST}>Transfer Playlist</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

export default withRouter(Header);