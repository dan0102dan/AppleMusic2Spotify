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
    return <div className='button'>
      {isLoggedIn()
        ? <Button size="l" style={{ background: '#1DB954', color: '#fff', display: 'flex', margin: '0 auto', width: '202px', height: '53px', borderRadius: '500px', fontSize: '10px', alignItems: 'center', justifyContent: 'center' }} onClick={this.logout.bind(this)}>Logout</Button>
        : <Button size="l" style={{ background: '#1DB954', color: '#fff', display: 'flex', margin: '0 auto', width: '202px', height: '53px', borderRadius: '500px', fontSize: '10px', alignItems: 'center', justifyContent: 'center' }} href={getLoginUrl()}>Login</Button>}
    </div>;
  }

  render () {
    return (
      <div>
        <h1 style={{textAlign: 'center', fontSize: '53px'}}>Apple Music to Spotify <span role="img" aria-label="music">🎸</span></h1>
        <h2 style={{textAlign: 'center'}}>
          This tool helps you to transfer your playlists from apple music to Spotify.
        </h2>
        {this.loginMessage()}
      </div>
    );
  }
}