import React, {Component} from 'react';
import {Layout} from 'antd';
import { withRouter} from 'react-router-dom'
import {Icon, Form, Input, Button, Checkbox,message} from 'antd';
import axios from 'axios';
import {setCookie} from '../../utils/cookie';
import {login} from '../../api/api'
// import PropTypes from 'prop-types';

import '../../index.css';
import './login.css';


const {Header, Footer, Content} = Layout;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {

    super(props);

    this.state = {

      posts: {}

    };

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
  }

  login() {
// 获取表格的全部数据
    var value = this.props.form.getFieldsValue()
    let _this = this
    // axios请求
    login({
      user: value.userName,
      password: value.password
    }).then(function (res) {
    if(res.status===200){
      //  console.info(res);
      setCookie('uid',res.data.userid);
      setCookie('cname',res.data.resname || '');
      _this.props.history.push('/index')
        // console.log(_this.props.history);
    }else{
      message.error(res.msg+'，用户名或密码错误');
    } 
  })
    .catch(function (error) {
      console.log(error)
    });

  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: '请输入用户名'
              }
            ]
          })(
            <Input
              prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>}
              placeholder="请输入用户名"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码'
              }
            ]
          })(
            <Input
              prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
              type="password"
              placeholder="请输入密码"/>
          )}
        </FormItem>
        <FormItem>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>记住密码</Checkbox>
          )} */}
          {/* <a className="login-form-forgot">忘记密码</a> */}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={this
            .login
            .bind(this)}>
            登录
          </Button>

        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(withRouter(NormalLoginForm));


class Login extends Component {

  constructor(props) {

    super(props);

    this.state = {

      posts: []

    };

  }

  

  render() {

    return (
      message.config({
        top: 150,
        duration: 2,
      }),
      <div className="login">

        <Layout>

          <Header className='clearfix'>
            <span className='logo'></span>

          </Header>
          <Content>
            <div className='loginWarp'>

              <WrappedNormalLoginForm/>

            </div>

          </Content>
          <Footer>京ICP备17016764号-1京网文【2017】2380-251 2017-2018 猎户星空版权所有</Footer>
        </Layout>

      </div>
    );
  }
}

export default Login