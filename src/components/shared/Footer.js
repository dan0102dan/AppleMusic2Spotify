import React from 'react';
import { Layout } from 'antd';

export default class Footer extends React.Component {
  render () {
    return (
      <Layout.Footer style={{textAlign: 'center'}}>
        Made with <span role="img" aria-label="RedHeart">❤️</span> by <a style={{color: 'darkgreen'}} href="https://dan0102dan.ru">dan0102dan</a>
        <span> and </span>
        <a href="https://github.com/facebook/create-react-app">creat-react-app</a>
      </Layout.Footer>
    );
  }
}