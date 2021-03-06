import React, { Component } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import './style.css';
import { message, TreeSelect } from 'antd';
import { ThreeLevelProvinceData, PROVINCE, CITY, COUNTY } from '../../utils';
import AceEditor from 'react-ace';
import 'brace/mode/json'; // 语言包
import 'brace/theme/monokai'; // 主题包
import 'brace/ext/searchbox'; //搜索替换快捷键
// http://securingsincity.github.io/react-ace/


console.log(_.flatMapDeep([1, [2, 3], [4, [5]], 6, [7, 8]]));

export default class DragDemo extends Component {
  static propTypes = {
    value: propTypes.string,
    dataSource: propTypes.array,
  };
  static defaultProps = {
    value: '',
    dataSource: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      weatherinfo: null,
      pid: null,
      cid: null,
      province: '',
      city: '',
      county: '',
    };
  }
  componentDidMount() {
    const cityCode = '101190101';
    const apiUrl = `${window.location.origin}/data/cityinfo/${cityCode}.html`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => { this.setState({ weatherinfo: data.weatherinfo }) })
      .catch(error => { message.error(error) })

    // 省份、城市数据
    fetch('https://os.alipayobjects.com/rmsportal/ODDwqcDFTLAguOvWEolX.json')
      .then(response => response.json())
      .then((data) => { this.setState({ data }) })
      .catch(e => console.log(e));
  }

  getWeather(city) {
    const api = `https://www.apiopen.top/weatherApi?city=${city}`;
    fetch(api)
      .then(res => res.json())
      .then(data => { this.setState({ code: data.data }); })
      .catch(error => { message.error(error) });
  }

  render() {
    const { weatherinfo, pid, cid, province, city, county, code } = this.state;
    return (
      <div>
        {weatherinfo && <div>
          <p>城市：{weatherinfo.city}</p>
          <p>天气：{weatherinfo.weather}</p>
          <p>
            <span className={`icon ${weatherinfo.img1.split('0')[0]} fl`}></span>
            <span className={`icon ${weatherinfo.img2.split('0')[0]} fl`}></span>
          </p>
          <p>时间：{weatherinfo.ptime}</p>
          <p>最低温度：{weatherinfo.temp1}</p>
          <p>最高温度：{weatherinfo.temp2}</p>
        </div>}
        <div>
          fetch data:
         {/* <TreeSelect
            showSearch
            style={{ width: 160 }}
            placeholder={'选择城市'}
            treeData={data}
          /> */}
        </div>
        <div>
          json data:
         <TreeSelect
            showSearch
            style={{ width: 160 }}
            placeholder={'选择城市'}
            treeData={ThreeLevelProvinceData}
          />
        </div>
        <div>
          <span>
            省：
            <TreeSelect onChange={(value, label) => { this.setState({ pid: value, province: label, city: '', county: '' }); this.getWeather(label); }} style={{ width: 160 }} placeholder={'选择省：'} value={province} treeData={PROVINCE} />
          </span>
          <span>
            市：
            <TreeSelect onChange={(value, label) => { this.setState({ cid: value, city: label, county: '' }); this.getWeather(label); }} style={{ width: 160 }} placeholder={'选择市：'} value={city} treeData={pid && CITY(pid)} />
          </span>
          <span>
            地区：
            <TreeSelect onChange={(value, label) => { this.setState({ county: label }); this.getWeather(label); }} style={{ width: 160 }} placeholder={'选择地区：'} value={county} treeData={cid && COUNTY(cid)} />
          </span>
        </div>
        <div>
          所选城市天气：
          <AceEditor
            mode="json"
            theme="monokai"
            name="UNIQUE_ID_OF_DIV"
            value={JSON.stringify(code, null, '\t')}
          />
        </div>
      </div>
    );
  }
}