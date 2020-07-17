import React from 'react';
import { Layout } from 'antd';

export default class Footer extends React.Component {
  render () {
    return (
      <Layout.Footer style={{textAlign: 'center', background: '#57a76b'}}>
        Made with <span role="img" aria-label="RedHeart">❤️</span> <a style={{color: '#5d3939'}} href="https://dan0102dan.ru">dan0102dan</a>
        <span> and </span>
        <a style={{color: '#49395d'}} href="https://github.com/facebook/create-react-app">creat-react-app</a>
      </Layout.Footer>
    );
  }
}