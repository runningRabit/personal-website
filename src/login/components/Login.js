/**
 * Created by lenovo on 2017/12/1.
 */
import React, {Component} from 'react';
import $ from 'jquery';

import Valid from '../../components/valid/valid';
import '../../../styles/login/login.css';
import Utils from '../../utils/utils';

const FIELDRULLS = [
  {
    require: true,
    name: 'phone',
    rex: /\d{11}/,
    emptyErr: '电话号码不能为空',
    err: '请输入正确的电话号码'
  },
  {
    require: true,
    name: 'pwd',
    label: '密码'
  },
];
class Login extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        phone: '2324',
        password: '234243'
      }
    }
  }
  login(e) {
    e.preventDefault();
    const formData = {
      phone: this.refs.phone.value,
      pwd: this.refs.pwd.value
    };

    let invalids = Valid.check(FIELDRULLS, formData, this.refs);
    if (invalids) return;
    $.ajax({
      type: 'post',
      url: '/los/login',
      data: formData,
      success: function (response) {
        if (response.responseCode === Utils.SUCCESSCODE) {
          location.href = response.model.url;
        } else {
          console.log(response);
        }
      }
    });
  }
  render() {
    return <div className="login-form">
      <form autoComplete="off" ref="form" method="POST">
        <div className="group-inputs">
          <div className="name input" style={{display: 'none'}}>
            <input ref="name" type="text" name="name" placeholder="姓名"/>
          </div>
          <div className="phone input">
            <input ref="phone"  type="text" name="phone" defaultValue={this.state.userInfo.phone} placeholder="手机号"/>
          </div>
          <div className="password input">
            <input ref="pwd"  type="password" name="pwd" defaultValue={this.state.userInfo.password} placeholder="密码（不少于6位）"/>
          </div>
          <div className="button-login">
            <button onClick={this.login.bind(this)}>登录</button>
          </div>
        </div>
      </form>
      <p className="agreement-tip">
        <a href="">手机验证码登录</a>
      </p>
      <div className="qrcode">
        <button className="qucode-toggleButton">下载知微</button>
      </div>
    </div>
  }
}

export default Login;