import React, { Component } from 'react';
import propTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message } from 'antd';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { isHover: false };
  }

  render() {
    const { isHover } = this.state;
    const { name, id, devices, apps, merbers, createTime } = this.props;
    const proNum = [
      {
        name: '设备产品',
        numbers: devices || '-'
      },
      {
        name: 'APP',
        numbers: apps || '-'
      },
      {
        name: '成员数',
        numbers: merbers || '-'
      },
    ];
    return (
      <div
        style={{ width: '320px', height: '211px', border: 'solid 1px #eee' }}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}
      >
        <h1>{name}</h1>
        <p>
          <span>ID:{id}</span>
          {isHover && <CopyToClipboard text={id} onCopy={() => { message.success('复制成功！', 1) }}><span style={{ color: '#0FC18A' }}>复制ID</span></CopyToClipboard>}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
          {
            proNum.map(item => <div key={item.name}>
              <p>{item.name}</p>
              <p>{item.numbers}</p>
            </div>)
          }
        </div>
        <p>创建时间：{createTime}</p>
      </div>
    );
  }
}

Card.defaultProps = {

};

Card.propTypes = {
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  createTime: propTypes.string.isRequired,
};

export default Card;