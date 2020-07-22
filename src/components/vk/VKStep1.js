import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Card, notification } from 'antd';
import AppleMusicPlaylist from '../../services/AppleMusicPlaylist';
import axios from 'axios-jsonp-pro';

export default class VKStep1 extends React.Component {
  render () {
    return <Card style={{marginRight: 'auto', marginLeft: 'auto', maxWidth: '650px', textAlign: 'center'}}>
      <p>
        Insert the album link in the lower field and press Enter
      </p>
        <Input
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
           try {
            var userId; var albumId; var access_key; var app;
            app = 'vk'
            var str = e.target.value
            if (str.search(/playlist/i) > -1) {
              str = str.split('playlist')
              str.splice(0, 1)
              str = str[0].toString()
              str = str.split('_')
              userId = Number(str[0].replace(/[^-_\d]/g, ''))
              str = str[1].split('/')
              albumId = Number(str[0])
              access_key = str[1]
            }
            else if (str.search(/album/i) > -1) {
              str = str.split('album')
              str.splice(0, 1)
              str = str[0].toString()
              str = str.split('_')
              userId = Number(str[0].replace(/[^-_\d]/g, ''))
              albumId = Number(str[1])
              access_key = str[2]
            }
            } catch {
              notification.error({
                message    : 'Error',
                description: 'Incorrect link. Please try again.'
              });
              return;
            }
          try {
            await axios.post('https://server.dan0102dan.ru', {
              data: {
                userId, albumId, access_key, app
              }
            })
            .then((response) => {
              try {
              this.props.playlist.setVKPlaylist(response);
              this.props.onUpload();
              } catch {
                notification.error({
                  message    : 'Error',
                  description: response?.data.error.error_msg ? response?.data.error.error_msg : 'Server error'
                });
              }
            })
          } catch {
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