import React from 'react';
import { Button } from 'antd';
import { isLoggedIn, getLoginUrl, logout } from '../services/AuthService';

export default class Home extends React.Component {

  logout () {
    logout();
    this.forceUpdate();
  }

  loginMessage () {
    return <div>
      {isLoggedIn()
        ? <Button onClick={this.logout.bind(this)}>Logout</Button>
        : <Button href={getLoginUrl()}>Login</Button>}
    </div>;
  }

  render () {
    return (
      <div>
        <h2>Apple Music to Spotify <span role="img" aria-label="music">🎸</span></h2>
        <p>
          This tool helps you to transfer your playlists from Apple Mucic to Spotify.
        </p>
        {this.loginMessage()}
      </div>
    );
  }
}