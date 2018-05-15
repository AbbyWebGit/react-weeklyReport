import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Layout} from 'antd';

import Index from '../Index/index';
import Detail from '../Detail/detail';
import {getCookie, delCookie} from '../../utils/cookie';
import {logout} from '../../api/api'
const {Header, Footer, Content} = Layout;

class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      userid: getCookie('uid'),
      userName: getCookie('cname') || ''
    }
  }
  exit = () => {
    delCookie('uid');
    delCookie('cname');
    let _this = this;
    // axios请求
    logout().then(function (res) {
        _this.props.history.push('/login');
      })
      .catch(function (error) {
        console.log(error)
      });

  }
  render() {
    return (
      <Layout>
        <Header>
          <div className='logo'></div>
          <div className='loginMes'>
            <span className="loginName">{this.state.userName}</span>
            <span className='exit' onClick={this.exit}>退出</span>
          </div>
        </Header>
        <Content>
          <div className='contentWarp'>
            <Switch>
              <Route exact path='/index' component={Index}/>
              <Route exact path='/add' component={Detail}/>
              <Route exact path='/detail/:id' component={Detail}/>
              <Route exact path='/editor/:id' component={Detail}/>
            </Switch>
          </div>

        </Content>
        <Footer>京ICP备17016764号-1京网文【2017】2380-251 2017-2018 猎户星空版权所有</Footer>
      </Layout>
    );
  }
}

export default Main