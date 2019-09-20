import React, { Component } from 'react';
import Upload from '../../components/Upload';
import { message } from 'antd';

export default class KnowPlant extends Component {

  onUpload = (data) => {
    const api = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=test';
    console.log(data);
    const grant_type = 'client_credentials';
    const ak = 'a390ba4ac61545378d78f85c359ad124';
    const sk = '60eb3ba11f60473dace1e03fc00ab78c';
    // 去百度云控制台获取ak、sk
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=${grant_type}&client_id=${ak}&client_secret=${sk}`;

    this.postData(api, { answer: 42 })
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => message.error(error))
  }

  postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'omit', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    }).then(response => response.json()) // parses response to JSON
  }

  render() {
    return (<div>
      <p>植物识别</p>
      <Upload onUpload={this.onUpload} />
    </div>);
  }
}