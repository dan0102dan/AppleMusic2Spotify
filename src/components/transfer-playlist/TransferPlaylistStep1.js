import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28DownloadOutline from '@vkontakte/icons/dist/28/download_outline';
import { Upload, Card, notification } from 'antd';
import AppleMusicPlaylist from '../../services/AppleMusicPlaylist';

export default class TransferPlaylistStep1 extends React.Component {

  beforeUpload (file) {
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (evt) => {
      const text = evt.target.result;
      try {
        this.props.playlist.setPlaylist(text);
        this.props.onUpload();
      }
      catch (error) {
        notification.error({
          message    : 'Error',
          description: error.message
        });
      }
    };
    reader.onerror = function (evt) {
      notification.error({
        message    : 'Error',
        description: 'Couldn\'t read file content. please try again.'
      });
    };
    return false;
  }

  render () {
    return <Card style={{marginRight: 'auto', marginLeft: 'auto', maxWidth: '650px', textAlign: 'center'}}>
      <p>
        Select your playlist in iTunes and from "File" menu click on "Library" then "Export Playlist". <br/>
        Then from "Format" menu select "Unicode Text" and save the file. (must be a <code>.txt</code> file) <br/>
        Upload this file from the following field:
      </p>
      <Upload beforeUpload={this.beforeUpload.bind(this)} fileList={[]}>
        <Button before={<Icon28DownloadOutline/>} style={{color: '#1DB954', background: '#e2f1e5'}}>
          Select File
        </Button>
      </Upload>
    </Card>;
  }
}

TransferPlaylistStep1.propTypes = {
  playlist: PropTypes.instanceOf(AppleMusicPlaylist).isRequired,
  onUpload: PropTypes.func.isRequired
};