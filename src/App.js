import React, { Component } from 'react';
import { Layout } from 'antd';

import Header from './components/shared/Header';
import Routes from './components/Routes';

import 'antd/dist/antd.css';
import 'sanitize.css';
import './styles.css';

class App extends Component {
  render () {
    return (
      <Layout>
        <Header/>
        <div id='content'>
          <div className='container'>
            <Routes/>
          </div>
        </div>
      </Layout>
    );
  }
}

export default App;