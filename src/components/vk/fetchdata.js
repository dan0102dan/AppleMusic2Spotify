import React from 'react';
import { Steps } from 'antd';

import { isLoggedIn } from '../../services/AuthService';
import AppleMusicPlaylist from '../../services/AppleMusicPlaylist';
import { getCurrentUser } from '../../services/ApiService';
import VKStep1 from './VKStep1';
import VKStep2 from './VKStep2';
import VKStep3 from './VKStep3';
import VKStep4 from './VKStep4';

export default class VK extends React.Component {

  state = {
    isFetching    : false,
    isFetchingUser: false,
    user          : null,
    step          : 0
  };

  constructor () {
    super();
    this.appleMusicPlaylist = new AppleMusicPlaylist({});
  }

  componentWillMount () {
    if (isLoggedIn()) {
      this.setState({
        isFetchingUser: true
      });
      getCurrentUser()
        .then((res) => {
          this.setState({
            isFetchingUser: false,
            user          : res.data
          });
        })
        .catch(() => {
          alert(`Couldn't fetch your data. Please refresh the page or try logging in again!`);
        });
    }
  }

  step1 () {
    return <VKStep1
      playlist={this.appleMusicPlaylist}
      onUpload={() => {
        this.setState({
          step: 1
        });
      }}
    />;
  }

  step2 () {
    return <VKStep2
      playlist={this.appleMusicPlaylist}
      next={() => this.setState({step: 2})}
    />;
  }

  step3 () {
    return <VKStep3
      playlist={this.appleMusicPlaylist}
      nextStep={() => this.setState({step: 3})}
    />;
  }

  step4 () {
    return <VKStep4
      user={this.state.user}
      playlist={this.appleMusicPlaylist}
    />;
  }

  content () {
    switch (this.state.step) {
      default:
      case 0:
        return this.step1();
      case 1:
        return this.step2();
      case 2:
        return this.step3();
      case 3:
        return this.step4();
    }
  }

  render () {
    const Step = Steps.Step;
    if (!isLoggedIn()) {
      return <h2 style={{textAlign: 'center'}}>You need to login first.</h2>;
    }
    if (this.state.isFetchingUser) {
      return <p style={{textAlign: 'center'}}>Fetching your data...</p>;
    }
    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Transfer Playlist</h2><br/>
        <Steps current={this.state.step}>
          <Step title="Upload Playlist" description="Insert the link"/>
          <Step title="Select Playlist Songs" description="Select specific songs of the playlist to transfer"/>
          <Step title="Find Playlist Songs" description="Automatic search for playlist songs on Spotify"/>
          <Step title="Import Songs" description="Import playlist songs to a Spotify playlist"/>
        </Steps>
        <div style={{marginTop: 50}}>
          {this.content()}
        </div>
      </div>
    );
  }
}
