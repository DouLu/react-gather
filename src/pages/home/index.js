import React, { Component } from 'react';
import Card from '../../components/Card';

const card_props = {
  name: '新建项目',
  id: '1234567890',
  devices: 10,
  apps: 12,
  merbers: 3,
  createTime: '2019-09-10'
};
export default class Home extends Component {

  render() {
    return (
      <div>
        <h1>echart.js</h1>
        <Card {...card_props} />
      </div>
    );
  }
}