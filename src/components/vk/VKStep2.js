import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';
import { Table } from 'antd';

import AppleMusicPlaylist from '../../services/AppleMusicPlaylist';

export default class VKStep2 extends React.Component {

  state = {
    selectedRowKeys: []
  };

  nextStep () {
    this.props.playlist.filter(this.state.selectedRowKeys);
    this.props.next();
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  };

  nextStepButton () {
    const {selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    return <div style={{margin: '16px 0', textAlign: 'right'}}>
           <span style={{marginRight: 8}}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
      <Button
      size="l" 
      style={{ background: '#d6363f', color: '#fff', borderRadius: '500px' }}
      onClick={this.nextStep.bind(this)}
      disabled={!hasSelected}>
        <div
        display='flex'>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          Next Step<Icon28ArrowRightOutline style={{marginLeft: 4}}/>
            </div>
          </div>
      </Button>
    </div>;
  }

  render () {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div style={{padding: '0 0'}}>
        {this.nextStepButton()}
        <Table
          rowSelection={rowSelection}
          columns={[
            {
              title    : 'Name',
              dataIndex: 'name',
            },
            {
              title    : 'Artist',
              dataIndex: 'artist',
            },
            {
              title    : 'Album',
              dataIndex: 'album',
            }
          ]}
          rowKey={'index'}
          dataSource={this.props.playlist.playlist}
          pagination={false}
          bordered
        />
        {this.nextStepButton()}
      </div>
    );
  }
}

VKStep2.propTypes = {
  playlist: PropTypes.instanceOf(AppleMusicPlaylist).isRequired,
  next    : PropTypes.func.isRequired
};