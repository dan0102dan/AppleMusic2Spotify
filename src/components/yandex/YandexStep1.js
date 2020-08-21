import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Card, notification, message } from 'antd';
import AppleMusicPlaylist from '../../services/AppleMusicPlaylist';
import axios from 'axios-jsonp-pro';

const success = () => {
  const hide = message.loading('Action in progress..', 0);
  setTimeout(hide, 2500);
};

export default class YandexStep1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = { disabled: false }
  }

  render () {
    return <Card style={{marginRight: 'auto', marginLeft: 'auto', maxWidth: '650px', textAlign: 'center'}}>
      <p>
        Insert the playlist link in the lower field and press Enter
      </p>
        <Input
        disabled={this.state.disabled}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            this.setState({ disabled: true })
           try {
            var user; var playlistId; var app;
            app = 'yandex'
            var str = e.target.value
            if (str.search(/playlist/i) > -1) {
              str = str.split('playlist');
              playlistId = Number(str[1].replace(/[^\d]/g, ''));
              str.splice(1, 1); str = str[0];
              str = str.split('users');
              user = str[1].replace(/\//g, '');
              success()
            } else {
              this.setState({ disabled: false })
              notification.error({
                message    : 'Error',
                description: 'Incorrect link. Please try again.'
              });
              return;
            }
            } catch {
              this.setState({ disabled: false })
              notification.error({
                message    : 'Error',
                description: 'Incorrect link. Please try again.'
              });
              return;
            }
          try {
            await axios.post('https://server.dan0102dan.ru', {
              data: {
                user, playlistId, app
              }
            })
            .then((response) => {
              try {
              this.props.playlist.setYandexPlaylist(response);
              this.props.onUpload();
              } catch {
                this.setState({ disabled: false })
                notification.error({
                  message    : 'Error',
                  description: response.data?.error_msg ? response.data?.error_msg : 'Server error'
                });
              }
            })
          } catch {
            this.setState({ disabled: false })
            notification.error({
              message    : 'Error',
              description: 'Your Internet connection is not stable.'
            })
          }
        }
        }} placeholder="https://music.yandex.ru/users/..."/>
    </Card>;
  }
}

YandexStep1.propTypes = {
  playlist: PropTypes.instanceOf(AppleMusicPlaylist).isRequired,
  onUpload: PropTypes.func.isRequired
};