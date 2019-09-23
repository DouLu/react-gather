import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Modal, Button, message } from 'antd';
import Crop from './crop';
import './style.css';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.childRef = React.createRef();
    this.state = {
      visible: false,
      sourceImg: '',
      cropperImg: null,
    };
  }
  upload = () => {
    const self = this;
    const File = this.inputRef.current.files[0];
    // 文件读取API
    // https://blog.csdn.net/qq_27449993/article/details/81182889

    // 图片数据格式转换
    // http://docs.wex5.com/wex5-ui-question-list-2232/
    if (!/image\/\w+/.test(File.type)) {
      message.error("看清楚，这个需要图片！");
      return false;
    }
    if (typeof FileReader != 'undefined') {
      //创建读取文件的对象
      const reader = new FileReader();
      //正式读取文件
      reader.readAsDataURL(File);
      //为文件读取成功设置事件
      reader.onload = function (e) {
        const imgFile = e.target.result;
        self.setState({ visible: true, sourceImg: imgFile });
      };
    } else {
      const URL = window.URL || window.webkitURL;
      const imageURL = URL.createObjectURL(File);
      self.setState({ visible: true, sourceImg: imageURL });
    }
    // 两次打开同一张图片时，第二次也可以触发onchange事件
    this.inputRef.current.value = '';
  }

  handleOk = () => {
    const cropperImg = this.childRef.current.getData();
    this.setState({
      visible: false,
      cropperImg: cropperImg,
    });
    this.props.onUpload && this.props.onUpload(cropperImg);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { title, accept, width, height, text } = this.props;
    const { visible, sourceImg, cropperImg } = this.state;
    return (
      <div>
        <Button type='primary' onClick={() => { this.inputRef.current.click() }}>
          {text}
          <input type='file' ref={this.inputRef} accept={accept} onChange={this.upload} hidden />
        </Button>
        {cropperImg && <div className='cropper-img'><img src={cropperImg} alt='img' /></div>}
        <Modal
          title={title}
          width={width}
          height={height}
          destroyOnClose={true}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Crop ref={this.childRef} {...this.props} sourceImg={sourceImg} />
        </Modal>
      </div>
    );
  }
};

Upload.defaultProps = {
  title: '上传图片',
  accept: 'image/jpeg,image/png,image/gif',
  width: 400,
  height: 400,
  text: '图片上传'
};
Upload.propTypes = {
  title: propTypes.string,
  width: propTypes.number,
  height: propTypes.number,
  accept: propTypes.string,
  text: propTypes.string,
  onUpload: propTypes.func,
};

export default Upload;