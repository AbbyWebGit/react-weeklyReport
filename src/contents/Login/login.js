import React, {Component} from 'react';
import {Layout} from 'antd';
import { withRouter} from 'react-router-dom'
import {Icon, Form, Input, Button, Checkbox} from 'antd';
import axios from 'axios';

import '../../index.css';
import './login.scss';
axios.defaults.withCredentials=true;

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
    var value = this.props.form.getFieldsValue()
    let _this = this
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded'
    }
    axios({
      method: 'post',
      url: 'http://10.52.66.106:5678/login',
      data:{
        user: value.userName,
        password: value.password
      },
      // withCredentials:true
    }).then(function (response) {
    if(response.status==200){
    // console.log(response.status);
      _this.props.history.push('/index')
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
              placeholder="Username"/>
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
              placeholder="Password"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot">忘记密码</a>
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

  componentDidMount() {

    axios.defaults.headers = {
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded'
    }

    // axios({
    //     method: 'post',
    //     url: 'http://10.100.25.143:5678/login',
    //     data: {
    //       user: "zhangjing@ainirobot.com",
    //       password: "123456"
    //     }
    //   }).then(function (response) {
    //   console.log(response);
    // })
    //   .catch(function (error) {
    //     console.log(error)
    //   });

  }

  render() {

    return (
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