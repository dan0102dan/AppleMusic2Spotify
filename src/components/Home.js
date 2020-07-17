import React from 'react';
import { Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { isLoggedIn, getLoginUrl, logout } from '../services/AuthService';

export default class Home extends React.Component {

  logout () {
    logout();
    this.forceUpdate();
  }

  loginMessage () {
    return <div>
      {isLoggedIn()
        ? <Button style={{ background: '#fff', color: 'green' }} onClick={this.logout.bind(this)}>Logout</Button>
        : <Button style={{ background: '#fff', color: 'green' }} href={getLoginUrl()}>Login</Button>}
    </div>;
  }

  render () {
    return (
      <div>
        <h2>Apple Music to Spotify <span role="img" aria-label="music">🎸</span></h2>
        <p>
          This tool helps you to transfer your playlists from apple music to Spotify.
        </p>
        {this.loginMessage()}
      </div>
    );
  }
}