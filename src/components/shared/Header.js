import React from 'react';
import { PageHeader, Button, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { isLoggedIn } from '../../services/AuthService';
import { getCurrentUser } from '../../services/ApiService';
import * as RouteConstants from '../../constants/RouteConstants';

const error = () => {
  message.error('Authorisation error');
};

class Header extends React.Component {

  constructor (props) {
    super(props)

    this.state = { name: '' }
    this.state = { photo: '' }
    this.state = { isFetchingUser: false }
  }

  componentDidUpdate () {
    if (this.state.isFetchingUser) return;
    if (isLoggedIn()) {
      getCurrentUser()
        .then((res) => {
          this.setState({
            isFetchingUser: true,
            photo: res.data.images[0].url,
            name: res.data.display_name
          });
        })
        .catch(() => {
          error()
        });
    }
  }

  render () {
    return (
      <PageHeader
    title="2 Spotify"
    subTitle = {this.state.isFetchingUser ? `Hello, ${this.state.name}!` : 'Hello, friend!'}
    extra={[
      <Button key={RouteConstants.HOME} type="link" style={{marginTop: '6px', marginLeft: '8px', border: '1px solid transparent', borderColor: '#d9d9d9', borderRadius: '4px', color: '#000'}}><Link to={RouteConstants.HOME}>Home</Link></Button>,
      <Button id='AppleButton' key={RouteConstants.APPlE} type="link" style={{marginTop: '6px', marginLeft: '8px'}}><Link to={RouteConstants.APPlE}>Apple Music</Link></Button>,
      <Button id='VKButton' key={RouteConstants.VK} type="link" style={{marginTop: '6px', marginLeft: '8px'}}><Link to={RouteConstants.VK}>Boom (VK)</Link></Button>,
      <Button id='YandexButton' key={RouteConstants.YANDEX} type="link" style={{marginTop: '6px', marginLeft: '8px'}}><Link to={RouteConstants.YANDEX}>Yandex</Link></Button>
    ]}
    avatar={ this.state.isFetchingUser ? {src: this.state.photo} : null}
    ></PageHeader>
    );
  }
}

export default withRouter(Header);