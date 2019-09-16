import React, { Component } from 'react';
import propTypes from 'prop-types';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default class CropBox extends Component {
  static propTypes = {
    sourceImg: propTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }
  componentDidMount() {
    const img = document.createElement('img');
    img.src = this.props.sourceImg;
    this.imgRef.current.appendChild(img);
    this.cropper = new Cropper(img, {
      aspectRatio: 16 / 9,
      viewMode: 1,
    });
  }
  getData() {
    const cas = this.cropper.getCroppedCanvas();
    //生成base64图片的格式
    const base64url = cas.toDataURL('image/jpeg');
    return base64url;
  }
  render() {
    const { width = 200, height = 200 } = this.props;
    return (
      <div>
        <div
          className="img-box"
          width={width}
          height={height}
          ref={this.imgRef}>
        </div>
      </div>
    );
  }
}