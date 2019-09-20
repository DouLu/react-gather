import React, { Component } from 'react';
import Upload from '../../components/Upload';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import AceEditor from 'react-ace';
import 'brace/mode/json'; // 语言包
import 'brace/theme/monokai'; // 主题包
import 'brace/ext/searchbox'; //搜索替换快捷键

export default class KnowPlant extends Component {
  constructor(props) {
    super(props);
    this.state = { code: null }
  }
  onUpload = (imgData) => {
    // 图片需要base64编码、去掉编码头后再进行urlencode
    const params = {
      image: encodeURI(imgData.split('data:image/jpeg;base64,')[1]),
      baike_num: 5 // 返回百科前五条【0-5】
    };
    // 1、为什么直接用fetch请求，接口返回image入参不存在
    // 2、为什么要用formdata，直接用params也是提示入参不存在
    const formData = new FormData();
    formData.append('image', params.image);
    formData.append('baike_num', params.baike_num);
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=jfSBmEOstDfsOUHqPKKZnHDV&client_secret=GchCPDPYVMnbvUmHnBPZw9Hd3o6hZRHe`;
    fetch(tokenUrl)
      .then(response => response.json())
      .then((data) => {
        console.log('token', data);
        const { access_token } = data;
        const api = `https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=${access_token}`;
        fetchPolyfill(api, {
          method: 'POST',
          body: formData, // data can be `string` or {object}! 
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          })
        })
          .then(res => res.json())
          .then(dataJson => { console.log('植物：', dataJson); this.setState({ code: dataJson }) })
          .catch(e => console.log(e))
      })
      .catch(e => console.log(e));
  }

  render() {
    return (<div>
      <p>植物识别</p>
      <Upload onUpload={this.onUpload} />
      <div>
        上传的植物为：
          <AceEditor
          mode="json"
          theme="monokai"
          name="UNIQUE_ID_OF_DIV"
          value={JSON.stringify(this.state.code, null, '\t')}
        />
      </div>
    </div>);
  }
}