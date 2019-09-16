import { GetAppIconUploadPath } from '~sdk';
import { message } from 'antd';

export default function uploadImageCallBack(file) {
  const xmlhttp = new XMLHttpRequest();
  const formdata = new FormData();
  return new Promise((resolve, reject) => {
    // 获取oss签名信息
    GetAppIconUploadPath()
      .then((data) => {
        formdata.append('key', `${data.Dir}/${data.Filename}`);
        formdata.append('policy', data.Policy);
        formdata.append('OSSAccessKeyId', data.AccessId);
        formdata.append('success_action_status', 200);
        formdata.append('signature', data.Signature);
        formdata.append('name', file.name);
        formdata.append('file', file);
        xmlhttp.open('post', `//${data.Host}`, true);
        xmlhttp.send(formdata);
        xmlhttp.addEventListener('load', () => {
          const link = `https://${data.Host}/${data.Dir}/${data.Filename}`;
          resolve({ data: { link } });
        });
        xmlhttp.addEventListener('error', () => {
          const error = JSON.parse(xmlhttp.responseText);
          reject(error);
        });
      })
      .catch((err) => {
        message.error(err.message);
        reject(err);
      });
  });
}
