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

export default class VKStep1 extends React.Component {
  constructor (props) {
    super(props)
    this.state = { disabled: false }
  }

  render () {
    return <Card style={{marginRight: 'auto', marginLeft: 'auto', maxWidth: '650px', textAlign: 'center'}}>
      <p>
        Insert the album link in the lower field and press Enter
      </p>
        <Input
        disabled={this.state.disabled}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            this.setState({ disabled: true })
           try {
            var userId; var playlistId; var access_key; var app;
            app = 'vk'
            var str = e.target.value
            if (str.search(/playlist/i) > -1) {
              str = str.split('playlist')
              str.splice(0, 1)
              str = str[0].toString()
              str = str.split('_')
              userId = Number(str[0].replace(/[^-_\d]/g, ''))
              str = str[1].split('/')
              playlistId = Number(str[0])
              access_key = str[1]
              success()
            }
            else if (str.search(/album/i) > -1) {
              str = str.split('album')
              str.splice(0, 1)
              str = str[0].toString()
              str = str.split('_')
              userId = Number(str[0].replace(/[^-_\d]/g, ''))
              playlistId = Number(str[1])
              access_key = str[2]
              success()
            }
            else {
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
                userId, playlistId, access_key, app
              }
            })
            .then((response) => {
              try {
              this.props.playlist.setVKPlaylist(response);
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
        }} placeholder="https://vk.com/music/playlist/..."/>
    </Card>;
  }
}

VKStep1.propTypes = {
  playlist: PropTypes.instanceOf(AppleMusicPlaylist).isRequired,
  onUpload: PropTypes.func.isRequired
};